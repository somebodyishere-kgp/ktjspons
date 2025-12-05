import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize Google Sheets API
async function getGoogleSheets() {
  try {
    // Using service account credentials from environment variable
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    
    if (!credentials) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not found');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
    throw error;
  }
}

// Append data to Google Sheet
async function appendToSheet(data: {
  email: string;
  phone: string;
  company: string;
  message: string;
  timestamp: string;
}) {
  try {
    const sheets = await getGoogleSheets();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID not found');
    }

    // Append row to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E', // Adjust range based on your sheet structure
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.timestamp,
          data.email,
          data.phone,
          data.company,
          data.message,
        ]],
      },
    });

    return response;
  } catch (error) {
    console.error('Error appending to sheet:', error);
    throw error;
  }
}

// Initialize sheet headers (run once)
async function initializeSheet() {
  try {
    const sheets = await getGoogleSheets();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID not found');
    }

    // Check if headers exist
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:E1',
    });

    // If no headers, add them
    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1:E1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            'Timestamp',
            'Email',
            'Phone',
            'Company',
            'Message',
          ]],
        },
      });
    }
  } catch (error) {
    console.error('Error initializing sheet:', error);
    // Don't throw - this is optional
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { email, phone, company, message } = body;

    // Validate required fields
    if (!email || !phone || !company || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create timestamp
    const timestamp = new Date().toISOString();

    // Initialize sheet headers (first time only)
    await initializeSheet();

    // Append data to Google Sheet
    await appendToSheet({
      email,
      phone,
      company,
      message,
      timestamp,
    });

    return NextResponse.json(
      { 
        success: true,
        message: 'Form submitted successfully' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing form submission:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to submit form',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}






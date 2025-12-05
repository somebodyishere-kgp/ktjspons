# Google Sheets Contact Form Setup Guide

This guide will help you set up the contact form to automatically log submissions to Google Sheets.

## 📋 Overview

The contact form uses Google Sheets API with a Service Account to automatically log form submissions. No user authentication is required - it works automatically in the background.

## ✅ Prerequisites

1. A Google account
2. Access to Google Cloud Console
3. A Vercel account (for deployment)

## 🚀 Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it (e.g., "KSHITIJ Contact Form Submissions")
4. **Copy the Spreadsheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - The `SPREADSHEET_ID` is the long string between `/d/` and `/edit`
   - Example: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

### Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "KSHITIJ Contact Form")
4. Click "Create"
5. Wait for the project to be created, then select it

### Step 3: Enable Google Sheets API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and press **"Enable"**
4. Wait for the API to be enabled

### Step 4: Create a Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Fill in:
   - **Service account name**: `kshitij-contact-form`
   - **Service account ID**: (auto-generated)
   - **Description**: "Service account for contact form submissions"
4. Click **"Create and Continue"**
5. Skip "Grant this service account access to project" (optional)
6. Click **"Done"**

### Step 5: Create and Download Service Account Key

1. In the "Credentials" page, find your service account
2. Click on the service account email
3. Go to the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. A JSON file will download - **SAVE THIS FILE SECURELY**

### Step 6: Share Google Sheet with Service Account

1. Open your Google Sheet
2. Click the **"Share"** button (top right)
3. Add the service account email (from the JSON file, it's the `client_email` field)
   - Example: `kshitij-contact-form@your-project.iam.gserviceaccount.com`
4. Give it **"Editor"** permissions
5. Uncheck **"Notify people"** (optional)
6. Click **"Share"**

### Step 7: Convert JSON to Single-Line String

For Vercel, you need to convert the JSON file to a single-line string.

#### Option A: Using Online Tool (Easiest)
1. Copy the entire contents of your JSON file
2. Go to https://www.freeformatter.com/json-formatter.html
3. Paste and click **"Minify"** or **"Compress"**
4. Copy the minified single-line JSON

#### Option B: Using Command Line
```bash
# If you have Node.js installed
node -e "console.log(JSON.stringify(require('./your-service-account.json')))"
```

#### Option C: Manual
Remove all line breaks and extra spaces, keeping it as one continuous line.

**Example format** (all on one line):
```json
{"type":"service_account","project_id":"your-project-id","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service@project.iam.gserviceaccount.com",...}
```

### Step 8: Add Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **"Settings"** → **"Environment Variables"**
3. Add the following variables:

#### Variable 1: GOOGLE_SHEET_ID
- **Name**: `GOOGLE_SHEET_ID`
- **Value**: Your spreadsheet ID from Step 1
- **Example**: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

#### Variable 2: GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
- **Name**: `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS`
- **Value**: The single-line JSON string from Step 7
- **Important**: Must be valid JSON on one line, no line breaks

4. Click **"Save"** for each variable
5. **Redeploy** your project after adding variables

### Step 9: Test the Integration

1. Visit your deployed site
2. Fill out the contact form
3. Submit the form
4. Check your Google Sheet - you should see a new row with:
   - **Timestamp** (Column A)
   - **Email** (Column B)
   - **Phone** (Column C)
   - **Company** (Column D)
   - **Message** (Column E)

## 🔍 Troubleshooting

### Error: "GOOGLE_SERVICE_ACCOUNT_CREDENTIALS not found"
- ✅ Make sure you've added the environment variable in Vercel
- ✅ Verify the JSON is properly formatted (valid JSON)
- ✅ Ensure it's a single-line string (no line breaks)
- ✅ Redeploy after adding environment variables

### Error: "GOOGLE_SHEET_ID not found"
- ✅ Make sure you've added the spreadsheet ID as an environment variable
- ✅ Verify the ID is correct (from the Google Sheets URL)
- ✅ Check that you're using the ID, not the full URL

### Error: "The caller does not have permission"
- ✅ Make sure you've shared the Google Sheet with the service account email
- ✅ Verify the service account has **"Editor"** permissions (not "Viewer")
- ✅ Check that you used the correct email from the JSON file (`client_email` field)

### Error: "Unable to parse range"
- ✅ The sheet might not exist or the range is incorrect
- ✅ Try accessing the sheet manually to verify it exists
- ✅ The API will automatically create headers on first submission

### Form submission fails silently
- ✅ Check Vercel function logs (Vercel Dashboard → Functions → View Logs)
- ✅ Verify all environment variables are set correctly
- ✅ Test the API endpoint directly if needed

## 📊 Google Sheet Structure

The API will automatically create headers on the first submission:

| Column | Header | Description |
|--------|--------|-------------|
| A | Timestamp | When the form was submitted |
| B | Email | User's email address |
| C | Phone | User's phone number |
| D | Company | User's company name |
| E | Message | User's message |

## 🔒 Security Best Practices

1. ✅ **Never commit credentials to Git** - The JSON file is in `.gitignore`
2. ✅ **Use environment variables** - All sensitive data is stored in Vercel
3. ✅ **Service account permissions** - Limited to only your specific sheet
4. ✅ **Regular rotation** - Consider rotating service account keys periodically
5. ✅ **Monitor API usage** - Check Google Cloud Console for unusual activity

## 📝 Quick Checklist

- [ ] Created Google Sheet
- [ ] Created Google Cloud Project
- [ ] Enabled Google Sheets API
- [ ] Created Service Account
- [ ] Downloaded Service Account JSON key
- [ ] Shared Google Sheet with service account email (Editor permissions)
- [ ] Converted JSON to single-line string
- [ ] Added `GOOGLE_SHEET_ID` to Vercel environment variables
- [ ] Added `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` to Vercel environment variables
- [ ] Redeployed project
- [ ] Tested form submission
- [ ] Verified data appears in Google Sheet

## 🎯 That's It!

Once you complete these steps, every form submission will automatically be logged to your Google Sheet with all the form data and a timestamp.

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Vercel Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Service Accounts Overview](https://cloud.google.com/iam/docs/service-accounts)

---

**Need Help?** Check the troubleshooting section above or review the API route code in `app/api/contact/route.ts`.

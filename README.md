# KSHITIJ 2026 Sponsorship Landing Page

A premium, high-performance Next.js landing page for KSHITIJ 2026 - IIT Kharagpur's Techno-Management Symposium.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit **http://localhost:3000** to see the site.

## ✨ Features

### Core Sections
- **Hero Section** - Full-screen hero with animated watermark and parallax effects
- **Who Are We** - Introduction to KSHITIJ with animated text and achievements
- **Why Associate** - Data-driven benefit cards with animated counters
- **75 Years Legacy** - Animated counter celebrating IIT Kharagpur's Platinum Jubilee
- **Flagship Events** - Interactive event cards with hover animations
- **Graphs & Analytics** - Data visualizations with scroll-triggered animations
- **Previous Sponsors** - Tier-based sponsor showcase with parallax scrolling
- **Glimpses** - 3D sphere gallery with interactive image viewing
- **Sponsor Us** - Contact form with Google Sheets integration

### Advanced Features
- ✅ **3D Dome Gallery** - Interactive 3D sphere for photo gallery
- ✅ **Smooth Scrolling** - Lenis integration for buttery smooth scroll
- ✅ **Perspective Transitions** - 3D rotation effects between sections
- ✅ **SVG Curve Loading** - Beautiful entrance animations
- ✅ **Global Video Background** - Optimized video background
- ✅ **Performance Optimized** - Next.js Image optimization, lazy loading, GPU acceleration
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Contact Form Backend** - Google Sheets integration for form submissions

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Smooth Scroll**: Lenis
- **Charts**: Recharts
- **3D Graphics**: React Three Fiber, Three.js
- **Form Handling**: React Hook Form
- **Backend**: Vercel Serverless Functions
- **Integration**: Google Sheets API

## 📁 Project Structure

```
SPONS-TEAM/
├── app/
│   ├── api/
│   │   └── contact/          # Contact form API route
│   ├── components/
│   │   ├── sections/         # All page sections
│   │   ├── common/           # Navigation, video background
│   │   ├── animations/       # Transition effects
│   │   └── ui/               # Reusable UI components
│   ├── page.tsx              # Main page
│   └── layout.tsx            # Root layout
├── public/
│   ├── photos/               # Gallery images
│   ├── Events Poster_KTJ_25/ # Event posters
│   ├── Sponsers Logo/        # Sponsor logos
│   └── kshitij-aftermovie.mp4 # Background video
├── README.md                  # This file
└── GOOGLE_SHEETS_SETUP.md     # Contact form setup guide
```

## 📝 Environment Variables

For the contact form to work, you need to set up Google Sheets integration. See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) for detailed instructions.

### Required Variables (Vercel)
- `GOOGLE_SHEET_ID` - Your Google Sheet ID
- `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` - Service account JSON (single-line)

## 🎨 Performance Optimizations

- ✅ Next.js Image component with automatic optimization
- ✅ Lazy loading for below-the-fold content
- ✅ GPU acceleration with `will-change` properties
- ✅ Memoized components to prevent unnecessary re-renders
- ✅ Optimized video background with metadata preload
- ✅ CSS containment for better paint performance

## ⚠️ File Size Optimization

**Important**: Before deploying, optimize your media files:

- **Video**: Should be 20-50 MB (currently 2.31 GB - needs compression)
- **Photos**: Should be 500KB-2MB each (currently 8-44 MB each - needs compression)
- **Event Posters**: Already optimized ✅
- **Sponsor Logos**: Already optimized ✅

See `OPTIMIZATION_GUIDE.md` for detailed optimization instructions.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (see [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md))
4. Deploy!

The project is configured for Vercel with:
- Automatic Next.js detection
- Serverless function support
- Environment variable management

## 📚 Documentation

- **[GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)** - Complete guide for setting up the contact form with Google Sheets

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ Service account credentials (not OAuth)
- ✅ Input validation on form submissions
- ✅ CORS protection on API routes

## 📄 License

Built for KSHITIJ 2026, IIT Kharagpur

---

**Status**: Production Ready ✅

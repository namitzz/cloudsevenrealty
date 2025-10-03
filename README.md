# Cloud Seven Realty

A modern, high-performance real estate website built with Next.js 14, TypeScript, and TailwindCSS.

## 🚀 Features

- **Modern Stack**: Next.js 14 App Router, TypeScript, TailwindCSS
- **Performance**: Optimized images, ISR/SSG, Lighthouse ≥90
- **SEO**: Metadata, sitemap, robots.txt, structured data ready
- **Responsive**: Mobile-first design with smooth animations
- **Analytics**: GA4 integration with custom events
- **CMS Ready**: Sanity CMS integration scaffolded
- **Google Sheets**: Manage property listings via Google Sheets
- **Components**: Reusable cards, filters, gallery, sticky enquiry

## 📁 Project Structure

```
cloudsevenrealty/
├── app/
│   ├── projects/           # Projects listing & detail pages
│   ├── properties/         # Properties listing & detail pages
│   ├── areas/              # Areas/locations pages
│   ├── contact/            # Contact form
│   ├── api/lead/           # Lead submission API
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
├── components/
│   ├── Navbar.tsx          # Sticky navigation
│   ├── Footer.tsx          # Footer with links
│   ├── Hero.tsx            # Hero section with CTAs
│   ├── ProjectCard.tsx     # Project card with hover effects
│   ├── PropertyCard.tsx    # Property card component
│   ├── Filters.tsx         # URL-synced filters
│   ├── Gallery.tsx         # Lightbox gallery
│   ├── StickyEnquiry.tsx   # Sticky enquiry form
│   └── TrustStrip.tsx      # Trust indicators
├── lib/
│   ├── analytics.ts        # GA4 helper functions
│   ├── sanity.ts           # Sanity CMS client
│   ├── queries.ts          # GROQ queries for Sanity
│   └── googleSheets.ts     # Google Sheets integration
├── docs/                   # Documentation
│   ├── GOOGLE_SHEETS_SETUP.md     # Google Sheets setup guide
│   └── GOOGLE_DRIVE_INTEGRATION.md # Google Drive conversion guide
└── public/                 # Static assets

```

## 🛠️ Development

### Prerequisites

- Node.js 20.x or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/namitzz/cloudsevenrealty.git
cd cloudsevenrealty

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your values
```

### Environment Variables

Create a `.env` file with the following variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_READ_TOKEN=
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEETS_RANGE=Properties!A2:H
MAPBOX_TOKEN=
GA_MEASUREMENT_ID=
```

### Running Locally

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

```bash
# Build the application
npm run build

# The output is in the .next directory
# Configure your platform to serve this directory
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  background: "#F7F7F5",  // Off-white background
  foreground: "#121416",  // Near-black text
  accent: "#C8A96A",      // Warm gold accent
}
```

### Fonts

The project uses:
- **Playfair Display** for headings (serif)
- **Inter** for body text (sans-serif)

Change fonts in `app/layout.tsx`.

## 🔌 Integrations

### Google Sheets (Property Listings)

Manage your property listings in a Google Sheet for easy updates without touching code!

**Quick Start:**
1. Create a Google Sheet with property data
2. Set up a Google Cloud service account
3. Share the sheet with the service account
4. Add credentials to `.env`

**Detailed Setup Guide:** See [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md)

**Converting from Google Drive:** See [docs/GOOGLE_DRIVE_INTEGRATION.md](docs/GOOGLE_DRIVE_INTEGRATION.md)

### Sanity CMS

1. Create a Sanity project at [sanity.io](https://www.sanity.io/)
2. Install Sanity packages:
   ```bash
   npm install next-sanity @sanity/image-url
   ```
3. Update `lib/sanity.ts` with your project details
4. Create schemas for Project, Property, Area, and Testimonial
5. Uncomment the Sanity client code in `lib/sanity.ts`

### Google Analytics

1. Create a GA4 property
2. Add `GA_MEASUREMENT_ID` to `.env`
3. Add the GA script to `app/layout.tsx`:
   ```tsx
   <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
   ```

### Maps Integration

For location maps, integrate Mapbox or Google Maps:

```bash
npm install mapbox-gl
```

Update the map placeholders in detail pages.

## 🧪 Testing

Currently using TypeScript for type safety. To add tests:

```bash
# Install testing libraries
npm install -D @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

## 📊 Performance

Target metrics:
- **LCP**: < 2.2s
- **CLS**: < 0.05
- **Lighthouse Performance**: ≥ 90
- **Lighthouse Accessibility**: ≥ 90

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙋 Support

For questions or support:
- Open an issue on GitHub
- Contact via WhatsApp (link in footer)
- Email: info@cloudsevenrealty.com

---

Built with ❤️ using Next.js 14

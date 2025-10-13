# Deployment Guide

This guide explains how to deploy the Cloud Seven Realty website to various platforms.

## 🚀 GitHub Pages (Recommended for Static Demo)

The repository is pre-configured for automatic GitHub Pages deployment.

### Automatic Deployment

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings > Pages**
   - Under **Build and deployment**, select **GitHub Actions**

2. **Push to Main Branch:**
   ```bash
   git push origin main
   ```

3. **Access Your Site:**
   - Your site will be available at: `https://namitzz.github.io/cloudsevenrealty/`
   - Deployment takes 2-5 minutes
   - Check the Actions tab to monitor deployment progress

### How It Works

- The workflow file `.github/workflows/nextjs.yml` handles the deployment
- On push to `main`, it automatically:
  - Installs dependencies
  - Builds the Next.js app with static export
  - Exports to `./out` directory
  - Deploys to GitHub Pages

### Limitations

GitHub Pages serves static files only:
- ❌ API routes won't work (`/api/lead`)
- ❌ Server-side rendering disabled
- ❌ Image optimization disabled (images load unoptimized)
- ✅ All static pages work perfectly
- ✅ Client-side navigation works
- ✅ All UI components function

## 🔷 Vercel (Recommended for Full Features)

For full functionality including API routes and image optimization:

### Deploy to Vercel

1. **Import Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

2. **Configure Environment Variables:**
   ```env
   NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   SANITY_READ_TOKEN=your-token
   GOOGLE_SHEETS_SPREADSHEET_ID=your-sheet-id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@email.com
   GOOGLE_PRIVATE_KEY="your-private-key"
   GOOGLE_SHEETS_RANGE=Properties!A2:H
   MAPBOX_TOKEN=your-mapbox-token
   GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically detect Next.js and configure everything

4. **Update for Vercel:**
   - Remove or comment out `output: 'export'` from `next.config.js`
   - This enables server-side features and API routes

### Benefits of Vercel Deployment

- ✅ API routes work (contact form submissions)
- ✅ Automatic image optimization
- ✅ Server-side rendering when needed
- ✅ Edge functions
- ✅ Preview deployments for PRs
- ✅ Custom domains
- ✅ Analytics

## 🌐 Other Platforms

### Netlify

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `out`

2. **Deploy:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir=out
   ```

### Cloudflare Pages

1. **Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `out`

2. Connect your GitHub repository and let Cloudflare Pages handle the rest

### AWS S3 + CloudFront

```bash
# Build the site
npm run build

# Sync to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## 🔄 Switching Between Static and Dynamic

### For Static Export (GitHub Pages, Netlify, etc.)

Ensure `next.config.js` has:
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

### For Dynamic Deployment (Vercel, Self-hosted)

Remove or comment out from `next.config.js`:
```javascript
const nextConfig = {
  // output: 'export',  // Comment out this line
  images: {
    // unoptimized: true,  // Comment out this line
    remotePatterns: [...],
  },
};
```

## 📝 Environment Variables

Make sure to set up environment variables on your deployment platform:

- **Required for all deployments:**
  - `NEXT_PUBLIC_SITE_URL` - Your site URL
  - `NEXT_PUBLIC_WHATSAPP_NUMBER` - WhatsApp business number

- **Optional (for full features):**
  - Sanity CMS credentials
  - Google Sheets credentials
  - Mapbox token
  - Google Analytics ID

## 🔍 Troubleshooting

### GitHub Pages shows 404

1. Check that GitHub Actions is selected in Pages settings
2. Verify the workflow completed successfully in the Actions tab
3. Wait a few minutes for DNS propagation

### API routes not working

- API routes only work with server-side deployments (Vercel)
- For static exports, consider using:
  - External form services (Formspree, Google Forms)
  - Client-side only validation
  - mailto: links as fallback

### Images not loading

- Check `images.unoptimized: true` is set for static export
- Verify remote image URLs are accessible
- Check browser console for CORS errors

## 📚 Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vercel Documentation](https://vercel.com/docs)

---

**Current Configuration:** This repository is configured for static export to GitHub Pages by default.

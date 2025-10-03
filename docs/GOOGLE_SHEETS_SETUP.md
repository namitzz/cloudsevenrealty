# Google Sheets Integration Setup Guide

This guide will help you integrate Google Sheets with your Cloud Seven Realty website to manage property listings dynamically.

## Overview

The website can fetch property listings from a Google Sheet, allowing you to manage your properties in a familiar spreadsheet interface without touching any code.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- Your property listings in a Google Sheet

## Step 1: Create a Google Sheet with Property Listings

1. Create a new Google Sheet or use your existing one
2. Structure your sheet with the following columns (starting from row 1 as headers):

| Column | Field Name | Description | Example |
|--------|------------|-------------|---------|
| A | Title | Property name/title | "Luxury Villa in Downtown" |
| B | Subtitle | Brief description | "Spacious 4BHK villa with garden" |
| C | Price | Price with currency/units | "2.5Cr" or "25K/month" |
| D | Size | Property size | "3500 sqft" or "2 kanal" |
| E | Location | Location/area name | "Downtown" or "Phase 8" |
| F | Status | Property type | "Buy", "Rent", or "Land" |
| G | Image URL | URL to property image | "https://example.com/image.jpg" |
| H | Features | Comma-separated features | "4 BHK, Garden, Parking, Modern amenities" |

### Example Sheet Structure:

```
| Title                      | Subtitle                          | Price    | Size      | Location  | Status | Image URL                    | Features                           |
|----------------------------|-----------------------------------|----------|-----------|-----------|--------|------------------------------|------------------------------------|
| Luxury Villa in Downtown   | Spacious 4BHK villa with garden  | 2.5Cr    | 3500 sqft | Downtown  | Buy    | https://example.com/img1.jpg | 4 BHK, Garden, Parking, Modern amenities |
| Cozy Apartment in Suburbs  | 2BHK furnished apartment         | 25K/month| 1200 sqft | Suburbs   | Rent   | https://example.com/img2.jpg | Furnished, 2 BHK, Ready to move    |
```

3. Name your sheet tab "Properties" (or update `GOOGLE_SHEETS_RANGE` in .env)
4. Add your property data starting from row 2 (row 1 is for headers)

## Step 2: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

## Step 3: Enable Google Sheets API

1. In Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and click "Enable"

## Step 4: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: `cloudsevenrealty-sheets`
   - Service account ID: (auto-generated)
   - Description: "Service account for accessing property sheets"
4. Click "Create and Continue"
5. Grant the service account the "Viewer" role
6. Click "Continue" and then "Done"

## Step 5: Generate Service Account Key

1. In the credentials page, find your newly created service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Choose "JSON" format
6. Click "Create" - a JSON file will be downloaded

## Step 6: Share Your Google Sheet with the Service Account

1. Open the JSON file you just downloaded
2. Find the `client_email` field (looks like: `cloudsevenrealty-sheets@your-project.iam.gserviceaccount.com`)
3. Open your Google Sheet
4. Click the "Share" button
5. Paste the service account email
6. Give it "Viewer" access
7. Uncheck "Notify people"
8. Click "Share"

## Step 7: Configure Environment Variables

1. Open the JSON key file and extract the following values:
   - `client_email` - This is your service account email
   - `private_key` - This is your private key (keep it secret!)

2. Get your Google Sheet ID:
   - Open your Google Sheet
   - Look at the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - Copy the `{SPREADSHEET_ID}` part

3. Create or update `.env.local` file in your project root:

```env
# Google Sheets Integration
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=cloudsevenrealty-sheets@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_RANGE=Properties!A2:H
```

**Important Notes:**
- Keep the `GOOGLE_PRIVATE_KEY` in quotes
- The private key should include the `\n` characters (line breaks)
- Don't commit the `.env.local` file to version control

## Step 8: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit the properties page: `http://localhost:3000/properties`

3. You should see your properties from the Google Sheet!

## Troubleshooting

### Properties not showing up?

1. **Check server logs**: Look for error messages in the terminal
2. **Verify permissions**: Make sure the service account has access to your sheet
3. **Check environment variables**: Ensure all variables are set correctly
4. **Test the spreadsheet**: Try opening the sheet with the service account email
5. **Verify sheet structure**: Make sure column headers start at row 1, data at row 2
6. **Check sheet name**: Default is "Properties" - update `GOOGLE_SHEETS_RANGE` if different

### Common Errors

**"Error fetching from Google Sheets"**
- Verify the spreadsheet ID is correct
- Check that the service account has access to the sheet
- Ensure the Google Sheets API is enabled

**"Invalid private key"**
- Make sure the private key includes all newlines (`\n`)
- Keep the key in quotes in the .env file
- Don't remove any parts of the key including headers/footers

**"Sheet range not found"**
- Verify the sheet tab name matches (default: "Properties")
- Check the range format: `SheetName!A2:H`
- Ensure your sheet has data in the specified range

## Fallback to Mock Data

If Google Sheets is not configured or there's an error, the website will automatically fall back to using mock data. This ensures the site always works even during configuration.

## Updating Properties

To update properties:
1. Edit your Google Sheet
2. Add, remove, or modify rows
3. Save the changes
4. The website will fetch the latest data on the next page load

**Note**: Changes may take a few minutes to appear due to caching. For immediate updates during development, restart the dev server.

## Advanced Configuration

### Custom Sheet Range

If your data is in a different location, update the range:

```env
GOOGLE_SHEETS_RANGE=MyProperties!A2:H50
```

This reads from:
- Sheet tab: "MyProperties"
- Columns: A to H
- Rows: 2 to 50

### Image URLs

For the Image URL column (G):
- Use direct image URLs (must be publicly accessible)
- Consider using a cloud storage service like:
  - Google Cloud Storage
  - AWS S3
  - Cloudinary
  - ImgBB
- Unsplash URLs work great for testing

### Multiple Property Types

You can manage different property types in the same sheet. Just use the "Status" column (F) with values:
- "Buy" - Properties for sale
- "Rent" - Properties for rent
- "Land" - Land/plots

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add environment variables in your hosting platform:
   - Go to your project settings
   - Add each environment variable (one by one)
   - For Vercel: Settings > Environment Variables

2. **Important**: Never commit `.env.local` or `.env` files to Git!

3. Redeploy your application after adding environment variables

## Security Best Practices

1. **Never share your private key** publicly or commit it to version control
2. **Use read-only permissions** for the service account
3. **Regularly rotate keys** (create new service account keys periodically)
4. **Monitor API usage** in Google Cloud Console
5. **Set up API quotas** to prevent abuse

## Support

If you need help:
1. Check the [Google Sheets API documentation](https://developers.google.com/sheets/api)
2. Review the error messages in your server logs
3. Open an issue on GitHub with:
   - Error message
   - Steps you've taken
   - Environment (dev/production)

---

## Quick Reference

### Required Environment Variables

```env
GOOGLE_SHEETS_SPREADSHEET_ID=     # From sheet URL
GOOGLE_SERVICE_ACCOUNT_EMAIL=     # From JSON key file
GOOGLE_PRIVATE_KEY=               # From JSON key file
GOOGLE_SHEETS_RANGE=Properties!A2:H  # Sheet range
```

### Sheet Column Order

1. Title
2. Subtitle
3. Price
4. Size
5. Location
6. Status (Buy/Rent/Land)
7. Image URL
8. Features (comma-separated)

### Useful Links

- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [Service Account Keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)

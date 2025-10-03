# Quick Start: Google Sheets Property Listings

Get your property listings from Google Sheets to your website in under 30 minutes!

## 📋 What You Need

- [ ] A Google account
- [ ] Your property listings (can be from Google Drive, Docs, or any format)
- [ ] 30 minutes of time

## 🚀 Quick Setup (5 Steps)

### Step 1: Create Your Google Sheet (5 min)

1. Go to [sheets.new](https://sheets.new) to create a new Google Sheet
2. Add these column headers in Row 1:
   ```
   Title | Subtitle | Price | Size | Location | Status | Image URL | Features
   ```
3. Add your property data starting from Row 2
4. Name the sheet tab "Properties"

**Example Row:**
```
Luxury Villa | Spacious 4BHK villa | 2.5Cr | 3500 sqft | Downtown | Buy | https://... | 4 BHK, Garden, Parking
```

Need a template? See [SHEET_TEMPLATE.md](./SHEET_TEMPLATE.md)

### Step 2: Create Google Cloud Project (5 min)

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project (any name)
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search "Google Sheets API"
   - Click "Enable"

### Step 3: Create Service Account (5 min)

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Name: `cloudsevenrealty-sheets`
4. Role: "Viewer"
5. Click "Done"

### Step 4: Get Service Account Key (5 min)

1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose JSON format
5. Download the file

### Step 5: Configure Your Website (10 min)

1. **Open the downloaded JSON file** and find:
   - `client_email` - Copy this email address
   - `private_key` - Copy this entire key (including `-----BEGIN...` and `-----END...`)

2. **Share your Google Sheet:**
   - Open your Google Sheet
   - Click "Share"
   - Paste the `client_email` from step 1
   - Give "Viewer" access
   - Uncheck "Notify people"
   - Click "Share"

3. **Get your Sheet ID:**
   - Look at your Google Sheet URL
   - URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
   - Copy the `{SHEET_ID}` part

4. **Update your `.env` file:**
   Create `.env.local` in your project root with:
   ```env
   GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id_here
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_RANGE=Properties!A2:H
   ```

5. **Restart your dev server:**
   ```bash
   npm run dev
   ```

6. **Visit:** `http://localhost:3000/properties`

✅ **Done!** Your properties from Google Sheets should now appear on your website!

## 🔄 Have a Google Drive Folder?

If your properties are in a Google Drive folder, see [GOOGLE_DRIVE_INTEGRATION.md](./GOOGLE_DRIVE_INTEGRATION.md) for conversion instructions.

## ⚠️ Troubleshooting

**Not seeing your properties?**

1. Check the terminal for error messages
2. Verify the service account has access to your sheet
3. Make sure all environment variables are set
4. Check that your sheet is named "Properties"
5. Verify data starts from Row 2 (Row 1 is headers)

**Still having issues?**

See the detailed setup guide: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## 📝 Column Requirements

| Column | Required | Example | Notes |
|--------|----------|---------|-------|
| Title (A) | ✅ Yes | "Luxury Villa" | Property name |
| Subtitle (B) | ✅ Yes | "4BHK villa" | Brief description |
| Price (C) | ✅ Yes | "2.5Cr" | With units |
| Size (D) | ✅ Yes | "3500 sqft" | With units |
| Location (E) | ✅ Yes | "Downtown" | Area name |
| Status (F) | ✅ Yes | "Buy" | Must be: Buy, Rent, or Land |
| Image URL (G) | ⚠️ Optional | "https://..." | Use Unsplash for testing |
| Features (H) | ⚠️ Optional | "4 BHK, Garden" | Comma-separated |

## 🎯 Tips for Success

1. **Start Small**: Test with 3-5 properties first
2. **Use Unsplash**: For testing, use Unsplash image URLs
3. **Be Consistent**: Keep the same format across all rows
4. **Status Values**: Must be exactly "Buy", "Rent", or "Land"
5. **Features**: Separate with commas: "4 BHK, Garden, Parking"

## 🚀 Production Deployment

When deploying to Vercel/production:

1. Add environment variables in your hosting dashboard
2. Never commit `.env.local` to Git!
3. Redeploy after adding variables

## 📚 More Resources

- **Detailed Setup**: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
- **Google Drive Conversion**: [GOOGLE_DRIVE_INTEGRATION.md](./GOOGLE_DRIVE_INTEGRATION.md)
- **Sheet Template**: [SHEET_TEMPLATE.md](./SHEET_TEMPLATE.md)

## 💡 Benefits

- ✅ Update properties without code changes
- ✅ Non-technical team members can manage listings
- ✅ Familiar spreadsheet interface
- ✅ Real-time updates (on page refresh)
- ✅ Free to use (Google Sheets API has generous limits)

## 🎉 What's Next?

Once your Google Sheets integration is working:

1. Add more properties to your sheet
2. Update property details anytime
3. Add better property images
4. Share edit access with your team
5. Set up automated backups

---

Need help? Check the detailed guides or open an issue on GitHub!

# Documentation

Welcome to the Cloud Seven Realty documentation! This folder contains guides to help you set up and manage your property listings.

## 📚 Available Guides

### 🚀 [QUICKSTART.md](./QUICKSTART.md) - **START HERE!**
A quick 30-minute guide to get your Google Sheets property listings up and running.

**Best for:** First-time setup, getting started quickly

### 📊 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
Complete, detailed guide for setting up Google Sheets integration with step-by-step instructions and troubleshooting.

**Best for:** Detailed setup instructions, troubleshooting issues

### 📁 [GOOGLE_DRIVE_INTEGRATION.md](./GOOGLE_DRIVE_INTEGRATION.md)
How to convert property listings from a Google Drive folder (documents, files) into a Google Sheet format.

**Best for:** If you already have properties in Google Drive

### 📋 [SHEET_TEMPLATE.md](./SHEET_TEMPLATE.md)
Ready-to-use template for your Google Sheet with example data and column structure.

**Best for:** Setting up your sheet correctly, understanding the data format

## 🎯 Which Guide Should I Use?

### Scenario 1: Starting Fresh
**You don't have any property listings yet**

1. Start with [QUICKSTART.md](./QUICKSTART.md)
2. Use [SHEET_TEMPLATE.md](./SHEET_TEMPLATE.md) to structure your data

### Scenario 2: Have Properties in Google Drive
**You have a Google Drive folder with property documents**

1. Read [GOOGLE_DRIVE_INTEGRATION.md](./GOOGLE_DRIVE_INTEGRATION.md) first
2. Follow [QUICKSTART.md](./QUICKSTART.md) after converting to sheets
3. Reference [SHEET_TEMPLATE.md](./SHEET_TEMPLATE.md) for data format

### Scenario 3: Need Detailed Instructions
**You want comprehensive step-by-step guidance**

1. Follow [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) completely
2. Use [SHEET_TEMPLATE.md](./SHEET_TEMPLATE.md) for data structure

### Scenario 4: Having Issues
**Something's not working**

1. Check the Troubleshooting section in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
2. Verify your sheet format with [SHEET_TEMPLATE.md](./SHEET_TEMPLATE.md)
3. Review the Quick Reference in [QUICKSTART.md](./QUICKSTART.md)

## 🔑 Key Concepts

### Google Sheets Integration
Your website fetches property data from a Google Sheet in real-time. This means:
- No code changes needed to update properties
- Easy collaboration with your team
- Familiar spreadsheet interface
- Changes appear on next page load

### Service Account
A special Google account that allows your website to read your sheet without requiring user login.

### Environment Variables
Secure configuration stored in `.env` files that connect your website to Google Sheets.

## 📝 Quick Reference

### Required Sheet Columns
```
Title | Subtitle | Price | Size | Location | Status | Image URL | Features
```

### Environment Variables
```env
GOOGLE_SHEETS_SPREADSHEET_ID=     # From sheet URL
GOOGLE_SERVICE_ACCOUNT_EMAIL=     # From JSON key
GOOGLE_PRIVATE_KEY=               # From JSON key
GOOGLE_SHEETS_RANGE=Properties!A2:H
```

### Status Values
Must be exactly one of:
- `Buy` - Properties for sale
- `Rent` - Properties for rent
- `Land` - Land/plots

## 🛠️ Development vs Production

### Development (Local)
- Use `.env.local` file
- Never commit this file to Git
- Good for testing and development

### Production (Vercel/Hosting)
- Add environment variables in hosting dashboard
- Redeploy after adding variables
- Keep credentials secure

## 🔒 Security Best Practices

1. ✅ **DO:** Keep private keys secure
2. ✅ **DO:** Use read-only permissions
3. ✅ **DO:** Add `.env.local` to `.gitignore`
4. ❌ **DON'T:** Commit `.env` files to Git
5. ❌ **DON'T:** Share private keys publicly

## 💡 Tips

- Test with 3-5 properties before adding all listings
- Use Unsplash URLs for testing images
- Keep data format consistent across rows
- Sheet changes may take a few minutes to appear (caching)
- Restart dev server for immediate updates during development

## 🆘 Getting Help

1. **Check troubleshooting sections** in the guides
2. **Review error messages** in your terminal
3. **Verify configuration** against the quick reference
4. **Open an issue** on GitHub with:
   - What you're trying to do
   - What's happening instead
   - Error messages (if any)
   - Steps you've already taken

## 📖 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Service Account Documentation](https://cloud.google.com/iam/docs/service-accounts)
- [Main README](../README.md)

## 🎉 Success Stories

Once you have Google Sheets integrated:
- Update property prices instantly
- Add new listings in seconds
- Let team members manage content
- No developer needed for updates
- Focus on selling, not coding!

---

**Ready to get started?** Begin with [QUICKSTART.md](./QUICKSTART.md)!

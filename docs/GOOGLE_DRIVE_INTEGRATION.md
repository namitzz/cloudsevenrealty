# Converting Google Drive Folder to Property Listings

If you have property listings in a Google Drive folder (e.g., as Google Docs or files), here's how to convert them to work with the website.

## Option 1: Create a Google Sheet from Your Folder (Recommended)

This is the easiest and most maintainable approach.

### Steps:

1. **Create a new Google Sheet** in your Drive

2. **Set up the columns** as described in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md):
   - Column A: Title
   - Column B: Subtitle
   - Column C: Price
   - Column D: Size
   - Column E: Location
   - Column F: Status (Buy/Rent/Land)
   - Column G: Image URL
   - Column H: Features (comma-separated)

3. **Extract data from your folder**:
   - Open each document/file in your folder
   - Copy the relevant information
   - Paste it into the corresponding columns in your sheet

4. **For images**:
   - Upload property images to a public location (Google Drive with public links, Imgur, Cloudinary, etc.)
   - Get the direct image URLs
   - Add them to column G

5. **Follow the setup guide** in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) to connect the sheet to your website

## Option 2: Using Google Drive API (Advanced)

If you want to programmatically read from Google Drive files:

### Prerequisites:
- Enable Google Drive API in Google Cloud Console
- Modify the data fetching code to read from Drive instead of Sheets

### Steps:

1. **Enable Google Drive API**:
   - Go to Google Cloud Console
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

2. **Grant Drive permissions to your service account**:
   - Share your Google Drive folder with the service account email
   - Give it "Viewer" access

3. **Update the code** to use Drive API (requires custom development)

**Note**: This approach requires more technical knowledge and custom code modifications. The Google Sheets approach (Option 1) is recommended for most users.

## Converting Your Google Drive Folder Structure

If your folder is organized like this:
```
Property Listings/
├── Property 1.docx
├── Property 2.docx
├── Property 3.docx
└── Images/
    ├── prop1.jpg
    ├── prop2.jpg
    └── prop3.jpg
```

### Recommended Approach:

1. **Create a Google Sheet** named "Property Listings"

2. **Add headers** in row 1:
   ```
   Title | Subtitle | Price | Size | Location | Status | Image URL | Features
   ```

3. **For each property document**:
   - Open the document
   - Extract: title, description, price, size, location, type
   - Add a row in the sheet with this information

4. **For images**:
   - Upload to a public host or make Google Drive images public
   - Get shareable links
   - Convert Drive links to direct image URLs:
     - Original: `https://drive.google.com/file/d/{FILE_ID}/view`
     - Direct: `https://drive.google.com/uc?export=view&id={FILE_ID}`

5. **Link the sheet** to your website using the [setup guide](./GOOGLE_SHEETS_SETUP.md)

## Sample Property Sheet Template

Here's a template you can copy:

| Title | Subtitle | Price | Size | Location | Status | Image URL | Features |
|-------|----------|-------|------|----------|--------|-----------|----------|
| Luxury Villa in Downtown | Spacious 4BHK villa with garden and parking | 2.5Cr | 3500 sqft | Downtown | Buy | https://drive.google.com/uc?export=view&id=YOUR_ID | 4 BHK, Garden, Parking, Modern amenities |
| Modern Apartment | 2BHK furnished apartment ready to move in | 25K/month | 1200 sqft | Suburbs | Rent | https://drive.google.com/uc?export=view&id=YOUR_ID | Furnished, 2 BHK, Ready to move, Near metro |
| Prime Land Plot | Agricultural land with road access | 35L | 2 kanal | Highway | Land | https://drive.google.com/uc?export=view&id=YOUR_ID | Road access, Water, Clear title |

## Tips for Managing Property Images

### Using Google Drive Images:

1. **Upload images to a folder** in Google Drive

2. **For each image**:
   - Right-click → "Get link"
   - Change to "Anyone with the link"
   - Copy the link (looks like: `https://drive.google.com/file/d/1ABC.../view`)

3. **Convert to direct URL**:
   - From: `https://drive.google.com/file/d/1ABCdef123XYZ/view`
   - To: `https://drive.google.com/uc?export=view&id=1ABCdef123XYZ`
   - Extract the FILE_ID (the part between `/d/` and `/view`)
   - Use format: `https://drive.google.com/uc?export=view&id={FILE_ID}`

### Alternative Image Hosting:

For better performance, consider using:

1. **ImgBB** (free, easy):
   - Go to [imgbb.com](https://imgbb.com/)
   - Upload image
   - Copy the "Direct link"

2. **Cloudinary** (free tier available):
   - Sign up at [cloudinary.com](https://cloudinary.com/)
   - Upload images
   - Get the image URLs

3. **Unsplash** (for testing):
   - Use Unsplash URLs for testing
   - Example: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800`

## Automation Ideas

If you have many properties, consider:

1. **Batch conversion script**:
   - Write a script to read all documents in your folder
   - Extract structured data
   - Generate a CSV file
   - Import CSV to Google Sheets

2. **Template documents**:
   - Create a Google Doc template for new properties
   - Use consistent formatting
   - Makes data extraction easier

3. **Forms**:
   - Create a Google Form for adding properties
   - Form responses auto-populate a Google Sheet
   - Sheet connects to your website

## Example: Converting from Google Docs

If your property info is in Google Docs like:

```
Property: Luxury Villa
Location: Downtown, Phase 8
Price: ₹2.5 Crores
Size: 3500 sq ft
Type: For Sale

Features:
- 4 Bedrooms
- Garden
- Parking
- Modern amenities
```

Convert to sheet row:
```
| Luxury Villa | Spacious villa in prime location | 2.5Cr | 3500 sqft | Downtown | Buy | [image_url] | 4 BHK, Garden, Parking, Modern amenities |
```

## Need Help?

1. **Watch our video tutorial** (coming soon)
2. **Check the main setup guide**: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
3. **Open an issue** on GitHub with your folder structure

---

## Quick Checklist

- [ ] Create a Google Sheet with proper columns
- [ ] Extract property data from Drive documents
- [ ] Upload/organize property images
- [ ] Get image URLs (direct links)
- [ ] Add data to the sheet
- [ ] Set up service account (see main guide)
- [ ] Share sheet with service account
- [ ] Configure environment variables
- [ ] Test the integration

Once completed, your properties from Google Drive will appear on your website!

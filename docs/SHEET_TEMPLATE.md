# Property Listings Template

Copy this template to your Google Sheet to get started quickly!

## Sheet Structure

Your Google Sheet should have these columns in row 1 (headers):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Title | Subtitle | Price | Size | Location | Status | Image URL | Features |

## Sample Data (Starting from Row 2)

### Row 2:
- **A2:** Luxury Villa in Downtown
- **B2:** Spacious 4BHK villa with garden and parking
- **C2:** 2.5Cr
- **D2:** 3500 sqft
- **E2:** Downtown
- **F2:** Buy
- **G2:** https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800
- **H2:** 4 BHK, Garden, Parking, Modern amenities

### Row 3:
- **A3:** Cozy Apartment in Suburbs
- **B3:** 2BHK furnished apartment ready to move in
- **C3:** 25K/month
- **D3:** 1200 sqft
- **E3:** Suburbs
- **F3:** Rent
- **G3:** https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800
- **H3:** Furnished, 2 BHK, Ready to move, Near metro

### Row 4:
- **A4:** Prime Land Near Highway
- **B4:** Agricultural land with road access and water supply
- **C4:** 35L
- **D4:** 2 kanal
- **E4:** Highway
- **F4:** Land
- **G4:** https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800
- **H4:** Road access, Water, 15 min to city, Clear title

## Quick Copy Format

You can also copy this CSV format and paste it into Google Sheets:

```csv
Title,Subtitle,Price,Size,Location,Status,Image URL,Features
Luxury Villa in Downtown,Spacious 4BHK villa with garden and parking,2.5Cr,3500 sqft,Downtown,Buy,https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800,"4 BHK, Garden, Parking, Modern amenities"
Cozy Apartment in Suburbs,2BHK furnished apartment ready to move in,25K/month,1200 sqft,Suburbs,Rent,https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800,"Furnished, 2 BHK, Ready to move, Near metro"
Prime Land Near Highway,Agricultural land with road access and water supply,35L,2 kanal,Highway,Land,https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800,"Road access, Water, 15 min to city, Clear title"
```

## Field Guidelines

### Title (Column A)
- Property name or headline
- Keep it concise and descriptive
- Example: "Luxury Villa in Downtown"

### Subtitle (Column B)
- Brief description (1-2 sentences)
- Highlight key features
- Example: "Spacious 4BHK villa with garden and parking"

### Price (Column C)
- Include unit (Cr, L, K/month, etc.)
- Examples: "2.5Cr", "35L", "25K/month"
- Can include currency symbol: "₹2.5Cr"

### Size (Column D)
- Include unit (sqft, kanal, acres, etc.)
- Examples: "3500 sqft", "2 kanal", "1 acre"

### Location (Column E)
- Area, neighborhood, or locality
- Examples: "Downtown", "Phase 8", "Suburbs"

### Status (Column F)
- MUST be one of: **Buy**, **Rent**, or **Land**
- Case-sensitive! Use exact spelling
- This determines the property type badge

### Image URL (Column G)
- Must be a publicly accessible image URL
- For testing, use Unsplash URLs
- For production, upload to cloud storage
- Format: Full URL starting with `https://`

### Features (Column H)
- Comma-separated list
- Example: "4 BHK, Garden, Parking, Modern amenities"
- Will be displayed as individual badges on the website

## Using This Template

1. **Create a new Google Sheet**
2. **Copy the header row** (Title, Subtitle, Price, Size, Location, Status, Image URL, Features)
3. **Add your property data** starting from row 2
4. **Name the sheet tab** "Properties" (or update `GOOGLE_SHEETS_RANGE` in your .env)
5. **Follow the setup guide** in [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## Tips

- Keep data consistent across rows
- Always fill at least columns A-F (Title through Status)
- Use placeholder images from Unsplash while testing
- Test with 3-5 properties first before adding all your listings
- You can always add more columns for your own tracking (they won't affect the website)

## Direct Google Sheets Link

You can also make a copy of our template sheet:
1. Go to: [Create a blank sheet](https://sheets.new)
2. Set up the columns as shown above
3. Add your data
4. Follow the setup guide

---

Need help? Check the [full setup guide](./GOOGLE_SHEETS_SETUP.md) or [contact support](../README.md#support).

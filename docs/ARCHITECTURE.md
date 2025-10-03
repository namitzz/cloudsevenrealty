# Google Sheets Integration Architecture

This document explains how the Google Sheets integration works under the hood.

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Google Sheets Integration                    │
└─────────────────────────────────────────────────────────────────┘

1. Your Google Sheet
   ┌──────────────────────────────┐
   │  Title | Subtitle | Price ... │
   │─────────────────────────────│
   │  Villa | 4BHK    | 2.5Cr ... │
   │  Apt   | 2BHK    | 25K   ... │
   └──────────────────────────────┘
              │
              │ Service Account
              │ (Read Permission)
              ▼
2. Google Sheets API
   ┌──────────────────────────────┐
   │  googleapis library          │
   │  - Authenticates             │
   │  - Fetches data              │
   │  - Returns rows              │
   └──────────────────────────────┘
              │
              │ Raw sheet data
              ▼
3. Data Transformation (lib/googleSheets.ts)
   ┌──────────────────────────────┐
   │  fetchPropertiesFromSheet()  │
   │  - Validates data            │
   │  - Generates slugs           │
   │  - Maps to PropertyData      │
   │  - Returns typed array       │
   └──────────────────────────────┘
              │
              │ PropertyData[]
              ▼
4. Properties Page (app/properties/page.tsx)
   ┌──────────────────────────────┐
   │  PropertiesPage Component    │
   │  - Calls getProperties()     │
   │  - Maps to PropertyCard      │
   │  - Renders grid              │
   └──────────────────────────────┘
              │
              │ React Components
              ▼
5. Your Website
   ┌──────────────────────────────┐
   │  🏠 Properties Display        │
   │  - Cards with images         │
   │  - Prices and details        │
   │  - Filters                   │
   └──────────────────────────────┘
```

## Configuration Flow

```
Environment Variables (.env)
┌─────────────────────────────────────┐
│ GOOGLE_SHEETS_SPREADSHEET_ID        │
│ GOOGLE_SERVICE_ACCOUNT_EMAIL        │
│ GOOGLE_PRIVATE_KEY                  │
│ GOOGLE_SHEETS_RANGE                 │
└─────────────────────────────────────┘
           │
           │ Used by
           ▼
lib/googleSheets.ts
┌─────────────────────────────────────┐
│ function fetchPropertiesFromSheet() │
│ - Checks env vars                   │
│ - Creates auth                      │
│ - Fetches data                      │
│ - Returns properties                │
└─────────────────────────────────────┘
```

## Fallback Mechanism

```
getProperties() Function
           │
           ▼
    ┌─────────────┐
    │ Are env vars│ NO
    │ configured? ├────────┐
    └─────┬───────┘        │
          │ YES            │
          ▼                ▼
┌───────────────────┐  ┌─────────────────┐
│ Fetch from Google │  │ Return mock data│
│ Sheets API        │  │ (fallback)      │
└─────┬─────────────┘  └────────┬────────┘
      │                         │
      ▼                         │
┌───────────────────┐          │
│ Data fetched OK?  │ NO       │
└─────┬─────────────┘──────────┤
      │ YES                     │
      ▼                         ▼
┌───────────────────────────────────┐
│   Return PropertyData[]           │
└───────────────────────────────────┘
```

## Component Structure

```
app/properties/page.tsx
├── PropertiesPage (async)
│   ├── getProperties() ──────┐
│   ├── Header                 │
│   ├── Filters                │
│   └── Property Grid          │
│       └── PropertyCard[]     │
│                              │
└─────────────────────────────┘
                               │
lib/googleSheets.ts           │
├── getProperties() ◄──────────┘
│   └── fetchPropertiesFromSheet()
│       ├── Check environment
│       ├── Authenticate
│       ├── Fetch data
│       ├── Transform data
│       └── Return PropertyData[]
└── getMockProperties()
    └── Return fallback data
```

## Data Structure

### Input (Google Sheet Row)
```typescript
Row = [
  "Luxury Villa",           // Column A: Title
  "Spacious 4BHK villa",   // Column B: Subtitle
  "2.5Cr",                 // Column C: Price
  "3500 sqft",             // Column D: Size
  "Downtown",              // Column E: Location
  "Buy",                   // Column F: Status
  "https://...",           // Column G: Image URL
  "4 BHK, Garden, Parking" // Column H: Features
]
```

### Output (PropertyData Object)
```typescript
interface PropertyData {
  slug: string;              // Generated from title
  title: string;             // Column A
  subtitle: string;          // Column B
  price: string;             // Column C
  size: string;              // Column D
  location: string;          // Column E
  status: 'Buy' | 'Rent' | 'Land'; // Column F
  imageUrl: string;          // Column G
  features: string[];        // Column H (split by comma)
}
```

## Authentication Flow

```
1. Service Account Key (JSON)
   {
     "client_email": "...",
     "private_key": "..."
   }
           │
           ▼
2. GoogleAuth Object
   new google.auth.GoogleAuth({
     credentials: { ... },
     scopes: ['spreadsheets.readonly']
   })
           │
           ▼
3. Sheets API Client
   google.sheets({ version: 'v4', auth })
           │
           ▼
4. API Request
   sheets.spreadsheets.values.get({
     spreadsheetId: "...",
     range: "Properties!A2:H"
   })
           │
           ▼
5. Response with Data
   { values: [[...], [...], ...] }
```

## Error Handling

```
Try to fetch from Google Sheets
    │
    ├─ No env vars configured
    │  └─> Log: "Google Sheets not configured"
    │      Return: []
    │
    ├─ Authentication error
    │  └─> Log: "Error fetching from Google Sheets"
    │      Return: []
    │
    ├─ No data found
    │  └─> Log: "No data found in Google Sheets"
    │      Return: []
    │
    └─ Success
       └─> Return: PropertyData[]

getProperties() receives the result
    │
    ├─ Got data from sheets (length > 0)
    │  └─> Return: sheet data
    │
    └─ No data (length === 0)
       └─> Return: getMockProperties()
```

## Build-Time vs Runtime

### Build Time (Static Generation)
```
npm run build
    │
    ├─> Calls PropertiesPage
    │   └─> Calls getProperties()
    │       └─> Fetches from Google Sheets
    │           └─> Builds static page with data
    │
    └─> Static HTML generated
```

### Runtime (Dynamic Rendering)
```
User visits /properties
    │
    └─> Server renders PropertiesPage
        └─> Calls getProperties()
            └─> Fetches fresh data from Google Sheets
                └─> Returns HTML with latest data
```

**Note:** The properties page uses dynamic rendering (server-side) to always fetch the latest data.

## Performance Considerations

### Caching
- Next.js caches responses automatically
- Set revalidation time if needed:
  ```typescript
  export const revalidate = 300; // Revalidate every 5 minutes
  ```

### Rate Limits
- Google Sheets API: 100 requests per 100 seconds per user
- 500 requests per 100 seconds per project
- Service account requests count toward project quota

### Optimization Tips
1. Use appropriate sheet ranges (don't fetch unused columns)
2. Consider caching for high-traffic sites
3. Monitor API usage in Google Cloud Console
4. Add pagination for large datasets

## Security Model

```
┌─────────────────────────────────────────┐
│ Your Website (Server)                   │
│ ┌─────────────────────────────────────┐ │
│ │ Environment Variables (Secret)      │ │
│ │ - GOOGLE_PRIVATE_KEY               │ │
│ │ - GOOGLE_SERVICE_ACCOUNT_EMAIL     │ │
│ └─────────────────────────────────────┘ │
│              │                          │
│              │ Never exposed            │
│              │ to client                │
│              ▼                          │
│ ┌─────────────────────────────────────┐ │
│ │ Server-side API Call                │ │
│ │ (lib/googleSheets.ts)               │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
              │
              │ Authenticated request
              ▼
┌─────────────────────────────────────────┐
│ Google Sheets API                       │
│ - Validates service account             │
│ - Checks permissions                    │
│ - Returns data                          │
└─────────────────────────────────────────┘
              │
              │ Read-only access
              ▼
┌─────────────────────────────────────────┐
│ Your Google Sheet                       │
│ - Shared with service account (Viewer)  │
│ - Only read operations allowed          │
└─────────────────────────────────────────┘
```

**Security Features:**
- ✅ Service account credentials never exposed to client
- ✅ Read-only permissions
- ✅ Environment variables kept server-side
- ✅ No user authentication required
- ✅ Sheet access controlled via Google permissions

## Debugging

### Enable Debug Logging

Add to `lib/googleSheets.ts`:

```typescript
console.log('Environment check:', {
  hasSpreadsheetId: !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  hasKey: !!process.env.GOOGLE_PRIVATE_KEY
});
```

### Common Issues

1. **"Google Sheets not configured"**
   - Check environment variables are set
   - Restart dev server after adding .env

2. **"Error fetching from Google Sheets"**
   - Verify service account has access to sheet
   - Check private key format (includes \n)
   - Ensure Google Sheets API is enabled

3. **"No data found"**
   - Check sheet range (default: Properties!A2:H)
   - Verify sheet tab name
   - Ensure data exists in the range

## Extension Points

Want to customize? Here are the key extension points:

### 1. Add More Fields
Edit `lib/googleSheets.ts` to add columns:
```typescript
interface PropertyData {
  // ... existing fields
  bedrooms: number;  // Add new field
  bathrooms: number; // Add new field
}
```

### 2. Change Data Source
Replace `fetchPropertiesFromSheet()` with:
- Sanity CMS client
- Database query
- Different API
- Static JSON file

### 3. Add Caching
Implement Redis or in-memory caching:
```typescript
const cache = new Map();
export async function getProperties() {
  if (cache.has('properties')) {
    return cache.get('properties');
  }
  const data = await fetchPropertiesFromSheet();
  cache.set('properties', data);
  return data;
}
```

### 4. Add Filtering
Filter properties on server-side:
```typescript
export async function getProperties(filters: Filters) {
  const allProperties = await fetchPropertiesFromSheet();
  return allProperties.filter(p => 
    (!filters.status || p.status === filters.status) &&
    (!filters.location || p.location === filters.location)
  );
}
```

---

For more information, see:
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Setup instructions
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [Google Sheets API Docs](https://developers.google.com/sheets/api)

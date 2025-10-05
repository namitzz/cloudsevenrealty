import { google } from 'googleapis';

// Types for property data from Google Sheets
export interface PropertyData {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  size: string;
  location: string;
  status: 'Buy' | 'Rent' | 'Land';
  imageUrl: string;
  features: string[];
}

/**
 * Fetch properties from Google Sheets
 * 
 * Expected sheet structure:
 * Column A: Title
 * Column B: Subtitle
 * Column C: Price
 * Column D: Size
 * Column E: Location
 * Column F: Status (Buy/Rent/Land)
 * Column G: Image URL
 * Column H: Features (comma-separated)
 */
export async function fetchPropertiesFromSheet(): Promise<PropertyData[]> {
  try {
    // Check if Google Sheets is configured
    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID || 
        !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
        !process.env.GOOGLE_PRIVATE_KEY) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Google Sheets not configured, using mock data');
      }
      return [];
    }

    // Configure authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Fetch data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: process.env.GOOGLE_SHEETS_RANGE || 'Properties!A2:H', // Skip header row
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No data found in Google Sheets');
      }
      return [];
    }

    // Transform rows into PropertyData objects
    const properties: PropertyData[] = rows
      .filter(row => row.length >= 6 && row[0]) // At least 6 columns and title exists
      .map((row, index) => {
        const title = row[0] || '';
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        
        return {
          slug: slug || `property-${index + 1}`,
          title,
          subtitle: row[1] || '',
          price: row[2] || '',
          size: row[3] || '',
          location: row[4] || '',
          status: (row[5] as 'Buy' | 'Rent' | 'Land') || 'Buy',
          imageUrl: row[6] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
          features: row[7] ? row[7].split(',').map((f: string) => f.trim()) : [],
        };
      });

    return properties;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

/**
 * Get properties with fallback to mock data
 */
export async function getProperties(): Promise<PropertyData[]> {
  const sheetProperties = await fetchPropertiesFromSheet();
  
  // If we got data from sheets, return it
  if (sheetProperties.length > 0) {
    return sheetProperties;
  }
  
  // Otherwise, return mock data as fallback
  return getMockProperties();
}

/**
 * Mock properties for development/fallback
 */
export function getMockProperties(): PropertyData[] {
  return [
    {
      slug: "luxury-villa-downtown",
      title: "Luxury Villa in Downtown",
      subtitle: "Spacious 4BHK villa with garden and parking",
      price: "2.5Cr",
      size: "3500 sqft",
      location: "Downtown",
      status: "Buy" as const,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      features: ["4 BHK", "Garden", "Parking", "Modern amenities"]
    },
    {
      slug: "cozy-apartment-suburbs",
      title: "Cozy Apartment in Suburbs",
      subtitle: "2BHK furnished apartment ready to move in",
      price: "25K/month",
      size: "1200 sqft",
      location: "Suburbs",
      status: "Rent" as const,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      features: ["Furnished", "2 BHK", "Ready to move", "Near metro"]
    },
    {
      slug: "prime-land-highway",
      title: "Prime Land Near Highway",
      subtitle: "Agricultural land with road access and water supply",
      price: "35L",
      size: "2 kanal",
      location: "Highway",
      status: "Land" as const,
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      features: ["Road access", "Water", "15 min to city", "Clear title"]
    }
  ];
}

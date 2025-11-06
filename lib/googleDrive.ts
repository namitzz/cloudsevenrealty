import { google } from 'googleapis';

// Import the PropertyData interface from googleSheets
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

interface MetaJson {
  title?: string;
  subtitle?: string;
  price?: string;
  size?: string;
  location?: string;
  status?: 'Buy' | 'Rent' | 'Land';
  features?: string[];
}

/**
 * Fetch properties from Google Drive
 * 
 * This function reads property data from a Google Drive folder in two ways:
 * 1. If a properties.json file exists in the root folder, it parses and returns it
 * 2. Otherwise, it lists subfolders, reads meta.json from each, and extracts the first image
 */
export async function getPropertiesFromDrive(): Promise<PropertyData[]> {
  try {
    // Check if Google Drive is configured
    if (!process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID || 
        !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
        !process.env.GOOGLE_PRIVATE_KEY) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Google Drive not configured, returning empty array');
      }
      return [];
    }

    // Configure authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });
    
    // First, check if properties.json exists in the root folder
    const propertiesJsonFile = await findFileInFolder(
      drive,
      process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID,
      'properties.json'
    );

    if (propertiesJsonFile) {
      // Read and parse properties.json
      return await readPropertiesJson(drive, propertiesJsonFile);
    }

    // If properties.json doesn't exist, list subfolders and process each
    return await readPropertiesFromSubfolders(drive, process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID);
  } catch (error) {
    console.error('Error fetching from Google Drive:', error);
    return [];
  }
}

/**
 * Find a file by name in a specific folder
 */
async function findFileInFolder(
  drive: ReturnType<typeof google.drive>,
  folderId: string,
  fileName: string
): Promise<string | null> {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and name='${fileName}' and trashed=false`,
      fields: 'files(id, name)',
      pageSize: 1,
    });

    const files = response.data.files;
    if (files && files.length > 0 && files[0].id) {
      return files[0].id;
    }
    return null;
  } catch (error) {
    console.error(`Error finding file ${fileName} in folder ${folderId}:`, error);
    return null;
  }
}

/**
 * Read and parse properties.json file from Drive
 */
async function readPropertiesJson(
  drive: ReturnType<typeof google.drive>,
  fileId: string
): Promise<PropertyData[]> {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    }, {
      responseType: 'text',
    });

    const content = typeof response.data === 'string' 
      ? response.data 
      : JSON.stringify(response.data);
    
    const properties = JSON.parse(content);
    
    if (!Array.isArray(properties)) {
      console.error('properties.json is not an array');
      return [];
    }

    // Validate and transform properties
    return properties.map((prop: PropertyData, index: number) => ({
      slug: prop.slug || generateSlug(prop.title || `property-${index + 1}`),
      title: prop.title || '',
      subtitle: prop.subtitle || '',
      price: prop.price || '',
      size: prop.size || '',
      location: prop.location || '',
      status: prop.status || 'Buy',
      imageUrl: prop.imageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      features: Array.isArray(prop.features) ? prop.features : [],
    }));
  } catch (error) {
    console.error('Error reading properties.json:', error);
    return [];
  }
}

/**
 * Read properties from subfolders by reading meta.json and extracting images
 */
async function readPropertiesFromSubfolders(
  drive: ReturnType<typeof google.drive>,
  rootFolderId: string
): Promise<PropertyData[]> {
  try {
    // List all subfolders
    const response = await drive.files.list({
      q: `'${rootFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: 'files(id, name)',
      pageSize: 100,
    });

    const folders = response.data.files;
    if (!folders || folders.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.log('No subfolders found in Google Drive root folder');
      }
      return [];
    }

    // Process each subfolder
    const properties: PropertyData[] = [];
    for (const folder of folders) {
      if (!folder.id) continue;

      const property = await processPropertyFolder(drive, folder.id, folder.name || 'Untitled');
      if (property) {
        properties.push(property);
      }
    }

    return properties;
  } catch (error) {
    console.error('Error reading properties from subfolders:', error);
    return [];
  }
}

/**
 * Process a single property folder by reading meta.json and finding the first image
 */
async function processPropertyFolder(
  drive: ReturnType<typeof google.drive>,
  folderId: string,
  folderName: string
): Promise<PropertyData | null> {
  try {
    // Find and read meta.json
    const metaJsonFileId = await findFileInFolder(drive, folderId, 'meta.json');
    
    if (!metaJsonFileId) {
      console.warn(`No meta.json found in folder: ${folderName}`);
      return null;
    }

    const metaResponse = await drive.files.get({
      fileId: metaJsonFileId,
      alt: 'media',
    }, {
      responseType: 'text',
    });

    const metaContent = typeof metaResponse.data === 'string' 
      ? metaResponse.data 
      : JSON.stringify(metaResponse.data);
    
    const meta: MetaJson = JSON.parse(metaContent);

    // Find the first image file in the folder
    const imageFileId = await findFirstImageInFolder(drive, folderId);
    const imageUrl = imageFileId 
      ? `https://drive.google.com/uc?export=view&id=${imageFileId}`
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800';

    // Create property data from meta.json
    const title = meta.title || folderName;
    return {
      slug: generateSlug(title),
      title,
      subtitle: meta.subtitle || '',
      price: meta.price || '',
      size: meta.size || '',
      location: meta.location || '',
      status: meta.status || 'Buy',
      imageUrl,
      features: Array.isArray(meta.features) ? meta.features : [],
    };
  } catch (error) {
    console.error(`Error processing property folder ${folderName}:`, error);
    return null;
  }
}

/**
 * Find the first image file in a folder
 */
async function findFirstImageInFolder(
  drive: ReturnType<typeof google.drive>,
  folderId: string
): Promise<string | null> {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'image/') and trashed=false`,
      fields: 'files(id, name, mimeType)',
      orderBy: 'name',
      pageSize: 1,
    });

    const files = response.data.files;
    if (files && files.length > 0 && files[0].id) {
      return files[0].id;
    }
    return null;
  } catch (error) {
    console.error('Error finding image in folder:', error);
    return null;
  }
}

/**
 * Generate a URL-friendly slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

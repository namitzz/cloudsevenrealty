// Sanity CMS client configuration
// Install: npm install next-sanity @sanity/image-url

// Uncomment when Sanity is configured:
/*
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false, // Set to true for production
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
*/

// Mock client for development
export const client = {
  fetch: async (_query: string) => {
    // Mock Sanity client - replace with real client when configured
    return [];
  }
};

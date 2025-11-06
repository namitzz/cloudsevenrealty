/**
 * Shared type definitions for property data
 */

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

# Sanity CMS Schema Examples

These schema examples can be used when setting up your Sanity Studio.

## Installation

1. Create a Sanity project:
   ```bash
   npm create sanity@latest
   ```

2. Copy these schemas to your `sanity/schemas` directory

3. Import them in your `sanity.config.ts`:
   ```typescript
   import {defineConfig} from 'sanity'
   import {project} from './schemas/project'
   import {property} from './schemas/property'
   import {area} from './schemas/area'
   import {testimonial} from './schemas/testimonial'

   export default defineConfig({
     // ... other config
     schema: {
       types: [project, property, area, testimonial],
     },
   })
   ```

## Schema Files

### project.ts
```typescript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Launching', value: 'launching'},
          {title: 'Ready', value: 'ready'},
          {title: 'Sold Out', value: 'sold-out'},
        ],
      },
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'pricing',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'size', type: 'string', title: 'Size'},
            {name: 'price', type: 'string', title: 'Price'},
            {name: 'features', type: 'array', of: [{type: 'string'}], title: 'Features'},
          ],
        },
      ],
    },
    {
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string', title: 'Question'},
            {name: 'answer', type: 'text', title: 'Answer'},
          ],
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
}
```

### property.ts
```typescript
export default {
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Buy', value: 'buy'},
          {title: 'Rent', value: 'rent'},
          {title: 'Land', value: 'land'},
        ],
      },
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'object',
      fields: [
        {name: 'propertyType', type: 'string', title: 'Property Type'},
        {name: 'totalArea', type: 'string', title: 'Total Area'},
        {name: 'bedrooms', type: 'string', title: 'Bedrooms'},
        {name: 'bathrooms', type: 'string', title: 'Bathrooms'},
        {name: 'floors', type: 'string', title: 'Floors'},
        {name: 'parking', type: 'string', title: 'Parking'},
        {name: 'furnishing', type: 'string', title: 'Furnishing'},
        {name: 'age', type: 'string', title: 'Property Age'},
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
}
```

### area.ts
```typescript
export default {
  name: 'area',
  title: 'Area',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
```

### testimonial.ts
```typescript
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
}
```

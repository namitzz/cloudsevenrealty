// GROQ queries for Sanity CMS

// Projects
export const projectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  slug,
  title,
  subtitle,
  price,
  size,
  location,
  status,
  "imageUrl": mainImage.asset->url,
  highlights
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  slug,
  title,
  subtitle,
  tagline,
  price,
  size,
  location,
  status,
  "heroImage": mainImage.asset->url,
  highlights,
  "gallery": gallery[].asset->url,
  pricing,
  faqs,
  description
}`;

// Properties
export const propertiesQuery = `*[_type == "property"] | order(publishedAt desc) {
  _id,
  slug,
  title,
  subtitle,
  price,
  size,
  location,
  status,
  "imageUrl": mainImage.asset->url,
  features
}`;

export const propertyBySlugQuery = `*[_type == "property" && slug.current == $slug][0] {
  _id,
  slug,
  title,
  subtitle,
  tagline,
  price,
  size,
  location,
  status,
  "heroImage": mainImage.asset->url,
  features,
  "gallery": gallery[].asset->url,
  specifications,
  description
}`;

// Areas
export const areasQuery = `*[_type == "area"] | order(name asc) {
  _id,
  slug,
  name,
  description,
  "projectCount": count(*[_type == "project" && references(^._id)]),
  "propertyCount": count(*[_type == "property" && references(^._id)])
}`;

export const areaBySlugQuery = `*[_type == "area" && slug.current == $slug][0] {
  _id,
  slug,
  name,
  description,
  "projects": *[_type == "project" && references(^._id)] {
    _id,
    slug,
    title,
    price,
    "imageUrl": mainImage.asset->url
  },
  "properties": *[_type == "property" && references(^._id)] {
    _id,
    slug,
    title,
    price,
    "imageUrl": mainImage.asset->url
  }
}`;

// Testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  "avatarUrl": avatar.asset->url,
  text,
  rating
}`;

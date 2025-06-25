// lib/queries.ts
export const PRODUCTS_QUERY = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  description,
  images,
  price,
  category->{
    _id,
    name,
    slug
  },
  featured,
  weight,
  dimensions
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  description,
  detailedDescription,
  images,
  price,
  category->{
    _id,
    name,
    slug
  },
  specifications,
  variants,
  featured,
  weight,
  dimensions
}`;

export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  name,
  slug,
  description,
  images,
  price,
  category->{
    _id,
    name,
    slug
  },
  featured
}`;
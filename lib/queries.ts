import { defineQuery } from "next-sanity";

const PRODUCTS_QUERY =
	defineQuery(`*[_type == "product"] | order(_createdAt desc) {
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
}`);

const PRODUCT_BY_SLUG_QUERY =
	defineQuery(`*[_type == "product" && slug.current == $slug][0] {
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
}`);

const FEATURED_PRODUCTS_QUERY =
	defineQuery(`*[_type == "product" && featured == true] | order(_createdAt desc) {
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
}`);

export { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY, FEATURED_PRODUCTS_QUERY };

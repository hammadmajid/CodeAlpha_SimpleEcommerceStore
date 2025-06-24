import { defineField, defineType } from "sanity";

export const product = defineType({
	name: "product",
	title: "Product",
	type: "document",
	fields: [
		// Basic Information
		defineField({
			name: "name",
			title: "Product Name",
			type: "string",
			validation: (Rule) => Rule.required().min(3).max(100),
		}),

		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 200,
				slugify: (input) =>
					input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 4,
			validation: (Rule) => Rule.max(500),
		}),

		defineField({
			name: "detailedDescription",
			title: "Detailed Description",
			type: "array",
			of: [{ type: "block" }],
		}),

		// Images
		defineField({
			name: "images",
			title: "Product Images",
			type: "array",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "alt",
							title: "Alt Text",
							type: "string",
							validation: (Rule) => Rule.required(),
						},
					],
				},
			],
			validation: (Rule) => Rule.min(1).max(10),
		}),

		// Pricing
		defineField({
			name: "price",
			title: "Price",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),

		// Categories & Classification
		defineField({
			name: "category",
			title: "Primary Category",
			type: "reference",
			to: [{ type: "category" }],
			validation: (Rule) => Rule.required(),
		}),

		// Product specifications
		defineField({
			name: "specifications",
			title: "Specifications",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "name",
							title: "Specification Name",
							type: "string",
						},
						{
							name: "value",
							title: "Value",
							type: "string",
						},
					],
				},
			],
		}),

		// Variants (for products with different colors, sizes, etc.)
		defineField({
			name: "variants",
			title: "Product Variants",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "name",
							title: "Variant Name",
							type: "string",
						},
						{
							name: "price",
							title: "Variant Price",
							type: "number",
						},
						{
							name: "image",
							title: "Variant Image",
							type: "image",
						},
					],
				},
			],
		}),

		// Properties
		defineField({
			name: "featured",
			title: "Featured Product",
			type: "boolean",
			initialValue: false,
		}),

		defineField({
			name: "weight",
			title: "Weight (in grams)",
			type: "number",
			validation: (Rule) => Rule.min(0),
		}),

		defineField({
			name: "dimensions",
			title: "Dimensions",
			type: "object",
			fields: [
				{
					name: "length",
					title: "Length (cm)",
					type: "number",
				},
				{
					name: "width",
					title: "Width (cm)",
					type: "number",
				},
				{
					name: "height",
					title: "Height (cm)",
					type: "number",
				},
			],
		}),
	],

	preview: {
		select: {
			title: "name",
			media: "images.0",
			price: "price",
		},
		prepare({ title, media, price }) {
			return {
				title,
				subtitle: `$${price}`,
				media,
			};
		},
	},
});


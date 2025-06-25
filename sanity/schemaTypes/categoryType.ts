import { defineField, defineType } from "sanity";

export const category = defineType({
	name: "category",
	title: "Category",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Category Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),

		defineField({
			name: "image",
			title: "Category Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
});

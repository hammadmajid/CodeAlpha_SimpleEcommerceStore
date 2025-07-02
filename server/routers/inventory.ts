import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import {
	PRODUCT_BY_SLUG_QUERY,
	PRODUCTS_BY_SLUGS_QUERY,
	PRODUCTS_QUERY,
} from "@/lib/queries";
import type {
	PRODUCTS_BY_SLUGS_QUERYResult,
	PRODUCTS_QUERYResult,
	PRODUCT_BY_SLUG_QUERYResult,
} from "@/sanity/types";

export const inventoryRouter = createTRPCRouter({
	getBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.query(async ({ ctx, input }) => {
			const { slug } = input;
			return (await ctx.sanity.fetch(PRODUCT_BY_SLUG_QUERY, {
				slug,
			})) as PRODUCT_BY_SLUG_QUERYResult;
		}),

	getAll: publicProcedure.query(async ({ ctx }) => {
		return (await ctx.sanity.fetch(PRODUCTS_QUERY)) as PRODUCTS_QUERYResult;
	}),

	getProductsBySlugs: publicProcedure
		.input(z.object({ slugs: z.array(z.string()) }))
		.query(async ({ ctx, input }) => {
			const products = await ctx.sanity.fetch(PRODUCTS_BY_SLUGS_QUERY, {
				slugs: input.slugs,
			});
			return products as PRODUCTS_BY_SLUGS_QUERYResult;
		}),
});

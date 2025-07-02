import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { itemSchema } from "@/lib/cart";

export const cartRouter = createTRPCRouter({
	getItemsCount: publicProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const cart = await ctx.db.cartItem.findMany({
				where: {
					userId: input.userId,
				},
			});

			// Sum the quantity property of each cart item
			const totalCount = cart.reduce(
				(sum, item) => sum + (item.quantity ?? 0),
				0,
			);

			return totalCount;
		}),

	getAll: publicProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			return await ctx.db.cartItem.findMany({
				where: {
					userId: input.userId,
				},
				select: {
					itemId: true,
					slug: true,
					quantity: true,
					variant: true,
				},
			});
		}),

	insertItem: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				item: itemSchema,
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { userId, item } = input;
			const { itemId, slug, variant } = item;

			await ctx.db.cartItem.upsert({
				where: {
					userId_itemId: { userId, itemId },
				},
				update: { quantity: { increment: 1 } },
				create: { userId, itemId, slug, quantity: 1, variant },
			});
		}),
});

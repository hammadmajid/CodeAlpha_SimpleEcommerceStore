import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { cartSchema } from "@/lib/cart";

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
			});
		}),

	insertItem: publicProcedure
		.input(cartSchema)
		.mutation(async ({ ctx, input }) => {
			const { userId, itemId, slug, variant } = input;

			await ctx.db.cartItem.upsert({
				where: {
					userId_itemId: { userId, itemId },
				},
				update: { quantity: { increment: 1 } },
				create: { userId, itemId, slug, quantity: 1, variant },
			});
		}),
});

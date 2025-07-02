import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";

export const cartRouter = createTRPCRouter({
	getItemsCount: publicProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const cart = await ctx.db.cartItem.findMany({
				where: {
					userId: input.userId,
				},
			});

			return cart.length;
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
		.input(
			z.object({
				userId: z.string(),
				itemId: z.string(),
				slug: z.string(),
				variant: z.string().optional(),
			}),
		)
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

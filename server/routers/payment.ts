import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { stripeLineItemsSchema } from "@/utils/stripe";
import { itemSchema } from "@/lib/cart";

export const paymentRouter = createTRPCRouter({
	getSession: publicProcedure
		.input(z.object({ sessionId: z.string() }))
		.query(async ({ input, ctx }) => {
			const session = await ctx.stripe.checkout.sessions.retrieve(
				input.sessionId,
			);
			return session;
		}),

	checkout: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				lineItems: stripeLineItemsSchema,
				cartItems: z.array(itemSchema),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { userId, lineItems, cartItems } = input;

			const session = await ctx.stripe.checkout.sessions.create({
				payment_method_types: ["card"],
				line_items: lineItems,
				mode: "payment",
				success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
				metadata: { userId },
			});

			await ctx.db.order.create({
				data: {
					status: "pending",
					cartItems: {
						create: cartItems.map((item) => ({
							userId,
							itemId: item.itemId,
							slug: item.slug,
							quantity: item.quantity ?? 1,
							variant: item.variant ?? undefined,
						})),
					},
				},
			});

			return { id: session.id, url: session.url };
		}),
});

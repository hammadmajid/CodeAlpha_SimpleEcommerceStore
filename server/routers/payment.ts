import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { stripeLineItemsSchema } from "@/utils/stripe";

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
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { userId, lineItems } = input;

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
					sessionId: session.id,
					userId,
				},
			});

			return { id: session.id, url: session.url };
		}),

	getOrder: publicProcedure
		.input(z.object({ sessionId: z.string() }))
		.query(async ({ input, ctx }) => {
			const session = await ctx.stripe.checkout.sessions.retrieve(
				input.sessionId,
				{
					expand: [
						"line_items.data.price.product",
						"customer",
						"payment_intent",
					],
				},
			);

			const orderData = {
				id: session.id,
				status: session.payment_status,
				userId: session.metadata?.userId,
				items: session.line_items?.data.map((item) => ({
					productId: item.price?.product,
					quantity: item.quantity,
					amount: item.amount_total,
					description: item.description,
				})),
				total: session.amount_total,
				currency: session.currency,
				createdAt: new Date(session.created * 1000),
			};

			return orderData;
		}),
});

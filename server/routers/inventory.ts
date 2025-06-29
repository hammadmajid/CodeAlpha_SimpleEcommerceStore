import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { PRODUCT_BY_SLUG_QUERY, PRODUCTS_QUERY } from "@/lib/queries";

export const inventoryRouter = createTRPCRouter({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello ${input.text}`,
            };
        }),

    getBySlug: publicProcedure.input(z.string()).query(
        async ({ ctx, input }) => {
            const item = await ctx.client.fetch(PRODUCT_BY_SLUG_QUERY, { input })

            return item;
        }
    ),

    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.client.fetch(PRODUCTS_QUERY);
    })
})
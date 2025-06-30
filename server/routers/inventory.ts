import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { PRODUCT_BY_SLUG_QUERY, PRODUCTS_QUERY } from "@/lib/queries";
import type { PRODUCTS_QUERYResult, PRODUCT_BY_SLUG_QUERYResult } from "@/sanity/types";

export const inventoryRouter = createTRPCRouter({
    getBySlug: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        return await ctx.sanity.fetch(PRODUCT_BY_SLUG_QUERY, { input }) as PRODUCT_BY_SLUG_QUERYResult;
    }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.sanity.fetch(PRODUCTS_QUERY) as PRODUCTS_QUERYResult;
    }),
});

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/trpc";
import { PRODUCT_BY_SLUG_QUERY, PRODUCTS_QUERY } from "@/lib/queries";
import { Product } from "@/types/product";

export const inventoryRouter = createTRPCRouter({
    getBySlug: publicProcedure.input(z.string()).query(
        async ({ ctx, input }): Promise<Product> => {
            return await ctx.client.fetch(PRODUCT_BY_SLUG_QUERY, { input })
        }
    ),

    getAll: publicProcedure.query(async ({ ctx }): Promise<Product[]> => {
        return await ctx.client.fetch(PRODUCTS_QUERY);
    })
})
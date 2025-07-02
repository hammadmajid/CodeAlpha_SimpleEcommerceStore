import { z } from "zod";

export const itemSchema = z.object({
	itemId: z.string(),
	slug: z.string(),
	variant: z.string().optional(),
	quantity: z.number().optional(),
});

export const cartSchema = z.object({
	userId: z.string(),
	iems: z.array(itemSchema),
});

export type Item = z.infer<typeof itemSchema>;
export type Cart = z.infer<typeof cartSchema>;

import { z } from "zod";

export const cartSchema = z.object({
	userId: z.string(),
	itemId: z.string(),
	slug: z.string(),
	variant: z.string().optional(),
	quantity: z.number().optional(),
});

export type Cart = z.infer<typeof cartSchema>;

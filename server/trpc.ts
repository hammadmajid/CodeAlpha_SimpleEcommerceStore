import { initTRPC } from "@trpc/server";
import db from "@/lib/prisma";
import superjson from "superjson";
import { ZodError } from "zod";
import { client } from "@/sanity/lib/client";
import stripe from "@/lib/stripe";

export const createTRPCContext = async (opts: { headers: Headers }) => {
	return {
		sanity: client,
		db,
		stripe,
		...opts,
	};
};

const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		};
	},
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

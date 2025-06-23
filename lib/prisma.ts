import { PrismaClient } from "@/app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

/**
 * A global variable used to store the Prisma client instance on the Node.js global object.
 *
 * This pattern is commonly used in server-side applications (such as Next.js or serverless environments)
 * to prevent multiple instances of the Prisma client from being created during hot-reloads or repeated imports.
 *
 * By casting the global object to a custom type that includes a `prisma` property,
 * TypeScript is informed that `global.prisma` exists and is of the same type as the Prisma client.
 *
 * @remarks
 * - The `as unknown as { prisma: typeof prisma }` cast is necessary because the default Node.js `global` type
 *   does not include a `prisma` property.
 * - This approach helps maintain a singleton instance of the Prisma client across the application lifecycle.
 *
 * @example
 * ```typescript
 * if (!globalForPrisma.prisma) {
 *   globalForPrisma.prisma = new PrismaClient();
 * }
 * export const prisma = globalForPrisma.prisma;
 * ```
 */
const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const prisma =
	globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

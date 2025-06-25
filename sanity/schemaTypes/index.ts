import type { SchemaTypeDefinition } from "sanity";
import { product } from "./productType";
import { category } from "./categoryType";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [product, category],
};

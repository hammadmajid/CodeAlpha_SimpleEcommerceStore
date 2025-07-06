import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_API_KEY;
if (!stripeApiKey) {
	throw new Error("Stripe API key not found in environment variables.");
}

const stripe = new Stripe(stripeApiKey, {
	apiVersion: "2025-06-30.basil",
});

export default stripe;

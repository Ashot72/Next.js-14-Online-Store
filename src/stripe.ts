import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2020-08-27",
});

export const PUBLISHABLE_STRIPE_KEY =
  "pk_test_51KwPjRKVwzOYdWGqjhA8O5jQrUHXmSo8VVJaaOBsEROZKOKqsxNzind6nj1mUTcw68MRXOHxQblzEwc8hv3CxSPT00xDuqVkzU";

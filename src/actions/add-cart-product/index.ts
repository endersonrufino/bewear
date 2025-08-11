"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddProductToCartSchema, addProductToCartSchema } from "./schema";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  addProductToCartSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const productVariant = db.query.productVariantTable.findFirst({
    where: (productVariantTable, { eq }) =>
      eq(productVariantTable.id, data.productVariantId),
  });

  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.id, session.user.id),
  });

  let cartId = cart?.id;

  if (!cartId) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();

    cartId = newCart.id;
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (carItem, { eq }) =>
      eq(carItem.cartId, cartId) &&
      eq(carItem.productVariantId, data.productVariantId),
  });

  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity,
      })
      .where(eq(cartItemTable.id, cartItem.id));

    return;
  }

  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  });
};

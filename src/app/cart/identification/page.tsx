import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/commom/footer";
import Header from "@/components/commom/header";
import { db } from "@/db";
import { cartTable, shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect('/');
    }

    const cart = await db.query.cartTable.findFirst({
        where: (cart, { eq }) => eq(cart.userId, session.user.id),
        with: {
            shippingAddress: true,
            items: {
                with: {
                    producVariant: {
                        with: {
                            product: true,
                        },
                    },
                },
            },
        },
    });

    if (!cart || cart?.items.length === 0) {
        redirect('/');
    }

    const shippingAddresses = await db.query.shippingAddressTable.findMany({
        where: eq(shippingAddressTable.userId, session.user.id)
    })

    const cartTotalInCents = cart.items.reduce(
        (acc, item) => acc + item.producVariant.priceInCents * item.quantity, 0,
    )

    return (
        <div className="space-y-12">
            <Header />
            <div className="px-5 space-y-4">
                <Addresses shippingAddresses={shippingAddresses} defaultShippingAddressId={cart?.shippingAddress?.id || null} />
                <CartSummary
                    subTotalInCents={cartTotalInCents}
                    totalInCents={cartTotalInCents}
                    products={cart.items.map((item) => ({
                        id: item.producVariant.id,
                        name: item.producVariant.product.name,
                        variantName: item.producVariant.name,
                        quantity: item.quantity,
                        priceInCents: item.producVariant.priceInCents,
                        imageUrl: item.producVariant.imageUrl
                    }))}
                />
            </div>
            <Footer />
        </div>
    )
}

export default IdentificationPage;
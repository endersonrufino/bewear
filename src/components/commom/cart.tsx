
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";

import { getCart } from "@/actions/get-cart";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
    const { data: cart, isPending: cartIsLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart()
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <ShoppingBasketIcon />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sacola</SheetTitle>
                </SheetHeader>
                <div className="flex h-full flex-col px-5 pb-5">
                    {cartIsLoading && <div>Carregando...</div>}
                    {cart?.items.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            productName={item.producVariant.product.name}
                            productVariantName={item.producVariant.name}
                            imageUrl={item.producVariant.imageUrl}
                            productVariantPriceInCents={item.producVariant.priceInCents}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Cart;
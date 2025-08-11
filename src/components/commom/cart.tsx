import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";

import { getCart } from "@/actions/get-cart";
import { formatCentsToBrl } from "@/helpers/money";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
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
                    <div className="flex h-full max-h-full flex-col overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="flex h-full flex-col gap-8">
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
                        </ScrollArea>
                    </div>

                    {cart?.items && cart?.items.length > 0 && (
                        <div className="flex flex-col gap-4">
                            <Separator />

                            <div className="flex items-center justify-between text-xs font-medium">
                                <p>Subtotal</p>
                                <p>{formatCentsToBrl(cart?.totalPriceInCents ?? 0)}</p>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between text-xs font-medium">
                                <p>Entrega</p>
                                <p>GRÁTIS</p>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between text-xs font-medium">
                                <p>Total</p>
                                <p>{formatCentsToBrl(cart?.totalPriceInCents ?? 0)}</p>
                            </div>

                            <Button className="rounded-full mt-5" >Finalizar compra</Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Cart;
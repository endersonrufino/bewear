
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";

import { getCart } from "@/actions/get-cart";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

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
                <div>
                    {cartIsLoading && <div>Carregando...</div>}
                    {cart?.items.map((item) => (
                        <div key={item.id}>
                            <Image src={item.producVariant.imageUrl} alt={item.producVariant.product.name} width={100} height={100} />
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Cart;
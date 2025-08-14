import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBrl } from "@/helpers/money";

interface CartSummaryProps {
    subTotalInCents: number;
    totalInCents: number;
    products: Array<{
        id: string;
        name: string;
        variantName: string;
        quantity: number;
        priceInCents: number;
        imageUrl: string;
    }>
}

const CartSummary = ({ subTotalInCents, totalInCents, products }: CartSummaryProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Resumo
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between">
                    <p className="text-sm">Subtotal</p>
                    <span className="text-sm text-muted-foreground font-medium">
                        {formatCentsToBrl(subTotalInCents)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm">Frete</p>
                    <span className="text-sm text-muted-foreground font-medium">
                        GRÁTIS
                    </span>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm">Total</p>
                    <span className="text-sm text-muted-foreground font-medium">
                        {formatCentsToBrl(totalInCents)}
                    </span>
                </div>

                <div className="py-3">
                    <Separator />
                </div>


                {products.map(product => (
                    <div className="flex items-center justify-between" key={product.id}>
                        <div className="flex items-center gap-4">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={78}
                                height={78}
                                className="rounded-lg"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold">{product.name}</p>
                                <p className="text-muted-foreground text-xs font-medium">{product.variantName}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-2">
                            <p className="text-sm font-bold">
                                {formatCentsToBrl(product.priceInCents)}
                            </p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default CartSummary;
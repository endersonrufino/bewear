"use client"

import { productTable, productVariantTable } from "@/db/schema"

import ProductListItem from "./product-list-item";

interface ProductListProps {
    title: string;
    products: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[]
    })[];
}

export default function ProductsList({ title, products }: ProductListProps) {
    console.log("lista de produtos")

    console.log(products)
    return (
        <div className="space-y-6">
            <h3 className="font-semibold px-5">{title}</h3>
            <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
                {products.map(product => <ProductListItem key={product.id} product={product} />)}
            </div>
        </div>
    )
};
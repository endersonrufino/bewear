import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema"
import { formatCentsToBrl } from "@/helpers/money";

interface ProductListItemProps {
    product: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[]
    });
}

export default function ProductListItem({ product }: ProductListItemProps) {
    const firstVariant = product.variants[0];

    return (
        <Link href={`/product-variant/${firstVariant.slug}`} className="flex flex-col gap-4">
            <Image
                src={firstVariant.imageUrl}
                alt={firstVariant.name}
                sizes="100vw"
                width={0}
                height={0}
                className="h-auto w-full rounded-3xl"
            />

            <div className="flex max-w-[200px] flex-col gap-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="truncate text-xs text-muted-foreground font-medium">{product.description}</p>
                <p className="truncate text-sm font-semibold">{formatCentsToBrl(firstVariant.priceInCents)}</p>
            </div>
        </Link>
    )
}
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import VariantsSelector from "@/app/product-variant/[slug]/components/variants-selector";
import Footer from "@/components/commom/footer";
import Header from "@/components/commom/header";
import ProductsList from "@/components/commom/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBrl } from "@/helpers/money";

import ProductActions from "./components/product-actions";

interface ProductVariantPageProps {
    params: Promise<{ slug: string }>
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
    const { slug } = await params;

    const productVariant = await db.query.productVariantTable.findFirst({
        where: eq(productVariantTable.slug, slug),
        with: {
            product: {
                with: {
                    variants: true
                }
            }
        }
    })

    if (!productVariant) {
        return notFound();
    }

    const likelyProducts = await db.query.productTable.findMany({
        where: eq(productTable.categoryId, productVariant.product.categoryId),
        with: {
            variants: true
        }
    })

    return (
        <>
            <Header />

            <div className="flex flex-col space-y-6">
                <Image
                    src={productVariant.imageUrl}
                    alt={productVariant.name}
                    sizes="100vw"
                    width={0}
                    height={0}
                    className="h-auto w-full rounded-3xl object-cover"
                />
                <div className="px-5">
                    <VariantsSelector selectedVariantSlug={productVariant.slug} variants={productVariant.product.variants} />
                </div>
                <div className="px-5">
                    <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
                    <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
                    <h3 className="text-lg font-semibold">{formatCentsToBrl(productVariant.priceInCents)}</h3>
                </div>
                <ProductActions productVariantId={productVariant.id} />
                <div className="px-5">
                    <p className="text-sm">{productVariant.product.description}</p>
                </div>
                <ProductsList title="Você também pode gostar" products={likelyProducts} />
                <Footer />
            </div>

        </>
    )
}

export default ProductVariantPage;
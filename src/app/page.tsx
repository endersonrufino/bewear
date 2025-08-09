import { desc } from "drizzle-orm";
import Image from "next/image";

import BrandingList from "@/components/commom/branding-list";
import CategorySelector from "@/components/commom/category-selector";
import Footer from "@/components/commom/footer";
import Header from "@/components/commom/header";
import ProductsList from "@/components/commom/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { BrandingType } from "@/types/branding-type";


const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({})

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true
    }
  })

  const brandings: BrandingType[] = [
    {
      id: "nike",
      title: "NIKE",
      img: "/nike_logo.svg"
    },
    {
      id: "adidas",
      title: "ADIDAS",
      img: "/adidas_logo.png"
    }, {
      id: "polo",
      title: "POLO",
      img: "/polo_logo.png"
    }, {
      id: "newbalance",
      title: "NEW BALANCE",
      img: "/newbalance_logo.png"
    }, {
      id: "zara",
      title: "ZARA",
      img: "/zara_logo.png"
    },
  ]

  return (
    <div>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image src="/banner-01.png" alt="Leve uma vida com estilo" width={0} height={0} sizes="100vw" className="w-full h-auto" />
        </div>

        <div className="space-y-6">
          <BrandingList title="Marcas parceiras" brandings={brandings} />
        </div>

        <ProductsList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image src="/banner-02.png" alt="Autentico" width={0} height={0} sizes="100vw" className="w-full h-auto" />
        </div>

        <ProductsList title="Novos produtos" products={newlyCreatedProducts} />

        <Footer />
      </div>
    </div>
  );
}

export default Home;
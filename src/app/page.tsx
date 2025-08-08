import Image from "next/image";

import CategorySelector from "@/components/commom/category-selector";
import Header from "@/components/commom/header";
import ProductsList from "@/components/commom/product-list";
import { db } from "@/db";


const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({})

  return (
    <div>
      <Header />

      <div className="space-y-6">
        <div className="px-5">
          <Image src="/banner-01.png" alt="Leve uma vida com estilo" width={0} height={0} sizes="100vw" className="w-full h-auto" />
        </div>

        <ProductsList title="Mais vendidos" products={products} />
        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image src="/banner-02.png" alt="Autentico" width={0} height={0} sizes="100vw" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Home;
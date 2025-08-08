import Image from "next/image";

import Header from "@/components/commom/header";
import ProductsList from "@/components/commom/product-list";
import { db } from "@/db";


const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  return (
    <div>
      <Header />

      <div className="px-5 space-y-6">
        <Image src="/banner-01.png" alt="Leve uma vida com estilo" width={0} height={0} sizes="100vw" className="w-full h-auto" />

        <ProductsList title="Mais vendidos" products={products} />

        <Image src="/banner-02.png" alt="Autentico" width={0} height={0} sizes="100vw" className="w-full h-auto" />
      </div>
    </div>
  );
}

export default Home;
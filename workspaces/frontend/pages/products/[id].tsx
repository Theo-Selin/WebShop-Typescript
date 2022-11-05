import React, { ReactElement } from "react";
import BaseLayout from "../../components/BaseLayout";
import Head from "next/head";
import ProductDetailsPage from "../../components/ProductDetailsPage";
import { useRouter } from "next/router";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Product - Details</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      {id ? <ProductDetailsPage id={id as string} /> : null}
    </div>
  );
};

ProductDetails.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
);

export default ProductDetails;

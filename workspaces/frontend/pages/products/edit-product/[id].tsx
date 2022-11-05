import React, { ReactElement, useRef } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import EditProductPage from "../../../components/EditProductPage";
import BaseLayout from "../../../components/BaseLayout";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Admin - Edit Product</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      {id ? <EditProductPage id={id as string} /> : null}
    </div>
  );
};

EditProduct.getLayout = (page: ReactElement) => <BaseLayout>{page}</BaseLayout>;

export default EditProduct;

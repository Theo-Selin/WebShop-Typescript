import React from "react";
import Header from "../../../components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import EditProductPage from "../../../components/EditProductPage";

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Admin - Edit Product</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      <Header />
      {id ? <EditProductPage id={id as string} /> : null}
    </div>
  );
};

export default EditProduct;

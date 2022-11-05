import React, { ReactElement } from "react";
import BaseLayout from "../../components/BaseLayout";
import Head from "next/head";
import ProductDetailsPage from "../../components/ProductDetailsPage";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { fetchProduct, fetchProducts } from "../../utils/api";

type Props = {
  product: Product;
};

const ProductDetails = ({ product }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Product - Details</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      {id ? <ProductDetailsPage product={product} /> : null}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchProducts();

  return {
    paths: products
      .filter((product) => product._id)
      .map((product) => ({
        params: { id: product._id },
      })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const product = await fetchProduct(context?.params?.id as string);

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};

ProductDetails.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
);

export default ProductDetails;

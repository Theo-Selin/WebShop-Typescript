import React, { ReactElement, useRef } from "react";
import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Head from "next/head";
import { useRouter } from "next/router";
import EditCategoryPage from "../../../components/EditCategoryPage";
import BaseLayout from "../../../components/BaseLayout";

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Admin - Edit Category</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      {id ? <EditCategoryPage id={id as string} /> : null}
    </div>
  );
};

EditCategory.getLayout = (page: ReactElement) => (
  <BaseLayout>{page}</BaseLayout>
);

export default EditCategory;

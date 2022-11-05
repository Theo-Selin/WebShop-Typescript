import { GetStaticPaths, GetStaticProps } from "next";
import { ReactElement } from "react";
import BaseLayout from "../../components/BaseLayout";
import CategoryLayout from "../../components/CategoryLayout";
import Product from "../../components/Product";
import { fetchCategories } from "../../utils/api";
import { fetchProducts } from "../../utils/api";

type CategoryProps = {
  products: Product[];
};

const CategoryPage = ({ products }: CategoryProps) => {
  return (
    <div className="tabPanel mx-auto max-w-fit pt-10 pb-24 sm:px-4">
      {products.map((product) => (
        <div key={product._id}>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
};

CategoryPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </BaseLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchCategories();

  return {
    paths: categories.map((category) => ({
      params: { category: category.slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await fetchProducts();

  return {
    props: {
      products: products.filter(
        (product) => product.category.slug === context?.params?.category
      ),
    },
    revalidate: 10,
  };
};

export default CategoryPage;

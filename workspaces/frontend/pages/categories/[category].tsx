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
    <div className="mx-auto flex max-w-fit pt-10 pb-24 sm:px-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="grid grid-cols-1 gap-8 overflow-auto sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
        >
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
      params: { category: category.name },
    })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const products = await fetchProducts();

  return {
    props: {
      products: products.filter(
        (product) => product.category.name === context?.params?.category
      ),
    },
  };
};

export default CategoryPage;

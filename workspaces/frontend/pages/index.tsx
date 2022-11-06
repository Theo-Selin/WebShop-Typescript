import React, { ReactElement, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import CategoryLayout from "../components/CategoryLayout";
import Product from "../components/Product";
import SearchBar from "../components/SearchBar";
import useProducts from "../utils/hooks/useProducts";

const Home = () => {
  const [search, setSearch] = useState("");
  const { products } = useProducts(search);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <SearchBar search={search} onSearch={onSearch} />

      <div className="tabPanel mx-auto max-w-fit pt-10 pb-24 sm:px-4">
        {products
          ? products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))
          : null}
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      <CategoryLayout>{page}</CategoryLayout>
    </BaseLayout>
  );
};

export default Home;

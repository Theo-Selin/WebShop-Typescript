import Head from "next/head";
import React, { useState } from "react";
import Button from "../../components/Button";
import Header from "../../components/Header";

const NewCategory = () => {
  const [category, setCategory] = useState("");

  return (
    <div>
      <div>
        <Head>
          <title>Admin - New Category</title>
          <link rel="icon" href="/WebShopLogo.png"></link>
        </Head>
        <Header />
        <main className="my-24">
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5">
              <form id="productForm" className="py-6 px-9" method="POST">
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium text-[#07074D]">
                    Category name
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="name of new category"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-violet-400 focus:shadow-md"
                    />
                  </label>
                </div>
                <div>
                  <Button title="Create" width="w-full" />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewCategory;

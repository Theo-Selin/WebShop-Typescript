import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import Currency from "react-currency-format";
import { ChevronDownIcon } from "@heroicons/react/outline";
import useUser from "../utils/hooks/useUser";
import BaseLayout from "../components/BaseLayout";
import CategoryLayout from "../components/CategoryLayout";

const Checkout = () => {
  const router = useRouter();
  const { user } = useUser();
  const products = user?.activeCart.products;
  console.log(user);

  if (!user) {
    router.push("/login");
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>Cart - WebShop</title>
        <link rel="icon" href="/WebShopLogo.png"></link>
      </Head>
      <Header />
      <main className="mx-auto max-w-5xl pb-24">
        <div className="flex flex-col items-center px-5">
          <h1 className="mt-20 text-3xl font-semibold lg:text-4xl">
            {products && products.length > 0
              ? "Review your cart"
              : "Your cart is empty"}
          </h1>
          <p className="my-4">Free delivery and returns</p>

          {/* If cart.length is longer than 0 */}
          <Button title="Continue shopping" onClick={() => router.push("/")} />
        </div>
        {products && products.length > 0 && (
          <div className="mx-5 md:mx-8">
            {products.map((product) => {
              return (
                <CheckoutProduct
                  key={product.productId}
                  items={products}
                  id={product.productId}
                />
              );
            })}

            <div className="my-12 mt-6 ml-auto max-w-3xl">
              <div className="divide-y divide-gray-300">
                <div className="pb-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>
                      <Currency quantity="cartTotal function" currency="USD" />
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-x-1 lg:flex-row">
                      Estimated tax for:{" "}
                      <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Enter Address
                        <ChevronDownIcon className="h-6 w-6" />
                      </p>
                    </div>
                    <p>$ -</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4 text-xl font-semibold">
                  <h4>Total</h4>
                  <h4>
                    <Currency quantity="cartTotal function" currency="USD" />
                  </h4>
                </div>
              </div>
              <div className="my-14 space-y-4">
                <h4 className="text-xl font-semibold">
                  Check out your purchase
                </h4>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Pay Directly</span>
                      <span>with Swish</span>
                    </h4>
                    <Button title="Checkout" />
                    <p className="mt-2 max-w-[300px] text-[12px]">
                      We do not save any kind of information given to us,
                      whether it be your address or contact information, unless
                      it's valuable information that could generate us more
                      money in the end
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 text-center md:order-2">
                    <h4 className="mb-4 flex flex-col text-xl font-semibold">
                      <span>Pay Monthly</span>
                      <span>with Klarna</span>
                    </h4>
                    <Button
                      noIcon
                      // loading={loading}
                      title="Check out with Klarna"
                      // onClick={startCheckoutProcess}
                    />
                    <p className="mt-2 max-w-[300px] text-[12px]">
                      We do not save any kind of information given to us,
                      whether it be your address or contact information, unless
                      it's valuable information that could generate us more
                      money in the end
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

Checkout.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Checkout;

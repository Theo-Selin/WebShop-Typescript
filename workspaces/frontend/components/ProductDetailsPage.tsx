import React from "react";
import useProduct from "../utils/hooks/useProduct";
import Image from "next/image";
import Button from "./Button";

interface Props {
  id: string;
}

const ProductDetailsPage = ({ id }: Props) => {
  const { product, isFetched } = useProduct(id);
  console.log(product);
  if (!isFetched || !product) {
    return null;
  }

  return (
    <div>
      <section className="body-font overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <Image
              width="500px"
              height="500px"
              alt="visual product presentation"
              className="w-full rounded border border-gray-200 object-cover object-center lg:w-1/2"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images[0].path}`}
            />
            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="title-font text-sm tracking-widest text-gray-500">
                PRODUCT NAME
              </h2>
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                {product?.name}
              </h1>
              <p className="leading-relaxed">{product?.description}</p>
              <div className="flex">
                <span className="title-font text-2xl font-medium text-gray-900">
                  ${product?.price}
                </span>
                <div className="ml-auto">
                  <Button title="Add to cart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;

import React from "react";
import Button from "./Button";
import ImageGallery from "./ImageGallery";

interface Props {
  product: Product;
}

const ProductDetailsPage = ({ product }: Props) => {
  return (
    <section className="body-font overflow-hidden bg-white text-gray-700 ">
      <div className="container mx-auto py-24 px-5">
        <div className="mx-auto my-20 flex flex-col bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5 md:w-1/2">
          {product.images.length > 0 ? (
            <div>
              <ImageGallery product={product} />
            </div>
          ) : null}
          <div className="mt-6 flex w-full flex-col justify-center gap-4 md:items-center">
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
            </div>
            <Button title="Add to cart" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;

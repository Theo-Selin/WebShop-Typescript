import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import useCart from "../utils/hooks/useCart";
import Button from "./Button";
import ImageGalleryComponent from "./ImageGallery";

interface Props {
  product: Product;
}

const ProductDetailsPage = ({ product }: Props) => {
  const { addProduct } = useCart();

  const addItemToCart = (productId?: string) => {
    if (!productId) return;

    addProduct.mutate(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          toast.success(`${product.name} added to cart`, {
            position: "top-center",
            className: "text-sm",
          });
        },
      }
    );
  };

  return (
    <section className="body-font overflow-hidden bg-white text-gray-700 ">
      <div className="container mx-auto w-full py-24 px-5">
        <div className="mx-auto my-20 flex flex-col bg-white p-10 shadow-lg ring-1 ring-black ring-opacity-5 md:w-1/2">
          {product.images.length > 0 ? (
            <ImageGalleryComponent product={product} />
          ) : null}
          <div className="mt-6 flex w-full flex-col justify-center gap-4 md:items-center">
            <h2 className="title-font text-sm tracking-widest text-gray-500">
              PRODUCT NAME
            </h2>
            <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
              {product.name}
            </h1>
            <h2 className="title-font text-sm tracking-widest text-gray-500">
              Category
            </h2>
            <p className="title-font mb-1 text-sm font-medium text-gray-900">
              <Link href={`/categories/${product.category._id}`}>
                {product.category.name}
              </Link>
            </p>
            <p className="leading-relaxed">{product?.description}</p>
            <div className="flex">
              <span className="title-font text-2xl font-medium text-gray-900">
                ${product?.price}
              </span>
            </div>
            <div className="text-m flex w-full justify-between pb-4">
              <div>
                <p className="title-font text-sm tracking-widest text-gray-500">
                  WEIGHT:
                </p>
                <p>{product.weight} kg</p>
              </div>
              <div>
                <p className="title-font text-sm tracking-widest text-gray-500">
                  MANUFACTURER:
                </p>
                <p>{product.manufacturer}</p>
              </div>
            </div>
            <Button
              title="Add to cart"
              onClick={() => addItemToCart(product._id)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;

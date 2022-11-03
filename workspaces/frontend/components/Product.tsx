import { ShoppingCartIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import useCart from "../utils/hooks/useCart";

interface Props {
  product: Product;
}

const Product = ({ product }: Props) => {
  const { cart, addProduct } = useCart();

  // TODO //
  const addItemToCart = (productId: string) => {
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
    <div className="h-68 flex w-60 select-none flex-col items-center space-y-3 rounded-xl bg-[#ffffff] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-52 md:h-72">
        <Image src={product.images[0]} layout="fill" objectFit="contain" />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl md:text-2xl">
          <Link href={`/products/${product._id}`}>{product.name}</Link>
          <p className="text-pink-600">{product.price}:-</p>
        </div>

        <div
          className="addToCartBtn"
          onClick={() => product._id && addItemToCart(product._id)}
        >
          <ShoppingCartIcon className="h-6 w-6 text-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Product;

import { ShoppingCartIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  product: Product;
}

const Product = ({ product }: Props) => {
  return (
    <div className="flex h-fit w-fit select-none flex-col space-y-3 rounded-xl bg-[#ffffff] p-8 md:h-[500px] md:w-[400px] md:p-10">
      <div className="relative h-64 w-full md:h-72">
        <Image src={product.images[0]} layout="fill" objectFit="contain" />
      </div>

      <div className="flex flex-1 items-center justify-between space-x-3">
        <div className="space-y-2 text-xl md:text-2xl">
          <Link href={`/products/${product._id}`}>{product.name}</Link>
          <p className="text-pink-600">{product.price}:-</p>
        </div>

        <div className="addToCartBtn">
          <ShoppingCartIcon className="h-6 w-6 text-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Product;

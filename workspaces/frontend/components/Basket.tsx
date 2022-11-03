import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import useCart from "../utils/hooks/useCart";

const Basket = () => {
  const { cart } = useCart();

  if (!cart) {
    return <div>Loading...</div>;
  }

  if (!cart.products.length) {
    return null;
  } else {
    return (
      <Link href="/checkout">
        <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-[10px] text-white">
            {cart.products.length}
          </span>
          <ShoppingBagIcon className="headerIcon h-8 w-8" />
        </div>
      </Link>
    );
  }
};

export default Basket;

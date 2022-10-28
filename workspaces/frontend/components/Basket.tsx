import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useContext } from "react";
import { GlobalContext } from "../utils/providers/GlobalContext";

const Basket = () => {
  const user = useContext(GlobalContext);

  if (user.userInfo?.activeCart.products.length === 0) {
    return null;
  } else {
    return (
      <Link href="/checkout">
        <div className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-gray-300">
          <span className="absolute -right-2 -top-2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-[10px] text-white">
            {user.userInfo?.activeCart.products.length}
          </span>
          <ShoppingBagIcon className="headerIcon h-8 w-8" />
        </div>
      </Link>
    );
  }
};

export default Basket;

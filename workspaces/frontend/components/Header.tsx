import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import useUser from "../utils/hooks/useUser";
import AdminDropdown from "./AdminDropdown";
import useCart from "../utils/hooks/useCart";

const Header = () => {
  const { user } = useUser();
  const { cart } = useCart();

  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-white p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src="/WebShopLogo.png"
              layout="fill"
              objectFit="contain"
              alt="logo consisting of three merged letters"
            />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className="flex items-center space-x-4">
        <SearchIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {cart?.products && cart.products.length > 0 && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-900 to-pink-400 text-[10px] text-white">
                {cart.products && cart.products.length}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {/* Change icon depending if the user is logged in or not */}
        {user ? (
          <Link href="/login">
            <UserIcon
              className="headerIcon text-green-400"
              // onClick={() => signIn()}
            />
          </Link>
        ) : (
          <Link href="/login">
            <UserIcon
              className="headerIcon"
              // onClick={() => signIn()}
            />
          </Link>
        )}

        {/* If user.role === admin show else hide */}
        {user && user.role === "admin" && <AdminDropdown />}
      </div>
    </header>
  );
};

export default Header;

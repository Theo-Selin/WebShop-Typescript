import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/outline";
import useUser from "../utils/hooks/useUser";
import AdminDropdown from "./AdminDropdown";
import useCart from "../utils/hooks/useCart";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const { user } = useUser();
  const { cart } = useCart();

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between bg-white p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/" scroll={false}>
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
      <div className="relative hidden h-5 w-5 flex-1 items-center justify-center space-x-8 md:flex">
        <Image
          src="/trustpilot.png"
          layout="fill"
          objectFit="contain"
          alt="logo consisting of three merged letters"
        />
      </div>
      <div className="flex items-center space-x-4 md:w-1/5">
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
          <UserDropdown />
        ) : (
          <Link href="/users/login">
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

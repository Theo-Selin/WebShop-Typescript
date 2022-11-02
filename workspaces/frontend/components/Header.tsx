import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { GlobalContext } from "../utils/providers/GlobalContext";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/outline";

const Header = () => {
  const token = false;
  const user = useContext(GlobalContext);

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between p-4">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image src="/WebShopLogo.png" layout="fill" objectFit="contain" />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Product</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className="flex items-center justify-center space-x-4 md:w-1/5">
        <SearchIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {user.userInfo?.activeCart.products &&
              user.userInfo?.activeCart.products.length > 0 && (
                <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-900 to-pink-400 text-[10px] text-white">
                  {user.userInfo?.activeCart.products.length}
                </span>
              )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>

        {/* Change icon depending if the user is logged in or not */}
        {token ? (
          <Image
            src="https://drivma.se/wp-content/uploads/2020/11/blank-profile-picture-973460_640.png"
            alt="profile"
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            // onClick={() => signOut()}
          />
        ) : (
          <UserIcon
            className="headerIcon"
            // onClick={() => signIn()}
          />
        )}

        {/* If user.role === admin show else hide */}
        <Link href="/admin">
          <div className="relative cursor-pointer">
            {user.userInfo?.activeCart.products &&
              user.userInfo?.activeCart.products.length > 0 && (
                <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-900 to-pink-400 text-[10px] text-white">
                  {user.userInfo?.activeCart.products.length}
                </span>
              )}
            <PlusIcon className="headerIcon" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;

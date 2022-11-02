import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import useUser from "../utils/hooks/useUser";

const Header = () => {
  const { user } = useUser();

  const token = false;

  return (
    <header className="fixed top-0 z-30 flex w-full items-center justify-between p-4">
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
      <div className="flex items-center justify-center space-x-4 md:w-1/5">
        <SearchIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-900 to-pink-400 text-[10px] text-white">
              {user && user.activeCart.products.length}
            </span>
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
          <Link href="/login">
            <UserIcon
              className="headerIcon"
              // onClick={() => signIn()}
            />
          </Link>
        )}

        {/* If user.role === admin show else hide */}
        <Link href="/admin">
          <div className="relative cursor-pointer">
            {user && user.activeCart.products.length && (
              <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-violet-900 to-pink-400 text-[10px] text-white">
                {user.activeCart.products.length}
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

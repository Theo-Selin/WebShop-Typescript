import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon, UserIcon, ViewListIcon } from "@heroicons/react/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useUser from "../utils/hooks/useUser";

const UserDropdown = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const id = user?._id;
  return (
    <div className="relative text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <UserIcon className="headerIcon text-green-400" />
          </Menu.Button>
        </div>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active
                        ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <UserIcon className="mx-4 h-4 w-4" />
                    <Link href={`/users/profile`}>Profile</Link>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active
                        ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <ViewListIcon className="mx-4 h-4 w-4" />
                    <Link href="/orders">Order history</Link>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => {
                      localStorage.removeItem("webshop-jwt");
                      queryClient.setQueryData(["user"], null);
                      router.push("/");
                    }}
                    className={`${
                      active
                        ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white"
                        : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <LogoutIcon className="mx-4 h-4 w-4" />
                    <span className="cursor-pointer">Logout</span>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserDropdown;

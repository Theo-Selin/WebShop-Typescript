import React from "react";
import { SearchIcon } from "@heroicons/react/outline";

type Props = {
  search: string;
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
};

const SearchBar = ({ search, onSearch }: Props) => {
  return (
    <div>
      <div className="mx-auto max-w-md overflow-hidden rounded-lg md:max-w-xl">
        <div className="md:flex">
          <div className="w-full p-14">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="h-14 w-full rounded-lg px-12 focus:outline-none"
                value={search}
                onChange={onSearch}
              />
              <span className="absolute top-4 right-5 border-l pl-4 hover:cursor-pointer">
                <i className="text-gray-900 opacity-80 hover:cursor-pointer hover:opacity-100">
                  <SearchIcon className="headerIcon" />
                </i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/api";
import Landing from "./Landing";
import SearchBar from "./SearchBar";

type CategoryLayoutProps = {
  children: React.ReactNode;
};

const CategoryLayout = ({ children }: CategoryLayoutProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => setCategories(await fetchCategories());

    loadCategories();
  }, []);

  return (
    <>
      <div className="static h-[196vh]">
        <Landing />
      </div>

      <section className="relative z-40 -mt-[100vh] min-h-screen bg-black/80 backdrop-blur-md">
        <div className="space-y-10">
          <div>
            <div className="scrollbar-hide sticky top-0 z-50 flex overflow-scroll bg-[#232428] sm:justify-center">
              {categories.map((category) => {
                return (
                  <div
                    key={category._id}
                    className={` whitespace-nowrap py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      router.asPath === `/categories/${category.slug}`
                        ? "borderGradient bg-[#35383C] text-white"
                        : "border-b-2 border-[#35383C] text-white"
                    }`}
                  >
                    <Link scroll={false} href={`/categories/${category.slug}`}>
                      {category.name}
                    </Link>
                  </div>
                );
              })}
            </div>
            <SearchBar />
            <div>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryLayout;

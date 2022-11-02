import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchCategories } from "../utils/fetchCategories";
import { getCategoryFromPath } from "../utils/helpers";
import Landing from "./Landing";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => setCategories(await fetchCategories());

    loadCategories();
  }, []);

  return (
    <>
      <div className="static h-[200vh]">
        <Landing />
      </div>

      <section className="relative z-40 -mt-[100vh] min-h-screen bg-black/80 backdrop-blur-md">
        <div className="space-y-10">
          {/* Headless UI category tab menu */}
          <div>
            <div className="scrollbar-hide sticky top-0 z-50 flex overflow-scroll bg-[#232428] sm:justify-center">
              {categories.map((category) => {
                const urlCategory = getCategoryFromPath(router.asPath);
                return (
                  <div
                    key={category._id}
                    className={` whitespace-nowrap py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      router.asPath === `/categories/${category.name}`
                        ? "borderGradient bg-[#35383C] text-white"
                        : "border-b-2 border-[#35383C] text-white"
                    }`}
                  >
                    <Link scroll={false} href={`/categories/${category.name}`}>
                      {category.name}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
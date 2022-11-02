import React from "react";
import Image from "next/image";
import Button from "./Button";

const Landing = () => {
  return (
    <section className="fixed left-0 right-0 top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-evenly px-5">
      <div className="space-y-8">
        <h1 className="space-y-3 text-2xl font-semibold tracking-wide lg:text-6xl xl:text-7xl">
          <span className="block bg-gradient-to-r from-violet-900 to-pink-500 bg-clip-text text-transparent">
            Empowered
          </span>
          <span className="block">Sophisticated</span>
          <span className="block">Driven by Fashion</span>
        </h1>

        <div className="flex items-center space-x-4">
          <Button title="Store" />
          <a className="link">Learn More</a>
        </div>
      </div>

      <div className="relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[950px] lg:w-[550px]">
        <Image src="/landing.png" layout="fill" objectFit="contain" priority />
      </div>
    </section>
  );
};

export default Landing;

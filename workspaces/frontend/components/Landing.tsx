import React from "react";
import Image from "next/image";
import Button from "./Button";

interface Props {
  bottomRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Landing = ({ bottomRef }: Props) => {
  const openStore = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="fixed left-0 right-0 top-0 mx-auto flex h-screen max-w-[1350px] items-center justify-evenly">
      <div className="space-y-8">
        <h1 className="space-y-3 text-4xl font-semibold tracking-wide lg:text-4xl xl:text-6xl">
          <span className="block bg-gradient-to-r from-violet-900 to-pink-500 bg-clip-text text-transparent">
            Accessible
          </span>
          <span className="block">Premium</span>
          <span className="block">Products</span>
        </h1>

        <div className="flex items-center space-x-4">
          <Button title="Store" onClick={openStore} />
          <a className="link">Learn More</a>
        </div>
      </div>

      <div className="relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[1080px] lg:w-[1080px]">
        <Image src="/landing.png" layout="fill" objectFit="contain" priority />
      </div>
    </section>
  );
};

export default Landing;

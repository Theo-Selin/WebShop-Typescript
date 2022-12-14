import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Basket from "./Basket";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Header />
      <Basket />
      <Toaster />

      <main>{children}</main>
    </div>
  );
};

export default BaseLayout;

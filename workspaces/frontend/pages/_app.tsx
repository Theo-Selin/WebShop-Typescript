import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GlobalProvider } from "../utils/providers/GlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "../components/CategoryLayout";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>{getLayout(<Component {...pageProps} />)}</GlobalProvider>
    </QueryClientProvider>
  );
}

export default MyApp;

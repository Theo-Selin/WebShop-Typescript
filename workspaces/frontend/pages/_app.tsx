import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GlobalProvider } from "../utils/providers/GlobalContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}

export default MyApp;

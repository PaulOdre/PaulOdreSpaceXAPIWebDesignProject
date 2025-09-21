import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div>
    <Component {...pageProps} />
    <Navigation />
  </div>
  );
}

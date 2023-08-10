import "../../styles/globals.scss";
import type { AppProps } from "next/app";
import PopulatedNavBar from "../components/PopulatedNavBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <PopulatedNavBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

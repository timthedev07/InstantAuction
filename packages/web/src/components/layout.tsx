import { FC, useEffect, useState } from "react";
import Head from "next/head";
// import { Navbar } from "./nav/Navbar";
// import { BottomNav } from "./nav/BottomNav";

const BREAK_POINT = 600;

const metadata = {
  title: "Instant Auction",
  image: "",
  description: "A modern auction platform for trading goods.",
};

export const Layout: FC = ({ children }) => {
  const [windowSize, setWindowSize] = useState<number>(0);

  useEffect(() => {
    setWindowSize(window.innerWidth);
    const resizeHandler = () => {
      setWindowSize(window.innerWidth);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.title} />
        <meta name="keywords" content="auction, platform, trade" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="0 days" />
        <meta name="author" content="Tim <timpersonal07@gmail.com>" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:site_name" content={metadata.title} />
        <meta property="og:url" content="https://instantauction.vercel.app" />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:description" content={metadata.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@timthedev07" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Head>

      <div id="App" className={`bg-gray-100 dark:bg-primary-bg min-w-350`}>
        {/* {windowSize > BREAK_POINT ? <Navbar /> : null} */}
        <main
          className={`${
            windowSize > BREAK_POINT ? "py-12" : ""
          } w-full  min-h-screen text-gray-900 dark:text-white`}
        >
          {children}
          <div
            className={`${
              windowSize <= BREAK_POINT ? "block" : "hidden"
            } bg-transparent h-5`}
          />
        </main>
        {/* {windowSize <= BREAK_POINT ? <BottomNav /> : null} */}
      </div>
    </>
  );
};

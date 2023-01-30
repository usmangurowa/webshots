import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { Suspense } from "react";
import { Loader, Footer } from "../components";
import { MainLayout } from "../layout";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Home: NextPage = () => {
  const [url, setUrl] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [webUrl, setWebUrl] = React.useState<string>("");
  const [screenShot, setScreenShot] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setWebUrl(window.location.href);
    }
  }, []);

  const saveImage = () => {
    const a = document.createElement("a");
    a.href = screenShot;
    a.download = "image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleGetScreenshot = () => {
    setLoading(true);

    // fetch("/api/screenshot?url=" + url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setScreenShot(data?.image);
    //   })
    //   .finally(() => setLoading(false));
    sleep(5000).then(() => {
      setScreenShot(webUrl + "/images/_77UDxh4Y_P7PwpCQZoql.png");
      setLoading(false);
    });
  };

  return (
    <>
      <Head>
        <title>WebShots</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout className="flex w-full flex-1 flex-col items-center justify-center py-10 md:px-20 text-center">
        <p className="text-3xl md:text-5xl">
          Take screenshot of website easily with{" "}
          <span className="text-primary font-semibold">WebShot</span>
        </p>

        <p className="my-5 text-xl">
          Get started by providing a link to the website you want to screenshot.
        </p>

        <div className="my-6 flex max-w-4xl  items-center justify-around sm:w-full">
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="w-full p-5 md:p-10 outline-none border border-primary rounded-l-2xl"
          />
          <button
            onClick={handleGetScreenshot}
            className="active:scale-105 transition-transform duration-200 ease-in w-fit p-5 md:p-10 outline-none border border-primary text-white bg-primary rounded-r-2xl"
          >
            <span>Capture!</span>
          </button>
        </div>
        {screenShot && (
          <>
            <div className="h-80 w-full relative my-5 md:max-w-2xl">
              <Image
                className="object-contain"
                src={screenShot}
                alt={""}
                layout="fill"
              />
            </div>
            <button
              className="my-2 active:scale-105 transition-transform duration-200 ease-in w-fit px-10 py-2 outline-none border border-primary text-white bg-primary rounded-full"
              onClick={saveImage}
            >
              Save
            </button>
          </>
        )}
      </MainLayout>
      {loading ? <Loader /> : null}
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Loader, Footer } from "../components";
import { MainLayout } from "../layout";
import { checkUrl, debounce } from "../lib/helper";
import { saveAs } from "file-saver";

const Home: NextPage = () => {
  const [url, setUrl] = React.useState<string>("https://");
  const [loading, setLoading] = React.useState<boolean>(false);

  const [screenShot, setScreenShot] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const handleClear = () => {
    setScreenShot("");
    setUrl("https://");
  };

  const saveImage = React.useCallback(() => {
    if (screenShot) {
      saveAs(screenShot, screenShot.split("/").pop());
    }
  }, [screenShot]);

  const handleGetScreenshot = () => {
    if (checkUrl(url)) {
      setError("");
      setLoading(true);
      fetch("/api/screenshot?url=" + url)
        .then((res) => res.json())
        .then((data) => {
          setScreenShot(data?.image);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    } else {
      setError("Please provide a valid url");
    }
  };

  React.useEffect(() => {
    if (!!error) {
      debounce(() => {
        if (checkUrl(url)) {
          setError("");
        }
      }, 1000)();
    }
  }, [url, error]);

  return (
    <>
      <Head>
        <title>WebShots</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout className="flex w-full flex-col items-center justify-center py-10 md:px-20 text-center">
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
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleGetScreenshot();
              }
            }}
            type="url"
            placeholder="https://"
            onChange={(event) => setUrl(event.target.value)}
            className={`w-full p-5 md:p-10 outline-none border  rounded-l-2xl ${
              !!error
                ? "text-secondary border-secondary"
                : "border-primary text-primary"
            }`}
          />
          <button
            onClick={handleGetScreenshot}
            className={`active:scale-105 transition-transform duration-200 ease-in w-fit p-5 md:p-10 outline-none border text-white rounded-r-2xl ${
              !!error
                ? "border-secondary bg-secondary"
                : "border-primary  bg-primary"
            }  `}
          >
            <span>Capture!</span>
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {screenShot && (
          <>
            <div className="h-80 w-full relative my-3 md:my-5 md:max-w-2xl">
              <Image
                className="object-contain"
                src={screenShot}
                alt={"screenshot"}
                // layout="fill"
                fill
              />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <button
                className="my-2 active:scale-105 transition-transform duration-200 ease-in w-fit px-10 py-2 outline-none border border-primary text-white bg-primary rounded-full"
                onClick={saveImage}
              >
                Save
              </button>
              <button
                className="my-2 active:scale-105 transition-transform duration-200 ease-in w-fit px-10 py-2 outline-none border border-primary text-white bg-primary rounded-full"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </>
        )}
      </MainLayout>
      {loading ? <Loader /> : null}
    </>
  );
};

export default Home;

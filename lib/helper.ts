import { saveAs } from "file-saver";

// regex to check if url is valid
const regex = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i" // fragment locator
);

export const checkUrl = (url: string) => {
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
  //   try {
  //     new URL(url);
  //     return true;
  //   } catch (err) {
  //     return false;
  //   }
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = (fn: any, ms = 0) => {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};

export const downloadImage = async (
  url: string,
  filename: string | undefined
) => {
  // convert image url to blob

  const blob = await fetch(url.replace("http:", "https:")).then((r) =>
    r.blob()
  );
  // create file object
  const file = new File([blob], filename || "screenshot", {
    type: "image/png",
  });
  // download file
  saveAs(file);
};

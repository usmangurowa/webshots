import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export default async function screenshot(
  url: string,
  _options?: {
    width?: number;
    height?: number;
    quality?: number;
    type?: "png" | "jpeg" | "webp" | undefined;
  }
) {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", //in development replace this with the path to your chrome.exe
      };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({
    width: _options?.width || 1366,
    height: _options?.height || 695,
  });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
  return await page.screenshot({
    type: _options?.type || "png",
    // quality: _options?.quality || 1,
  });
}

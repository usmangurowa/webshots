import { chromium } from "playwright";

export default async function screenshot(
  url: string,
  _options?: {
    width?: number;
    height?: number;
    quality?: number;
    type?: "png" | "jpeg" | undefined;
  }
) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({
    width: _options?.width || 1366,
    height: _options?.height || 695,
  });
  await page.goto(url);
  const buffer = await page.screenshot({ type: _options?.type || "png" });
  await browser.close();
  return buffer;
}

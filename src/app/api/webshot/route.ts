import { isValidURL } from "@/lib/utils";
import { NextResponse } from "next/server";
import {
    chromium,
    webkit,
    firefox,
    devices,
    LaunchOptions,
    Browser,
} from "playwright";
import { writeFile, writeFileSync } from "fs";

const engines: Record<string, Browser> = {};

export const POST = async (request: Request, response: Response) => {
    const {
        engine = "chromium",
        device = "Desktop Chrome",
        url,
        colorScheme,
    }: ScreenshotsRequestBody = await request.json();

    if (!isValidURL(url)) {
        return NextResponse.json(
            { message: "Invalid URL", data: null },
            { status: 400 }
        );
    }
    if (!engines[engine]) {
        engines[engine] = await launchBrowser(engine);
    }

    const context = await engines[engine].newContext({
        ...devices[device],
        // userAgent: userAgents[engine],
        colorScheme: colorScheme,
    });
    const page = await context.newPage();
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    const screenshot = await page.screenshot({
        type: "png",
    });

    // await browser.close();

    // const base64 = screenshot.toString("base64");
    const id = new Date().getTime();
    writeFile(`public/${id}.png`, screenshot, (error) => {
        if (error) {
            return NextResponse.json(
                { message: "Error", data: null },
                { status: 500 }
            );
        }
    });
    return NextResponse.json({ data: id, message: "Done" }, { status: 200 });
};

const launchBrowser = async (browser: BrowsersType) => {
    const config: LaunchOptions = {
        headless: true,
    };
    switch (browser) {
        case "chromium":
            return await chromium.launch(config);
        case "webkit":
            return await webkit.launch(config);
        case "firefox":
            return await firefox.launch(config);
    }
};

export const GET = async () => {
    return NextResponse.json({ message: "Hello" }, { status: 200 });
};

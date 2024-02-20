"use client";

import { Button } from "@/components/ui/button";
import Combobox from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useCountDown from "@/hooks/use-count-down";
import { devices } from "@/lib/constants";
import Webshot from "@/lib/webshot";
import Image from "next/image";
import React from "react";

const Demo = () => {
    const [url, setUrl] = React.useState("https://");
    const { count, start, stop, reset } = useCountDown();
    const [screenshot, setScreenshot] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const [device, setDevice] = React.useState<DeviceTypes>("Desktop Chrome");
    const [colorScheme, setColorScheme] =
        React.useState<ColorSchemeType>("light");

    const takeShot = () => {
        if (count > 0 || screenshot) {
            reset();
            setScreenshot("");
        }
        start();
        setLoading(true);
        const webshot = new Webshot(url, {
            device,
            colorScheme,
            url,
        });
        webshot
            .takeScreenshot()
            .then((data) => {
                stop();
                setScreenshot(data.data);
            })
            .catch((error) => {
                stop();
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <main className="md:h-screen min-h-screen flex flex-col w-full container space-y-5">
            <h1 className="text-3xl font-bold text-center mt-10">
                Demo Page: (second: {count})
            </h1>
            <div className="flex items-center">
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    placeholder="Enter URL"
                    className="rounded-l-full rounded-r-none"
                />
                <Button
                    onClick={takeShot}
                    className="rounded-l-none rounded-r-full"
                >
                    Take shot
                </Button>
            </div>
            <div className="items-center grid grid-cols-2 md:grid-cols-4 gap-10">
                <div className="w-full">
                    <Label>Device</Label>
                    <Combobox
                        className="w-full"
                        placeholder="Select Device"
                        items={device_list}
                        value={device}
                        onChange={setDevice as any}
                    />
                </div>
                <div className="w-full">
                    <Label>Color Scheme</Label>
                    <Select
                        value={colorScheme}
                        onValueChange={setColorScheme as any}
                    >
                        <Select.Trigger>
                            <Select.Value placeholder="Choose theme" />
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="light">Light</Select.Item>
                            <Select.Item value="dark">Dark</Select.Item>
                        </Select.Content>
                    </Select>
                </div>
            </div>
            <div className="w-full relative flex-grow">
                {!loading && screenshot && (
                    <Image
                        src={`/${screenshot}.png`}
                        fill
                        className="w-full h-full object-contain"
                        alt="screenshot"
                    />
                )}

                {loading && (
                    <Skeleton className="absolute top-0 left-0 w-full h-full inset-0" />
                )}
            </div>
        </main>
    );
};

export default Demo;

const device_list = devices.map((device) => ({
    label: device,
    value: device,
}));

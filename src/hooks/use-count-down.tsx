"use client";

import React from "react";
import { useInterval } from "react-use";

const useCountDown = () => {
    const [count, setCount] = React.useState(0);

    const [state, setState] = React.useState<"run" | "stop">();

    useInterval(
        () => {
            setCount((prev) => prev + 1);
        },
        state === "run" ? 1000 : null
    );

    const start = () => {
        setState("run");
    };

    const reset = () => {
        setCount(0);
    };

    const stop = () => {
        setState("stop");
    };

    return { stop, start, reset, count };
};

export default useCountDown;

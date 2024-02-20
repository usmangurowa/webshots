import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                woodsmoke: {
                    "50": "hsl(180, 5%, 96%)",
                    "100": "hsl(180, 6%, 90%)",
                    "200": "hsl(189, 8%, 82%)",
                    "300": "hsl(190, 8%, 69%)",
                    "400": "hsl(193, 8%, 53%)",
                    "500": "hsl(193, 8%, 43%)",
                    "600": "hsl(197, 8%, 36%)",
                    "700": "hsl(192, 6%, 31%)",
                    "800": "hsl(195, 6%, 27%)",
                    "900": "hsl(197, 6%, 24%)",
                    "950": "hsl(200, 7%, 9%)",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

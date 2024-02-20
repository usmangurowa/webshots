import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen space-y-5">
            <h1>Coming soon!!!</h1>
            <Link href={"/demo"} className="underline underline-offset-8">
                Try a Demo ➡️
            </Link>
        </main>
    );
}

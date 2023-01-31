import Link from "next/link";
import React from "react";

const Nav = () => {
  return (
    <nav className="border-b">
      <div className="flex items-center justify-between container py-5 space-x-4">
        <span className="text-primary text-2xl font-semibold">WebShots</span>
        <Link href={"#"}>
          <span className="text-xl font-semibold">API</span>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

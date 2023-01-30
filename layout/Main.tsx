import React from "react";
import { Footer, Nav } from "../components";

const Main = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Nav />
      <main className={`flex-grow container ${className}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Main;

import React from "react";
import LoadingIndicator from "./LoadingIndicator";

const Loader = () => {
  return (
    <main className="fixed backdrop-blur-xl top-0 left-0 h-screen w-screen bg-white/70 flex items-center justify-center">
      <LoadingIndicator />
    </main>
  );
};

export default Loader;

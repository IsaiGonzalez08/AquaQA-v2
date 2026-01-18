"use client";

import { useEffect } from "react";
import { animatePageIn } from "../shared/utils/animation";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <>
      <div id="banner-1" className="bg-primary fixed top-0 left-0 z-20 min-h-screen w-1/4"></div>
      <div id="banner-2" className="bg-primary fixed top-0 left-1/4 z-20 min-h-screen w-1/4"></div>
      <div id="banner-3" className="bg-primary fixed top-0 left-2/4 z-20 min-h-screen w-1/4"></div>
      <div id="banner-4" className="bg-primary fixed top-0 right-0 z-20 min-h-screen w-1/4"></div>
      {children}
    </>
  );
}

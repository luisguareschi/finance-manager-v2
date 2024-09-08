import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "rgb(248 250 252)",
  userScalable: false,
};

const LoggedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full bg-slate-50 flex flex-col">
      <div className="flex flex-1 overflow-y-auto p-5 hide-scrollbar">
        {children}
      </div>
      <Navbar />
    </div>
  );
};

export default LoggedLayout;

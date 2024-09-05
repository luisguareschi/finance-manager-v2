import React from "react";
import { cn } from "@/lib/utils";

interface props extends React.HTMLAttributes<HTMLButtonElement> {}

export const FloatingButton = ({ className, ...props }: props) => {
  return (
    <button
      className={cn(
        "fixed bottom-28 right-5 bg-blue-500 z-10 justify-center " +
          "items-center flex flex-col size-[68px] rounded-lg shadow shadow-blue-400 " +
          "active:bg-blue-600 transition-colors",
        className,
      )}
      {...props}
    >
      <p className="text-white text-4xl">{props.children}</p>
    </button>
  );
};

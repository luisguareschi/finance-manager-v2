"use client";
import { cn } from "@/lib/utils";
import usePlatform from "@/lib/usePlatform";
import { routes } from "@/components/Navbar/routes";
import NavbarItem from "@/components/Navbar/NavbarItem";

const MenuBar = () => {
  const platform = usePlatform();

  return (
    <div
      className={cn(
        "bg-slate-100 w-full p-3 grid items-center justify-center justify-items-center border-t-2 border-slate-200 border-opacity-50 grid-cols-4",
        platform === "ios" && "pb-10",
      )}
    >
      {routes.map((item, index) => (
        <NavbarItem item={item} key={index} />
      ))}
    </div>
  );
};

export default MenuBar;

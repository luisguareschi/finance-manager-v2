import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { routes } from "@/components/Navbar/routes";

interface props {
  item: (typeof routes)[number];
}

const NavbarItem = ({ item }: props) => {
  const pathname = usePathname();
  const isSelected = pathname.includes(item.url);

  const isSelectedClassName = isSelected
    ? "text-blue-600 bg-blue-100"
    : "text-slate-500 active:bg-blue-200 active:text-blue-700";

  return (
    <Link href={item.url}>
      <div className="flex flex-col text-white gap-1 justify-between items-center font-semibold text-sm">
        <button
          className={cn(
            "flex flex-col w-fit px-7 py-1.5 rounded-full transition-all",
            isSelectedClassName,
          )}
        >
          {isSelected ? item.icon.selected : item.icon.unselected}
        </button>
        <p
          className={cn(
            isSelected && "text-blue-700",
            !isSelected && "text-slate-600 font-medium",
          )}
        >
          {item.title}
        </p>
      </div>
    </Link>
  );
};

export default NavbarItem;

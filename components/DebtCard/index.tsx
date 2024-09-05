import { stringToAcceptedColor } from "@/lib/stringToAcceptedColor";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Delete } from "react-iconly";

interface props {
  title: string;
  subtitle?: string;
  amount?: string;
  amountSubtitle?: string;
  onClick?: () => void;
  onSwipeRightToDelete?: () => void;
}

const DebtCard = ({
  title,
  subtitle,
  amount,
  amountSubtitle,
  onClick,
  onSwipeRightToDelete,
}: props) => {
  const mainDivRef = useRef<HTMLDivElement>(null);
  const draggable = !!onSwipeRightToDelete;
  const [snapToOrigin, setSnapToOrigin] = useState(true);
  const [coords, setCoords] = useState({});

  const firstTwoLetters = title.slice(0, 2).toUpperCase();
  const bgColor = stringToAcceptedColor(title, 0.35);

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -90) {
      setSnapToOrigin(false);
    } else {
      setSnapToOrigin(true);
    }
  };

  const handleOutsideClick = (event: TouchEvent) => {
    if (!mainDivRef.current) return;

    // generate random number from 0 to 1
    let x = Math.random();

    if (!mainDivRef.current.contains(event.target as Node)) {
      setCoords({ x: x, y: 0 });
    }
  };

  useEffect(() => {
    if (!draggable) return;
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <motion.div
      className="relative rounded-xl"
      ref={mainDivRef}
      animate={{ opacity: 1 }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      {draggable && (
        <button
          className="absolute bg-red-500 w-[120px]
          h-full top-0 right-0 z-0 rounded-xl border-2 border-white
          flex justify-end items-center pr-9 text-white active:bg-red-600 transition-colors"
          onClick={onSwipeRightToDelete}
        >
          <Delete filled />
        </button>
      )}
      <motion.div
        className={cn(
          "bg-white rounded-xl w-full p-3 flex gap-5 border border-slate-200 shadow-sm",
          onClick && "transition-all active:brightness-95",
          draggable && "relative overflow-clip z-10",
        )}
        onClick={onClick}
        drag={draggable ? "x" : false}
        dragConstraints={{ left: -90, right: 0 }}
        dragSnapToOrigin={snapToOrigin}
        dragElastic={0.05}
        onDrag={handleDrag}
        animate={coords}
      >
        <div
          className={cn(
            "rounded-xl bg-green-400 size-14 min-w-14 flex justify-center items-center font-medium text-slate-600",
          )}
          style={{
            backgroundColor: bgColor,
          }}
        >
          {firstTwoLetters}
        </div>
        <div className="flex flex-col justify-center gap-1 w-full">
          <p className="text-slate-800 font-medium">{title}</p>
          {!onClick && (
            <Popover>
              <PopoverTrigger className="flex justify-start items-start">
                <p className="text-slate-600 line-clamp-1">{subtitle}</p>
              </PopoverTrigger>
              <PopoverContent
                className="w-fit border p-2 break-words text-wrap h-full max-w-[40vw]"
                align="start"
              >
                <p className="text-slate-600 text-sm">{subtitle}</p>
              </PopoverContent>
            </Popover>
          )}
          {onClick && <p className="text-slate-600 line-clamp-1">{subtitle}</p>}
        </div>
        <div className="flex flex-col justify-center gap-1 items-end">
          <p className="text-slate-800 font-medium">{amount}</p>
          <p className="text-slate-600 line-clamp-1 w-max">{amountSubtitle}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DebtCard;

import { stringToAcceptedColor } from "@/lib/stringToAcceptedColor";
import { cn } from "@/lib/utils";

interface props {
  title: string;
  subtitle?: string;
  amount?: string;
  amountSubtitle?: string;
  onClick?: () => void;
}

const DebtCard = ({
  title,
  subtitle,
  amount,
  amountSubtitle,
  onClick,
}: props) => {
  const firstTwoLetters = title.slice(0, 2).toUpperCase();

  const bgColor = stringToAcceptedColor(title, 0.35);

  return (
    <div
      className={cn(
        "bg-white rounded-xl w-full p-3 flex gap-5",
        onClick && "transition-all active:brightness-95",
      )}
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
        <p className="text-slate-600">{subtitle}</p>
      </div>
      <div className="flex flex-col justify-center gap-1 items-end">
        <p className="text-slate-800 font-medium">{amount}</p>
        <p className="text-slate-600">{amountSubtitle}</p>
      </div>
    </div>
  );
};

export default DebtCard;

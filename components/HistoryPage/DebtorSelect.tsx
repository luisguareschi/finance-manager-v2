import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import useDebtors from "@/queries/debts/useDebtors";
import { cn } from "@/lib/utils";

interface props {
  debtorId: string | null;
  onChange: (debtorId: string | null) => void;
}

const DebtorSelect = ({ debtorId, onChange }: props) => {
  const { debtors, isLoading: loadingDebtors } = useDebtors();
  const [selectedDebtor, setSelectedDebtor] = useState(debtorId || "all");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!onChange) {
      return;
    }
    onChange(selectedDebtor === "all" ? null : selectedDebtor);
  }, [selectedDebtor]);

  return (
    <Select
      value={selectedDebtor}
      onValueChange={(value) => setSelectedDebtor(value)}
      open={open}
      onOpenChange={(value) => setOpen(value)}
    >
      <SelectTrigger
        className={cn(
          "w-[180px] border-0 bg-transparent flex justify-center items-center gap-2 text-lg " +
            "font-medium text-slate-600 pl-4 focus:outline-none focus:ring-0 focus:ring-transparent " +
            "focus:ring-offset-transparent focus:border-2 focus:bg-slate-50 transition-colors open:bg-white",
          open ? "bg-slate-50 border-2" : "",
        )}
      >
        <SelectValue placeholder="Debtor" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"all"}>Everyone</SelectItem>
          {debtors?.map((debtor) => (
            <SelectItem key={debtor.id} value={String(debtor.id)}>
              {debtor.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DebtorSelect;

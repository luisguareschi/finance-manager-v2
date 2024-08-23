import useDebtSummary from "@/queries/debts/useDebtSummary";
import DebtCard from "@/components/DebtCard";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/fomatCurrency";

const DebtSummary = () => {
  const { debtSummary, isLoading } = useDebtSummary();

  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg font-medium text-slate-800">People who owe you:</p>
      {isLoading && <p className="text-slate-600">Loading...</p>}
      {debtSummary?.debtors.map((debtor) => (
        <DebtCard
          title={debtor.name}
          amount={formatCurrency(debtor.total)}
          amountSubtitle="Debt"
          key={debtor.id}
          subtitle={`Latest: ${dayjs(debtor.last_updated).format("DD-MM-YYYY")}`}
          onClick={() => console.log("clicked")}
        />
      ))}
      {!debtSummary?.debtors.length && !isLoading && (
        <p className="text-slate-600">No one owes you money</p>
      )}
    </div>
  );
};

export default DebtSummary;

import useDebtSummary from "@/queries/debts/useDebtSummary";
import DebtCard from "@/components/DebtCard";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/fomatCurrency";
import Spinner from "@/components/common/spinner";
import { useRouter } from "next/navigation";

const DebtSummary = () => {
  const router = useRouter();
  const { debtSummary, isLoading } = useDebtSummary();

  return (
    <div className="flex flex-col gap-5 h-full">
      <p className="text-lg font-medium text-slate-800">People who owe you:</p>
      {isLoading && (
        <div className="h-full flex items-center justify-center">
          <Spinner size={36} trackColor="blue-500" />
        </div>
      )}
      {debtSummary?.debtors.map((debtor) => (
        <DebtCard
          title={debtor.name}
          amount={formatCurrency(debtor.total)}
          amountSubtitle="Debt"
          key={debtor.id}
          subtitle={`Latest: ${dayjs(debtor.last_updated).format("DD-MM-YYYY")}`}
          onClick={() => router.push(`history?debtorId=${debtor.id}`)}
        />
      ))}
      {!debtSummary?.debtors.length && !isLoading && (
        <p className="text-slate-600">No one owes you money</p>
      )}
    </div>
  );
};

export default DebtSummary;

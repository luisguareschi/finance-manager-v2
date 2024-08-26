"use client";
import { useSearchParams } from "next/navigation";
import { formatCurrency } from "@/lib/fomatCurrency";
import useDebts from "@/queries/debts/useDebts";
import DebtCard from "@/components/DebtCard";
import dayjs from "dayjs";
import Spinner from "@/components/common/spinner";

const HistoryPage = () => {
  const searchParams = useSearchParams();
  const debtorId = searchParams.get("debtorId");
  const { debts, isLoading: loadingDebts } = useDebts({ debtorId });

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <header className="w-full flex flex-col justify-center items-center pt-5">
        <h1 className="font-semibold text-lg text-slate-800">Transactions</h1>
      </header>
      <section>
        <p className="text-slate-600">Total Debt</p>
        <p className="font-semibold text-slate-800 text-2xl">
          {formatCurrency(300)}
        </p>
      </section>
      <p className="text-lg font-medium text-slate-800">Recent Activity</p>
      {debts?.map((debt) => (
        <DebtCard
          key={debt.id}
          title={debt.debtor.name}
          amount={formatCurrency(debt.amount)}
          subtitle={debt.description}
          amountSubtitle={dayjs(debt.created).format("DD-MM-YY")}
        />
      ))}
      {!debts && loadingDebts && (
        <div className="h-full flex justify-center items-center">
          <Spinner size={36} trackColor="blue-500" />
        </div>
      )}
    </div>
  );
};

export default HistoryPage;

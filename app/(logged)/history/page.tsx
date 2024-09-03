"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatCurrency } from "@/lib/fomatCurrency";
import useDebts from "@/queries/debts/useDebts";
import DebtCard from "@/components/DebtCard";
import dayjs from "dayjs";
import Spinner from "@/components/common/spinner";
import DebtorSelect from "@/components/HistoryPage/DebtorSelect";
import { useEffect, useState } from "react";
import useDeleteDebt from "@/queries/debts/useDeleteDebt";
import { AnimatePresence } from "framer-motion";
import AddDebtButton from "@/components/AddDebtButton";

const HistoryPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const debtorId = searchParams.get("debtorId");
  const { debts, isLoading: loadingDebts, totalDebt } = useDebts({ debtorId });
  const [selectedDebtorId, setSelectedDebtorId] = useState(debtorId);
  const { mutate: deleteDebt } = useDeleteDebt();

  useEffect(() => {
    // add debtorId to the URL
    if (selectedDebtorId) {
      router.push(`${pathname}?debtorId=${selectedDebtorId}`);
    } else {
      router.push(pathname);
    }
  }, [selectedDebtorId]);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <header className="w-full flex flex-col justify-center items-center pt-5 gap-2">
          <h1 className="font-semibold text-xl text-slate-800">Transactions</h1>
          <DebtorSelect
            debtorId={selectedDebtorId}
            onChange={(val) => setSelectedDebtorId(val)}
          />
        </header>
        <section className="space-y-1">
          <p className="text-slate-600 text-lg">Total Debt</p>
          {!loadingDebts && (
            <p className="font-semibold text-slate-800 text-2xl">
              {formatCurrency(totalDebt)}
            </p>
          )}
          {loadingDebts && (
            <div className="h-[32px] w-36 bg-slate-300 animate-pulse rounded" />
          )}
        </section>
        <p className="text-lg font-medium text-slate-800">Recent Activity</p>
        <AnimatePresence>
          {debts?.map((debt) => (
            <DebtCard
              key={debt.id}
              title={debt.debtor.name}
              amount={formatCurrency(debt.amount)}
              subtitle={debt.description}
              amountSubtitle={dayjs(debt.created).format("DD-MM-YY")}
              onSwipeRightToDelete={() => deleteDebt(debt.id)}
            />
          ))}
          {debts && <div className="w-full min-h-28" />}
        </AnimatePresence>
        {!debts && loadingDebts && (
          <div className="h-full flex justify-center items-center">
            <Spinner size={36} trackColor="blue-500" />
          </div>
        )}
        {!debts?.length && !loadingDebts && (
          <p className="text-slate-600">No transactions found</p>
        )}
      </div>
      <AddDebtButton />
    </>
  );
};

export default HistoryPage;

import { formatCurrency } from "@/lib/fomatCurrency";
import { Wallet } from "react-iconly";
import useDebtSummary from "@/queries/debts/useDebtSummary";
import useCurrentUser from "@/queries/auth/useCurrentUser";

const DebtSummaryCard = () => {
  const { user, isLoading: loadingUser } = useCurrentUser();
  const { debtSummary, isLoading: loadingDebt } = useDebtSummary();

  const isLoading = loadingUser || loadingDebt;

  return (
    <div className="p-5 py-6 rounded-2xl flex flex-col bg-gradient-to-br from-blue-400 to-blue-800 relative">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-blue-300 rounded w-1/4 mb-2"></div>
          <div className="h-11 bg-blue-300 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-blue-300 rounded w-1/3 mb-1"></div>
          <div className="h-6 bg-blue-300 rounded w-1/3"></div>
        </div>
      ) : (
        <>
          <p className="text-white text-lg opacity-80">You are owed</p>
          <p className="font-semibold text-4xl text-white mb-4 mt-1">
            {formatCurrency(debtSummary?.total || 0)}
          </p>
          <p className="text-white opacity-80">{user?.username}</p>
          <p className="text-white">{user?.email}</p>
          <div className="absolute bottom-5 right-5 text-white">
            <Wallet filled size="xlarge" />
          </div>
        </>
      )}
    </div>
  );
};

export default DebtSummaryCard;
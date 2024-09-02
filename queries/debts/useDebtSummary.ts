import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import axios from "@/lib/axiosInstance";
import { IDebtSummary } from "@/queries/debts/types";

const useDebtSummary = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.debtsSummary],
    queryFn: async (): Promise<IDebtSummary> => {
      const { data } = await axios.get("/debts/summary");
      return data;
    },
  });
  return {
    debtSummary: data,
    ...rest,
  };
};

export default useDebtSummary;

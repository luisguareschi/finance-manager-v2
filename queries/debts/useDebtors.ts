import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import axios from "@/lib/axiosInstance";
import { IDebtor } from "@/queries/debts/types";

const useDebtors = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.debtors],
    queryFn: async (): Promise<IDebtor[]> => {
      const { data } = await axios.get("/debtors");
      return data;
    },
  });

  return {
    debtors: data,
    ...rest,
  };
};

export default useDebtors;

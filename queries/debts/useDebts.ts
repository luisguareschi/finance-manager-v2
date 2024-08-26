import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import axios from "@/lib/axiosInstance";
import { IDebt } from "@/queries/debts/types";

interface props {
  debtorId?: string | null;
}

const useDebts = ({ debtorId }: props) => {
  debtorId = debtorId || "";
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.debts, debtorId],
    queryFn: async (): Promise<IDebt[]> => {
      const { data } = await axios.get("/debts", {
        params: {
          debtorId: debtorId,
        },
      });
      return data;
    },
  });
  return { debts: data, ...rest };
};

export default useDebts;

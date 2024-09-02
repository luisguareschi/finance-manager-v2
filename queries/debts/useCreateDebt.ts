import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateDebt } from "@/queries/debts/types";
import axios from "@/lib/axiosInstance";
import { QUERYKEYS } from "@/queries/queryKeys";
import toast from "react-hot-toast";

const useCreateDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newDebt: ICreateDebt) => {
      const { data } = await axios.post("/debts/", newDebt);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.debts],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.debtors],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.debtsSummary],
      });
      toast.success("Debt created successfully");
    },
  });
};

export default useCreateDebt;

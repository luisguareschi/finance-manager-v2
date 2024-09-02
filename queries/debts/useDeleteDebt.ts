import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import { QUERYKEYS } from "@/queries/queryKeys";
import toast from "react-hot-toast";

const useDeleteDebt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (debtId: string | number) => {
      const response = await axios.delete(`/debts/${debtId}/`);
      return response.data;
    },
    onMutate: async (debtId: string | number) => {
      await queryClient.cancelQueries({ queryKey: [QUERYKEYS.debts] });

      const previousDebts = queryClient.getQueryData([QUERYKEYS.debts]);

      queryClient.setQueryData([QUERYKEYS.debts], (old: any) =>
        old?.filter((debt: any) => debt.id !== debtId),
      );

      return { previousDebts };
    },
    onError: (err, debtId, context) => {
      queryClient.setQueryData([QUERYKEYS.debts], context?.previousDebts);
      toast.error("Failed to delete debt");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.debts] });
    },
    onSuccess: async () => {
      toast.success("Debt deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.debtsSummary],
      });
    },
  });
};

export default useDeleteDebt;

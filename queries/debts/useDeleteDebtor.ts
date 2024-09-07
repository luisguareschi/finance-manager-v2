import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import { QUERYKEYS } from "@/queries/queryKeys";
import toast from "react-hot-toast";

const useDeleteDebtor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (debtorId: number) => {
      return await axios.delete(`/debtors/${debtorId}/`);
    },
    onSuccess: async () => {
      toast.success("Debtor deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.debtors],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.debtsSummary],
      });
    },
  });
};

export default useDeleteDebtor;

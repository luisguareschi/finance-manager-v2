import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import { QUERYKEYS } from "@/queries/queryKeys";

const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return await axios.post("/notes/");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.notes],
      });
    },
  });
};

export default useCreateNote;

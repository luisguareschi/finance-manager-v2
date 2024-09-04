import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import { QUERYKEYS } from "@/queries/queryKeys";

const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (noteId: string | number) => {
      return await axios.delete(`/notes/${noteId}/`);
    },
    onMutate: async (noteId: string | number) => {
      await queryClient.cancelQueries({ queryKey: [QUERYKEYS.notes] });

      const previousNotes = queryClient.getQueryData([QUERYKEYS.notes]);

      queryClient.setQueryData([QUERYKEYS.notes], (old: any) =>
        old?.filter((note: any) => note.id !== noteId),
      );

      return { previousNotes };
    },
    onError: (err, noteId, context: any) => {
      queryClient.setQueryData([QUERYKEYS.notes], context.previousNotes);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERYKEYS.notes] });
    },
  });
};

export default useDeleteNote;

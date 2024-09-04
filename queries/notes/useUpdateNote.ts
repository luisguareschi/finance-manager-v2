import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axiosInstance";
import { QUERYKEYS } from "@/queries/queryKeys";

interface props {
  title: string;
  content: string;
  noteId: number;
}

const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (props: props) => {
      return await axios.put(`/notes/${props.noteId}/`, {
        title: props.title,
        content: props.content,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.notes],
      });
    },
  });
};

export default useUpdateNote;

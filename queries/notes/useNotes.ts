import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import axios from "@/lib/axiosInstance";
import { INote } from "@/queries/notes/types";

const useNotes = () => {
  const { data, ...rest } = useQuery({
    queryKey: [QUERYKEYS.notes],
    queryFn: async (): Promise<INote[]> => {
      const { data } = await axios.get("/notes");
      return data;
    },
  });

  return { notes: data, ...rest };
};

export default useNotes;

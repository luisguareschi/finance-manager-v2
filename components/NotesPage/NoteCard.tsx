import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { AnimatePresence, motion } from "framer-motion";
import { CloseSquare } from "react-iconly";
import { cn } from "@/lib/utils";
import useDeleteNote from "@/queries/notes/useDeleteNote";
import useUpdateNote from "@/queries/notes/useUpdateNote";
import debounce from "lodash/debounce";
import { Alert } from "@/components/ui/alert";

interface props {
  title?: string;
  content?: string;
  noteId?: number;
}

const NoteCard = ({ title, content, noteId }: props) => {
  const { mutate: updateNote } = useUpdateNote();
  const { mutate: deleteNote } = useDeleteNote();
  const [noteData, setNoteData] = useState({ title, content });
  const [isFocused, setIsFocused] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleDelete = () => {
    if (!noteId) return;
    deleteNote(noteId);
  };

  const debouncedUpdateNote = useRef(
    debounce((updatedData) => {
      if (!noteId) return;
      updateNote({
        title: updatedData.title,
        content: updatedData.content,
        noteId,
      });
    }, 500),
  ).current;

  useEffect(() => {
    if (!noteId) return;
    if (!noteData.title && !noteData.content) return;
    debouncedUpdateNote(noteData);
  }, [noteData.title, noteData.content]);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "flex flex-col gap-3 p-5 relative rounded-xl border border-slate-200 shadow-sm bg-white transition-colors",
          isFocused && "ring-1 ring-slate-300",
        )}
      >
        <input
          className="text-lg font-semibold text-slate-800 focus:outline-none"
          value={noteData.title}
          placeholder="Title..."
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <TextareaAutosize
          className="text-slate-600 focus:outline-none"
          value={noteData.content}
          placeholder="Content..."
          onChange={(e) =>
            setNoteData({ ...noteData, content: e.target.value })
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <AnimatePresence>
          {isFocused && (
            <motion.button
              onClick={() => setIsDeleting(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-400 absolute top-4 right-4 active:scale-90"
            >
              <CloseSquare size="large" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      <Alert
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        acceptText="Delete"
        onAccept={handleDelete}
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
      />
    </>
  );
};

export default NoteCard;

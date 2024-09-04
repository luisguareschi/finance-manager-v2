"use client";
import useNotes from "@/queries/notes/useNotes";
import NoteCard from "@/components/NotesPage/NoteCard";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import useCreateNote from "@/queries/notes/useCreateNote";
import { motion } from "framer-motion";

const NotesPage = () => {
  const { notes } = useNotes();
  const { mutate: createNote } = useCreateNote();
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <header className="flex justify-center items-center pt-5">
        <h1 className="font-semibold text-xl text-slate-800">Notes</h1>
      </header>
      <Button onClick={() => createNote()}>Create Note</Button>
      <AnimatePresence>
        {notes?.map((note) => (
          <NoteCard
            title={note.title}
            content={note.content}
            key={note.id}
            noteId={note.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotesPage;

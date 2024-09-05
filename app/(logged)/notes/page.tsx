"use client";
import useNotes from "@/queries/notes/useNotes";
import NoteCard from "@/components/NotesPage/NoteCard";
import { AnimatePresence } from "framer-motion";
import useCreateNote from "@/queries/notes/useCreateNote";
import { PaperPlus } from "react-iconly";
import React from "react";
import { FloatingButton } from "@/components/ui/floatingButton";

const NotesPage = () => {
  const { notes } = useNotes();
  const { mutate: createNote } = useCreateNote();
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <header className="flex justify-center items-center pt-5">
        <h1 className="font-semibold text-xl text-slate-800">Notes</h1>
      </header>
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
      {notes && <div className="w-full min-h-28" />}
      <FloatingButton onClick={() => createNote()}>
        <PaperPlus size="large" filled />
      </FloatingButton>
    </div>
  );
};

export default NotesPage;

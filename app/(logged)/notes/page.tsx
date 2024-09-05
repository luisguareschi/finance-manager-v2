"use client";
import useNotes from "@/queries/notes/useNotes";
import NoteCard from "@/components/NotesPage/NoteCard";
import { AnimatePresence, motion } from "framer-motion";
import useCreateNote from "@/queries/notes/useCreateNote";
import { PaperPlus, Document } from "react-iconly";
import React from "react";
import { FloatingButton } from "@/components/ui/floatingButton";
import Spinner from "@/components/common/spinner";

const NotesPage = () => {
  const { notes, isLoading: loadingNotes } = useNotes();
  const { mutate: createNote } = useCreateNote();
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <header className="flex justify-center items-center py-5">
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
        {!notes?.length && !loadingNotes && (
          <motion.div
            className="h-full flex flex-col justify-center items-center gap-2"
            layout
          >
            <div className="text-slate-500">
              <Document size="xlarge" />
            </div>
            <p className="text-slate-600">No notes yet</p>
          </motion.div>
        )}
      </AnimatePresence>
      {!!notes?.length && <div className="w-full min-h-28" />}
      {!notes && loadingNotes && (
        <div className="h-full flex justify-center items-center">
          <Spinner size={36} trackColor="blue-500" />
        </div>
      )}
      <FloatingButton onClick={() => createNote()}>
        <PaperPlus size="large" filled />
      </FloatingButton>
    </div>
  );
};

export default NotesPage;

"use client";
import useNotes from "@/queries/notes/useNotes";

const NotesPage = () => {
  const { notes } = useNotes();

  console.log(notes);
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <header className="flex justify-center items-center pt-5">
        <h1 className="font-semibold text-xl text-slate-800">Notes</h1>
      </header>
      NOTES HERE
    </div>
  );
};

export default NotesPage;

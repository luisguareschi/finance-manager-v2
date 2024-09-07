import { Card } from "@/components/ui/card";
import useDebtors from "@/queries/debts/useDebtors";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Delete } from "react-iconly";
import { Alert } from "@/components/ui/alert";
import useDeleteDebtor from "@/queries/debts/useDeleteDebtor";
import { AnimatePresence, motion } from "framer-motion";

export const DeleteDebtors = () => {
  const { mutate: deleteDebtor } = useDeleteDebtor();
  const { debtors, isLoading } = useDebtors();
  const [deleteDebtorId, setDeleteDebtorId] = useState<number | null>(null);

  const handleDelete = () => {
    if (deleteDebtorId) {
      deleteDebtor(deleteDebtorId);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <h1 className="text-lg text-slate-800">Manage Debtors</h1>
        <Card>
          <div className="flex flex-col max-h-[250px] min-h-[250px] h-[250px] overflow-scroll hide-scrollbar">
            <AnimatePresence>
              {debtors?.map((debtor) => (
                <motion.div
                  key={debtor.id}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                  className="text-lg border-b text-slate-600
              p-3 border-slate-300 flex justify-between items-center"
                >
                  {debtor.name}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="text-slate-600"
                    onClick={() => setDeleteDebtorId(debtor.id)}
                  >
                    <Delete />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="h-full w-full animate-pulse bg-slate-300 rounded-lg" />
            )}
          </div>
        </Card>
      </div>
      <Alert
        title="Delete Debtor"
        message="Are you sure you want to delete this debtor? This action cannot be undone."
        acceptText="Delete"
        onAccept={handleDelete}
        open={!!deleteDebtorId}
        onClose={() => setDeleteDebtorId(null)}
      />
    </>
  );
};

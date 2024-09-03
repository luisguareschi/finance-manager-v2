import { FiPlus } from "react-icons/fi";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Input from "@/components/common/input";
import Datepicker from "@/components/common/datepicker";
import DebtorAutocomplete from "@/components/common/DebtorAutocomplete";
import useCreateDebt from "@/queries/debts/useCreateDebt";

const defaultDebtForm = {
  debtor: "",
  amount: "",
  created: new Date(),
  description: "",
};

const AddDebtButton = () => {
  const { mutate: createDebt } = useCreateDebt();
  const [debtForm, setDebtForm] = useState(defaultDebtForm);

  const handleCreate = () => {
    createDebt(debtForm);
    setDebtForm(defaultDebtForm);
  };

  const canCreate =
    debtForm.debtor &&
    debtForm.amount &&
    debtForm.created &&
    debtForm.description;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          className="fixed bottom-28 right-5 bg-blue-500 z-10
        p-4 rounded-lg shadow shadow-blue-400 active:bg-blue-600 transition-colors"
        >
          <p className="text-white text-4xl">
            <FiPlus />
          </p>
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <DrawerHeader className="mb-5">
          <DrawerTitle className="text-slate-800">Add new Debt</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-5 mb-5">
          <DebtorAutocomplete
            value={debtForm.debtor}
            onChange={(debtor) => setDebtForm({ ...debtForm, debtor })}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Amount"
              placeholder="Amount"
              inputMode="numeric"
              type="numeric"
              iconEnd={"EUR"}
              value={debtForm.amount}
              onChange={(e) =>
                setDebtForm({ ...debtForm, amount: e.target.value })
              }
            />
            <Datepicker
              label="Date"
              value={debtForm.created}
              onChange={(date) => setDebtForm({ ...debtForm, created: date })}
            />
          </div>
          <Input
            label="Description"
            placeholder="Description"
            onChange={(e) =>
              setDebtForm({ ...debtForm, description: e.target.value })
            }
            value={debtForm.description}
          />
        </div>
        <DrawerFooter className="px-0 mb-5">
          <DrawerClose className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!canCreate}
              className="border-2 border-blue-500"
            >
              Submit
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddDebtButton;

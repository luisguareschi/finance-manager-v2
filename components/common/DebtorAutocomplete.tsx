import Autocomplete from "@/components/common/autocomplete";
import useDebtors from "@/queries/debts/useDebtors";
import { useEffect, useState } from "react";

interface props {
  value: string;
  onChange: (value: string) => void;
}

const DebtorAutocomplete = ({ value, onChange }: props) => {
  const { debtors, isLoading: loadingDebtors } = useDebtors();
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

  useEffect(() => {
    if (debtors) {
      const newOptions = debtors.map((debtor) => ({
        value: `${debtor.id}`,
        label: debtor.name,
      }));
      setOptions(newOptions);
    }
  }, [loadingDebtors]);

  const handleCreate = (label: string) => {
    setOptions([...options, { value: label, label }]);
  };

  return (
    <Autocomplete
      options={options}
      placeholder={"Select debtor..."}
      emptyMessage={"No debtors found"}
      value={value}
      onChange={(value) => onChange(value)}
      onCreate={handleCreate}
    />
  );
};

export default DebtorAutocomplete;

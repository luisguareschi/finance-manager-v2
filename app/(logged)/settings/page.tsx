"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/logout";
import { DeleteDebtors } from "@/components/SettingsPage/deleteDebtors";

const SettingsPage = () => {
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <header className="flex justify-start items-center">
        <h1 className="font-semibold text-xl text-slate-800">Settings</h1>
      </header>
      <DeleteDebtors />
      <Button
        className="mt-auto"
        variant="primaryLight"
        onClick={() => logout()}
      >
        Logout
      </Button>
    </div>
  );
};

export default SettingsPage;

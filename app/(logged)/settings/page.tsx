"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { logout } from "@/lib/logout";

const SettingsPage = () => {
  return (
    <div className="h-full w-full flex flex-col gap-5">
      <header className="flex justify-start items-center">
        <h1 className="font-semibold text-xl text-slate-800">Settings</h1>
      </header>
      <Card>
        <div className="p-5">More settings coming soon...</div>
      </Card>
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

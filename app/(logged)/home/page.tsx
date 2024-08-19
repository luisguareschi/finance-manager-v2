"use client";
import useCurrentUser from "@/queries/auth/useCurrentUser";
import dayjs from "dayjs";
import { formatCurrency } from "@/lib/fomatCurrency";
import { Wallet } from "react-iconly";

const Home = () => {
  const { user } = useCurrentUser();

  const dayOfWeek = dayjs().format("dddd");
  const dayOfMonth = dayjs().format("D");
  const month = dayjs().format("MMMM");

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div>
        <h1 className="text-lg text-slate-600 font-medium">{dayOfWeek},</h1>
        <h2 className="text-2xl text-slate-800 font-semibold">
          {`${dayOfMonth} ${month}`}
        </h2>
      </div>
      <div className="p-5 py-6 rounded-2xl flex flex-col bg-gradient-to-br from-blue-400 to-blue-800 relative">
        <p className="text-white text-lg opacity-80">You are owed</p>
        <p className="font-semibold text-4xl text-white mb-4 mt-1">
          {formatCurrency(123.34)}
        </p>
        <p className="text-white opacity-80">{user?.username || "LuisG"}</p>
        <p className="text-white">{user?.email || "guareschiluis@gmail.com"}</p>
        <div className="absolute bottom-5 right-5 text-white">
          <Wallet filled size="xlarge" />
        </div>
      </div>
      <p className="text-lg font-medium text-slate-800">People who owe you:</p>
      <div>
        <p className="text-slate-600">No one owes you money</p>
      </div>
    </div>
  );
};

export default Home;

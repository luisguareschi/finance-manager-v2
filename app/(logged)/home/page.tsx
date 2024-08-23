"use client";
import dayjs from "dayjs";
import DebtSummaryCard from "@/components/DebtSummaryCard";

const Home = () => {
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
      <DebtSummaryCard />
      <p className="text-lg font-medium text-slate-800">People who owe you:</p>
      <div>
        <p className="text-slate-600">No one owes you money</p>
      </div>
    </div>
  );
};

export default Home;

"use client";
import dayjs from "dayjs";
import DebtSummaryCard from "@/components/DebtSummaryCard";
import DebtSummary from "@/components/DebtSummary";
import AddDebtButton from "@/components/AddDebtButton";

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
      <DebtSummary />
      <AddDebtButton />
    </div>
  );
};

export default Home;

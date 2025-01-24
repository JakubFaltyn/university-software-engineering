"use client";

import DataTable from "@/components/blocks/DetailsTable";
import { CsvForm } from "@/components/blocks/CsvForm";
import Totals from "@/components/blocks/Totals";

export default function TaxCalculator() {
  return (
    <div className="mx-auto sm:px-2 lg:px-4 pt-10">
      <div className="bg-white rounded-3xl flex overflow-hidden">
        <div className="w-2/3 p-10">
          <CsvForm />
        </div>
        <div className="w-1/3 p-10 bg-slate-900 rounded-bl-[80px]">
          <Totals />
        </div>
      </div>
      <div className="bg-white rounded-3xl">
        <DataTable />
      </div>
    </div>
  );
}

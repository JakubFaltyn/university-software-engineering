import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { useTaxStore } from "@/providers/taxStoreProvider";

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

const formatPLN = (amount: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount);
};

function DataTable() {
  const results = useTaxStore((state) => state.csvResults);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "asc",
  });
  console.log(results);
  if (!results || results.details.length == 0) return null;

  const { details } = results;

  const sortData = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedData = () => {
    if (!sortConfig.key) return details;

    return [...details].sort((a, b) => {
      if (sortConfig.key.includes(".")) {
        const [parent, child] = sortConfig.key.split(".");
        if (parent === "employeeTax" || parent === "employerTax") {
          const aValue = a[parent][child as keyof (typeof a)[typeof parent]];
          const bValue = b[parent][child as keyof (typeof b)[typeof parent]];
          if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      }

      const aValue = a[sortConfig.key as keyof typeof a];
      const bValue = b[sortConfig.key as keyof typeof b];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const getSortIcon = (key: string) => {
    return sortConfig.key === key ? (
      sortConfig.direction === "asc" ? (
        <FaSortUp />
      ) : (
        <FaSortDown />
      )
    ) : (
      <FaSort />
    );
  };

  const renderSortableHeader = (label: string, key: string) => (
    <th
      className="border p-2 cursor-pointer bg-slate-100 hover:bg-lime"
      onClick={() => sortData(key)}
    >
      <div className="flex items-center justify-center">
        <div className="me-1">{label}</div> {getSortIcon(key)}
      </div>
    </th>
  );

  const renderHeader = (label: string) => (
    <th className="border p-2 cursor-pointer bg-slate-100 hover:bg-lime">
      <div className="flex items-center justify-center">
        <div className="me-1">{label}</div> {getSortIcon(key)}
      </div>
    </th>
  );

  return (
    <div className="my-5 p-10">
      <h2 className="text-2xl font-bold mb-6">Employee Tax Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="border p-2">Name</th>
              <th className="border p-2">Annual Salary</th>
              <th className="border p-2" colSpan={5}>
                Employee Taxes
              </th>
              <th className="border p-2" colSpan={5}>
                Employer Taxes
              </th>
              <th className="border p-2" colSpan={4}>
                Summary
              </th>
            </tr>
            <tr>
              {renderSortableHeader("Name", "name")}
              {renderSortableHeader("Annual Salary", "annualSalary")}
              {/* Employee Tax Headers */}
              {renderSortableHeader("Pension", "employeeTax.pension")}
              {renderSortableHeader("Disability", "employeeTax.disability")}
              {renderSortableHeader("Sickness", "employeeTax.sickness")}
              {renderSortableHeader(
                "Health Insurance",
                "employeeTax.healthInsurance"
              )}
              {renderSortableHeader("Income Tax", "employeeTax.incomeTax")}
              {/* Employer Tax Headers */}
              {renderSortableHeader("Pension", "employerTax.pension")}
              {renderSortableHeader("Disability", "employerTax.disability")}
              {renderSortableHeader("Accident", "employerTax.accident")}
              {renderSortableHeader("Labor Fund", "employerTax.laborFund")}
              {renderSortableHeader(
                "Guaranteed Benefits",
                "employerTax.guaranteedBenefits"
              )}
              {/* Summary Headers */}
              {renderSortableHeader("Net Salary", "employeeTax.postTaxSalary")}
              {renderSortableHeader(
                "Total Employee Taxes",
                "employeeTax.totalTaxes"
              )}
              {renderSortableHeader(
                "Total Employer Taxes",
                "employerTax.totalTaxes"
              )}
              {renderSortableHeader("Total Cost", "employerTax.totalCost")}
            </tr>
          </thead>
          <tbody className="[&:nth-child(odd)]:bg-slate-100">
            {getSortedData().map((detail) => (
              <tr
                key={detail.name + Math.random().toString()}
                className="[&:nth-child(even)]:bg-slate-100 hover:bg-slate-300 [&:nth-child(even)]:hover:bg-slate-300"
              >
                <td className="border p-2">{detail.name}</td>
                <td className="border p-2">{formatPLN(detail.annualSalary)}</td>
                {/* Employee Taxes */}
                <td className="border p-2">
                  {formatPLN(detail.employeeTax.pension)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employeeTax.disability)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employeeTax.sickness)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employeeTax.healthInsurance)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employeeTax.incomeTax)}
                </td>
                {/* Employer Taxes */}
                <td className="border p-2">
                  {formatPLN(detail.employerTax.pension)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employerTax.disability)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employerTax.accident)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employerTax.laborFund)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employerTax.guaranteedBenefits)}
                </td>
                {/* Summary */}
                <td className="border p-2">
                  {formatPLN(detail.employeeTax.postTaxSalary)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employeeTax.totalTaxes)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employerTax.totalTaxes)}
                </td>
                <td className="border p-2">
                  {formatPLN(detail.employerTax.totalCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;

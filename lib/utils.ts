import { TaxCalculationResponse } from "@/app/api/calculate-taxes/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertTaxCalculationsToCSV(
  data: TaxCalculationResponse
): string {
  if (!data.details.length) return "";

  const headers = [
    "Name",
    "Annual Salary",
    "Employee Pension",
    "Employee Disability",
    "Employee Sickness",
    "Employee Health Insurance",
    "Employee Income Tax",
    "Employee Total Taxes",
    "Net Salary",
    "Employer Pension",
    "Employer Disability",
    "Employer Accident",
    "Employer Labor Fund",
    "Employer Guaranteed Benefits",
    "Employer Total Taxes",
    "Total Cost",
  ];

  const rows = data.details.map((detail) => [
    detail.name,
    detail.annualSalary,
    detail.employeeTax.pension,
    detail.employeeTax.disability,
    detail.employeeTax.sickness,
    detail.employeeTax.healthInsurance,
    detail.employeeTax.incomeTax,
    detail.employeeTax.totalTaxes,
    detail.employeeTax.postTaxSalary,
    detail.employerTax.pension,
    detail.employerTax.disability,
    detail.employerTax.accident,
    detail.employerTax.laborFund,
    detail.employerTax.guaranteedBenefits,
    detail.employerTax.totalTaxes,
    detail.employerTax.totalCost,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
    "",
    "Company Totals",
    `Total Annual Salaries,${data.companyTotals.totalAnnualSalaries}`,
    `Total Annual Taxes,${data.companyTotals.totalAnnualTaxes}`,
    `Total Annual Cost,${data.companyTotals.totalAnnualCost}`,
  ].join("\n");

  return csvContent;
}

export function roundTax(tax: number) {
  return Math.round(tax * 100) / 100;
}

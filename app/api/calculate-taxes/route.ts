import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { calculateEmployeeTax } from "./functions/employee/calculateEmployeeTax";
import { calculateEmployerTax } from "./functions/employer/calculateEmployerTax";
import { TransactionRow, EmployeeTaxCalculation, CompanyTotals } from "./types";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Read and parse the CSV file
    const csvText = await file.text();
    const employees = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
      cast: true,
    }) as TransactionRow[];

    // Calculate taxes for each employee
    const taxCalculations: EmployeeTaxCalculation[] = employees.map((row) => {
      const employeeTax = calculateEmployeeTax(row.annualSalary);
      const employerTax = calculateEmployerTax(row.annualSalary);

      return {
        name: row.name,
        annualSalary: row.annualSalary,
        employeeTax,
        employerTax,
      };
    });

    // Calculate company totals
    const companyTotals = taxCalculations.reduce<CompanyTotals>(
      (acc, curr) => ({
        totalAnnualSalaries: acc.totalAnnualSalaries + curr.annualSalary,
        totalAnnualTaxes: acc.totalAnnualTaxes + curr.employerTax.totalTaxes,
        totalAnnualCost: acc.totalAnnualCost + curr.employerTax.totalCost,
      }),
      {
        totalAnnualSalaries: 0,
        totalAnnualTaxes: 0,
        totalAnnualCost: 0,
      }
    );

    return NextResponse.json(
      {
        details: taxCalculations,
        companyTotals: companyTotals,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Tax calculation error:", error);
    return NextResponse.json(
      { error: "Failed to process tax calculations" },
      { status: 500 }
    );
  }
}

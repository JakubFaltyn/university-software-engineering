export interface TransactionRow {
  name: string;
  annualSalary: number;
}

export interface CompanyTotals {
  totalAnnualSalaries: number;
  totalAnnualTaxes: number;
  totalAnnualCost: number;
}

export interface EmployeeTaxCalculation {
  name: string;
  annualSalary: number;
  employeeTax: EmployeeTax;
  employerTax: EmployerTax;
}

// Based on the usage, these interfaces would need to match
// the return types of calculateEmployeeTax and calculateEmployerTax functions
export interface EmployeeTax {
  // Add specific fields returned by calculateEmployeeTax
  totalTaxes: number;
  // Add other relevant fields
}

export interface EmployerTax {
  totalTaxes: number;
  totalCost: number;
  // Add other relevant fields
}

export interface TaxCalculationResponse {
  details: EmployeeTaxCalculation[];
  companyTotals: CompanyTotals;
}

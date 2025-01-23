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
  pension: number;
  disability: number;
  sickness: number;
  incomeTax: number;
  totalTaxes: number;
  postTaxSalary: number;
}

export interface EmployerTax {
  pension: number;
  disability: number;
  accident: number;
  laborFund: number;
  guaranteedBenefits: number;
  totalTaxes: number;
  totalCost: number;
}

export interface TaxCalculationResponse {
  details: EmployeeTaxCalculation[];
  companyTotals: CompanyTotals;
}

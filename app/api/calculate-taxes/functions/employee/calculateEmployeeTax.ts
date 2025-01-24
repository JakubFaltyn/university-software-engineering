import { roundTax } from "../../../../../lib/utils";
import { EMPLOYEE_TAX_RATES } from "./taxRates";

function calculateIncomeTax(annualIncome: number): number {
  if (annualIncome <= 30000) {
    return 0;
  }

  if (annualIncome <= 120000) {
    return Math.max(0, annualIncome * 0.12 - 3600);
  }

  // For income > 120000
  const baseTax = 10800; // (120000 * 0.12) - 3600
  const surplusTax = (annualIncome - 120000) * 0.32;
  return baseTax + surplusTax;
}

export function calculateEmployeeTax(annualSalary: number) {
  if (annualSalary <= 0) {
    return {
      pension: 0,
      disability: 0,
      sickness: 0,
      healthInsurance: 0,
      incomeTax: 0,
      totalTaxes: 0,
      postTaxSalary: 0,
    };
  }

  // Social Security components
  const pension = roundTax(
    annualSalary * EMPLOYEE_TAX_RATES.social_security.pension
  );
  const disability = roundTax(
    annualSalary * EMPLOYEE_TAX_RATES.social_security.disability
  );
  const sickness = roundTax(
    annualSalary * EMPLOYEE_TAX_RATES.social_security.sickness
  );

  const totalDeductions = roundTax(pension + disability + sickness);

  // Health Insurance - calculated after social security deductions
  const healthInsurance = roundTax(
    (annualSalary - totalDeductions) * EMPLOYEE_TAX_RATES.health_insurance.rate
  );

  // Income Tax - based on annual salary after deductions
  const taxableIncome = roundTax(annualSalary - totalDeductions);
  const incomeTax = roundTax(calculateIncomeTax(taxableIncome));

  // Total employee taxes
  const totalTaxes = roundTax(totalDeductions + healthInsurance + incomeTax);
  const postTaxSalary = roundTax(annualSalary - totalTaxes);

  return {
    pension,
    disability,
    sickness,
    healthInsurance,
    incomeTax,
    totalTaxes,
    postTaxSalary,
  };
}

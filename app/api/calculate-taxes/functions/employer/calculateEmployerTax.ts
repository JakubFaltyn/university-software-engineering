import { EMPLOYER_TAX_RATES } from "./taxRates";

export function calculateEmployerTax(annualSalary: number) {
  if (annualSalary <= 0) {
    return {
      pension: 0,
      disability: 0,
      accident: 0,
      laborFund: 0,
      guaranteedBenefits: 0,
      totalTaxes: 0,
      totalCost: 0,
    };
  }

  // Social Security components
  const pension = annualSalary * EMPLOYER_TAX_RATES.social_security.pension;
  const disability =
    annualSalary * EMPLOYER_TAX_RATES.social_security.disability;
  const accident = annualSalary * EMPLOYER_TAX_RATES.social_security.accident;

  // Labor Funds components
  const laborFund = annualSalary * EMPLOYER_TAX_RATES.labor_funds.labor_fund;
  const guaranteedBenefits =
    annualSalary * EMPLOYER_TAX_RATES.labor_funds.guaranteed_benefits;

  // Total employer taxes
  const totalTaxes =
    pension + disability + accident + laborFund + guaranteedBenefits;
  const totalCost = annualSalary + totalTaxes;

  return {
    pension,
    disability,
    accident,
    laborFund,
    guaranteedBenefits,
    totalTaxes,
    totalCost,
  };
}

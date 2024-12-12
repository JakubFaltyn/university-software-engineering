export const EMPLOYEE_TAX_RATES = {
  //Składki społeczne pracownika
  social_security: {
    pension: 0.0976, // Składka emerytalna (9.76%)
    disability: 0.015, // Składka rentowa (1.50%)
    sickness: 0.0245, // Składka chorobowa (2.45%)
  },

  // Ubezpieczenie zdrowotne
  health_insurance: {
    rate: 0.09, // Składka zdrowotna (9%)
  },

  // Zaliczka na podatek dochodowy
  income_tax: {
    rate: 0.12, // Podatek dochodowy (12%)
    tax_deductible_costs: 3000, // Koszty uzyskania przychodu
  },
};

import { createStore } from 'zustand/vanilla'

export type TaxResults = {
  employeeTax: {
    pension: number
    disability: number 
    sickness: number
    healthInsurance: number
    incomeTax: number
    totalTaxes: number
    postTaxSalary: number
  }
  employerTax: {
    pension: number
    disability: number
    accident: number
    laborFund: number
    guaranteedBenefits: number
    totalTaxes: number
    totalCost: number
  }
}

export type TaxState = {
  results: TaxResults | null
}

export type TaxActions = {
  setResults: (results: TaxResults) => void
  clearResults: () => void
}

export type TaxStore = TaxState & TaxActions

export const defaultInitState: TaxState = {
  results: null
}

export const createTaxStore = (
  initState: TaxState = defaultInitState,
) => {
  return createStore<TaxStore>()((set) => ({
    ...initState,
    setResults: (results) => set({ results }),
    clearResults: () => set({ results: null }),
  }))
}

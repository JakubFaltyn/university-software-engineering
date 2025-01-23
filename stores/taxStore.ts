import {
  EmployeeTax,
  EmployerTax,
  TaxCalculationResponse,
} from "@/app/api/calculate-taxes/types";
import { createStore } from "zustand/vanilla";

export type TaxResults = {
  employeeTax: EmployeeTax;
  employerTax: EmployerTax;
};

export type TaxState = {
  results: TaxResults | null;
  csvResults: TaxCalculationResponse | null;
};

export type TaxActions = {
  setResults: (results: TaxResults) => void;
  clearResults: () => void;
  setCsvResults: (csvResults: TaxCalculationResponse) => void;
  clearCsvResults: () => void;
};

export type TaxStore = TaxState & TaxActions;

export const defaultInitState: TaxState = {
  results: null,
  csvResults: null,
};

export const createTaxStore = (initState: TaxState = defaultInitState) => {
  return createStore<TaxStore>()((set) => ({
    ...initState,
    setResults: (results) => set({ results }),
    clearResults: () => set({ results: null }),
    setCsvResults: (csvResults) => set({ csvResults }),
    clearCsvResults: () => set({ csvResults: null }),
  }));
};

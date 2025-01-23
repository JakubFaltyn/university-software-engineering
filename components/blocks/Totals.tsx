import { useTaxStore } from "@/providers/taxStoreProvider";

const formatPLN = (amount: number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(amount);
};

export default function Totals() {
  const results = useTaxStore((state) => state.csvResults);
  if (!results || results.details.length == 0) {
    return (
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Tax Calculator Results</h1>
        <p className="text-slate-300">
          Complete the form and click "Calculate Taxes" to see your tax
          breakdown.
        </p>
      </div>
    );
  }

  const companyTotals = results.companyTotals;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Tax Calculation Results</h1>

      <div className="space-y-6">
        <div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Total Annual Salaries</div>

              <div className="text-lg font-light">
                {formatPLN(companyTotals.totalAnnualSalaries)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Total Annual Taxes</div>
              <div className="text-lg font-light">
                {formatPLN(companyTotals.totalAnnualTaxes)}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Total Annual Costs</div>
              <div className="text-lg font-light">
                {formatPLN(companyTotals.totalAnnualCost)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

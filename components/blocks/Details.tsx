"use client";

import { useTaxStore } from "@/providers/taxStoreProvider";

export default function Details() {
    const results = useTaxStore((state) => state.results);

    if (!results) {
        return (
            <div className="text-white text-center">
                <h1 className="text-2xl font-bold mb-4">Tax Calculator Results</h1>
                <p className="text-slate-300">Complete the form and click "Calculate Taxes" to see your tax breakdown.</p>
            </div>
        );
    }

    const { employeeTax, employerTax } = results;
    const monthlyGross = employeeTax.postTaxSalary / 12;
    const monthlyCost = employerTax.totalCost / 12;

    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-6">Tax Calculation Results</h1>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-3">Employee Contributions</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Pension (9.76%)</span>
                            <span>{employeeTax.pension.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Disability (1.5%)</span>
                            <span>{employeeTax.disability.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Sickness (2.45%)</span>
                            <span>{employeeTax.sickness.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Health Insurance (9%)</span>
                            <span>{employeeTax.healthInsurance.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Income Tax</span>
                            <span>{employeeTax.incomeTax.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total Monthly Net</span>
                            <span>{monthlyGross.toFixed(2)} PLN</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Employer Contributions</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Pension (9.76%)</span>
                            <span>{employerTax.pension.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Disability (6.5%)</span>
                            <span>{employerTax.disability.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Accident (1.67%)</span>
                            <span>{employerTax.accident.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Labor Fund (2.45%)</span>
                            <span>{employerTax.laborFund.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Guaranteed Benefits (0.1%)</span>
                            <span>{employerTax.guaranteedBenefits.toFixed(2)} PLN</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-2 border-t">
                            <span>Total Monthly Cost</span>
                            <span>{monthlyCost.toFixed(2)} PLN</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

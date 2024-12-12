import { calculateEmployeeTax } from "../calculateEmployeeTax";

describe("calculateEmployeeTax", () => {
  test("should not charge income tax for annual salary below 30000 PLN", () => {
    const annualSalary = 29000;
    const result = calculateEmployeeTax(annualSalary);

    // Should have social security and health insurance, but no income tax
    expect(result.incomeTax).toBe(0);
  });

  test("should correctly calculate taxes for annual salary of 56000 PLN (12% tax rate)", () => {
    const annualSalary = 56000;
    const result = calculateEmployeeTax(annualSalary);

    // Expected values based on tax rates:
    // Pension: 0.0976 * 56000 = 5465.6
    // Disability: 0.015 * 56000 = 840
    // Sickness: 0.0245 * 56000 = 1372
    // Total deductions = 7677.6
    // Health Insurance: (56000 - 7677.6) * 0.09 = 4349.02
    // Taxable Income: 56000 - 7677.6 = 48322.4
    // Income Tax: (48322.4 * 0.12) - 3600 = 2198.69

    expect(result.pension).toBeCloseTo(5465.6);
    expect(result.disability).toBeCloseTo(840);
    expect(result.sickness).toBeCloseTo(1372);
    expect(result.healthInsurance).toBeCloseTo(4349.02);
    expect(result.incomeTax).toBeCloseTo(2198.69);
  });

  test("should correctly calculate taxes for annual salary of 150000 PLN (mixed tax rate)", () => {
    const annualSalary = 150000;
    const result = calculateEmployeeTax(annualSalary);

    // Social security deductions: 150000 * (0.0976 + 0.015 + 0.0245) = 20565
    // Taxable Income: 150000 - 20565 = 129435
    // Base tax up to 120000: 10800
    // Additional tax on 9435: 9435 * 0.32 = 3019.2
    // Total income tax: 13819.2

    expect(result.incomeTax).toBeCloseTo(13819.2);
  });

  test("should return all zeros for zero salary", () => {
    const result = calculateEmployeeTax(0);

    expect(result.pension).toBe(0);
    expect(result.disability).toBe(0);
    expect(result.sickness).toBe(0);
    expect(result.healthInsurance).toBe(0);
    expect(result.incomeTax).toBe(0);
    expect(result.totalTaxes).toBe(0);
    expect(result.postTaxSalary).toBe(0);
  });

  test("should return all zeros for negative salary", () => {
    const result = calculateEmployeeTax(-1000);

    expect(result.pension).toBe(0);
    expect(result.disability).toBe(0);
    expect(result.sickness).toBe(0);
    expect(result.healthInsurance).toBe(0);
    expect(result.incomeTax).toBe(0);
    expect(result.totalTaxes).toBe(0);
    expect(result.postTaxSalary).toBe(0);
  });
});

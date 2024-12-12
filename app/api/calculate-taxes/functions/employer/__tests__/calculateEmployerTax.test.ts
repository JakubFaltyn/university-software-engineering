import { calculateEmployerTax } from "../calculateEmployerTax";

describe("calculateEmployerTax", () => {
  test("should correctly calculate taxes for annual salary of 56000 PLN", () => {
    const annualSalary = 56000;
    const result = calculateEmployerTax(annualSalary);

    // Expected values based on tax rates:
    // Pension: 0.0976 * 56000 = 5465.6
    // Disability: 0.065 * 56000 = 3640
    // Accident: 0.0167 * 56000 = 935.2
    // Labor Fund: 0.0245 * 56000 = 1372
    // Guaranteed Benefits: 0.001 * 56000 = 56
    // Total taxes: 5465.6 + 3640 + 935.2 + 1372 + 56 = 11468.8
    // Total annual cost: 56000 + 11468.8 = 67468.8

    expect(result.pension).toBeCloseTo(5465.6);
    expect(result.disability).toBeCloseTo(3640);
    expect(result.accident).toBeCloseTo(935.2);
    expect(result.laborFund).toBeCloseTo(1372);
    expect(result.guaranteedBenefits).toBeCloseTo(56);
    expect(result.totalTaxes).toBeCloseTo(11468.8);
    expect(result.totalCost).toBeCloseTo(67468.8);
  });

  test("should return all zeros for zero salary", () => {
    const result = calculateEmployerTax(0);

    expect(result.pension).toBe(0);
    expect(result.disability).toBe(0);
    expect(result.accident).toBe(0);
    expect(result.laborFund).toBe(0);
    expect(result.guaranteedBenefits).toBe(0);
    expect(result.totalTaxes).toBe(0);
    expect(result.totalCost).toBe(0);
  });

  test("should return all zeros for negative salary", () => {
    const result = calculateEmployerTax(-1000);

    expect(result.pension).toBe(0);
    expect(result.disability).toBe(0);
    expect(result.accident).toBe(0);
    expect(result.laborFund).toBe(0);
    expect(result.guaranteedBenefits).toBe(0);
    expect(result.totalTaxes).toBe(0);
    expect(result.totalCost).toBe(0);
  });
});

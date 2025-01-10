import { POST } from "../route";
import { calculateEmployeeTax } from "../functions/employee/calculateEmployeeTax";
import { calculateEmployerTax } from "../functions/employer/calculateEmployerTax";

// Mock the tax calculation functions
jest.mock("../functions/employee/calculateEmployeeTax");
jest.mock("../functions/employer/calculateEmployerTax");

describe("Tax Calculation API", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Setup mock implementations
    (calculateEmployeeTax as jest.Mock).mockImplementation(
      (salary: number) => ({
        pension: salary * 0.0976,
        disability: salary * 0.015,
        sickness: salary * 0.0245,
        healthInsurance: salary * 0.09,
        incomeTax: salary * 0.12 - 3600,
        totalTaxes: salary * 0.247 - 3600,
        postTaxSalary: salary - (salary * 0.247 - 3600),
      })
    );

    (calculateEmployerTax as jest.Mock).mockImplementation(
      (salary: number) => ({
        pension: salary * 0.0976,
        disability: salary * 0.065,
        accident: salary * 0.0167,
        laborFund: salary * 0.0245,
        guaranteedBenefits: salary * 0.001,
        totalTaxes: salary * 0.2048,
        totalCost: salary * 1.2048,
      })
    );
  });

  test("should correctly process CSV file and calculate taxes", async () => {
    // Create test CSV content
    const csvContent = `name,annualSalary
John Doe,60000
Jane Smith,72000`;

    // Create a mock File object
    const file = new File([csvContent], "employees.csv", {
      type: "text/csv",
    });

    // Create FormData with the file
    const formData = new FormData();
    formData.append("file", file);

    // Create mock Request
    const request = new Request("http://localhost:3000/api/calculate-taxes", {
      method: "POST",
      body: formData,
    });

    // Call the API endpoint
    const response = await POST(request);
    const data = await response.json();

    // Verify response structure
    expect(response.status).toBe(200);
    expect(data).toHaveProperty("details");
    expect(data).toHaveProperty("companyTotals");

    // Verify details array
    expect(data.details).toHaveLength(2);
    expect(data.details[0]).toEqual({
      name: "John Doe",
      annualSalary: 60000,
      employeeTax: expect.any(Object),
      employerTax: expect.any(Object),
    });

    // Verify company totals
    expect(data.companyTotals).toEqual({
      totalAnnualSalaries: 132000, // 60000 + 72000
      totalAnnualTaxes: 27033.6, // (60000 + 72000) * 0.2048
      totalAnnualCost: 159033.6, // 132000 * 1.2048
    });

    // Verify tax calculation functions were called correctly
    expect(calculateEmployeeTax).toHaveBeenCalledTimes(2);
    expect(calculateEmployeeTax).toHaveBeenCalledWith(60000);
    expect(calculateEmployeeTax).toHaveBeenCalledWith(72000);

    expect(calculateEmployerTax).toHaveBeenCalledTimes(2);
    expect(calculateEmployerTax).toHaveBeenCalledWith(60000);
    expect(calculateEmployerTax).toHaveBeenCalledWith(72000);
  });

  test("should return error for missing file", async () => {
    // Create mock Request without file
    const formData = new FormData();
    const request = new Request("http://localhost:3000/api/calculate-taxes", {
      method: "POST",
      body: formData,
    });

    // Call the API endpoint
    const response = await POST(request);
    const data = await response.json();

    // Verify error response
    expect(response.status).toBe(400);
    expect(data).toEqual({ error: "No file provided" });
  });
});

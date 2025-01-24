"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTaxStore } from "@/providers/taxStoreProvider";
import { TaxCalculationResponse } from "@/app/api/calculate-taxes/types";
import { convertTaxCalculationsToCSV } from "@/lib/utils";

// Define the schema for form validation
const formSchema = z.object({
  csvFile: z.instanceof(File).refine((file) => file.type === "text/csv", {
    message: "Only CSV files are allowed.",
  }),
});

export function CsvForm() {
  const setCsvTaxResults = useTaxStore((state) => state.setCsvResults);
  const clearCsvResults = useTaxStore((state) => state.clearCsvResults);
  const results = useTaxStore((state) => state.csvResults);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      csvFile: undefined,
    },
  });

  const handleSubmit = async (values: { csvFile: File | null }) => {
    if (!values.csvFile) return;

    const formData = new FormData();
    formData.append("file", values.csvFile);

    // Send the FormData in the POST request
    const response = await fetch("/api/calculate-taxes", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data: TaxCalculationResponse = await response.json();
      setCsvTaxResults(data); // Store the results in the tax store
    } else {
      console.error("Error fetching tax calculations");
      // Handle error appropriately (e.g., show a message to the user)
    }
  };

  const handleDownload = () => {
    if (!results) return;

    const csvContent = convertTaxCalculationsToCSV(results);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "tax_calculations.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl leading-[1.25]">Calculate your taxes</h1>
        <div className="flex gap-4">
          {results && (
            <Button type="button" variant="outline" onClick={handleDownload}>
              Download Calculations
            </Button>
          )}
          <button
            type="button"
            onClick={() => {
              form.reset();
              clearCsvResults();
            }}
            className="underline text-slate-700 hover:text-slate-900 text-base leading-[150%]"
          >
            Clear All
          </button>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="csvFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 text-base leading-[150%] mb-3">
                  Upload CSV File
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".csv"
                    className="max-w-xl"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        field.onChange(files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Please ensure that the uploaded CSV file contains headers:{" "}
                  <strong>name</strong> and <strong>annualSalary</strong>.
                </FormDescription>
                {results?.details.length == 0 ? (
                  <FormDescription className="font-medium text-destructive">
                    Something went wrong while processing your CSV file. Please
                    ensure it is correct.
                  </FormDescription>
                ) : (
                  ""
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Calcualate Taxes</Button>
        </form>
      </Form>
    </>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { calculateEmployeeTax } from "@/app/api/calculate-taxes/functions/employee/calculateEmployeeTax";
import { calculateEmployerTax } from "@/app/api/calculate-taxes/functions/employer/calculateEmployerTax";
import { useTaxStore } from "@/providers/taxStoreProvider";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  annualSalary: z.string().refine(
    (value) => {
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    },
    {
      message: "Please enter a valid positive number",
    }
  ),
});

export function MainForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      annualSalary: "",
    },
  });
  const setTaxResults = useTaxStore((state) => state.setResults);
  const clearResults = useTaxStore((state) => state.clearResults);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const salary = Number(values.annualSalary);
    const employeeTax = calculateEmployeeTax(salary);
    const employerTax = calculateEmployerTax(salary);

    setTaxResults({
      employeeTax,
      employerTax,
    });
  }

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl leading-[1.25]">Calculate your taxes</h1>
        <button
          type="button"
          onClick={() => {
            form.reset();
            clearResults();
          }}
          className="underline text-slate-700 hover:text-slate-900 text-base leading-[150%]"
        >
          Clear All
        </button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="annualSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 text-base leading-[150%] mb-3">
                  Annual salary
                </FormLabel>
                <FormControl>
                  <Input placeholder="60000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-5" type="submit">
            Calculate Taxes
          </Button>
        </form>
      </Form>
    </>
  );
}

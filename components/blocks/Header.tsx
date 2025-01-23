"use client";

import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      <h1 className="text-2xl font-bold text-slate-700">Tax Calculator</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-slate-700 hover:text-slate-900">
              Basic calculator
            </Link>
          </li>
          <li>
            <Link
              href="/taxCalculator"
              className="text-slate-700 hover:text-slate-900"
            >
              CSV calculator
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

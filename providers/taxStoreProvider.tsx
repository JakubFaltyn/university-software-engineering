"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type TaxStore, createTaxStore } from "@/stores/taxStore";

export type TaxStoreApi = ReturnType<typeof createTaxStore>;

export const TaxStoreContext = createContext<TaxStoreApi | undefined>(undefined);

export interface TaxStoreProviderProps {
    children: ReactNode;
}

export const TaxStoreProvider = ({ children }: TaxStoreProviderProps) => {
    const storeRef = useRef<TaxStoreApi | null>(null);
    if (!storeRef.current) {
        storeRef.current = createTaxStore();
    }

    return <TaxStoreContext.Provider value={storeRef.current}>{children}</TaxStoreContext.Provider>;
};

export const useTaxStore = <T,>(selector: (store: TaxStore) => T): T => {
    const taxStoreContext = useContext(TaxStoreContext);

    if (!taxStoreContext) {
        throw new Error(`useTaxStore must be used within TaxStoreProvider`);
    }

    return useStore(taxStoreContext, selector);
};

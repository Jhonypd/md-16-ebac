import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getExchangeRates } from "../../data/api";

interface ExchangeContextType {
  rates: { [key: string]: number };
  history: Calculation[];
  addCalculation: (calculation: Calculation) => void;
}

interface Calculation {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  result: number;
}

export const ExchangeContext = createContext<ExchangeContextType | undefined>(
  undefined
);

interface ExchangeProviderProps {
  children: ReactNode;
}

export const ExchangeProvider: React.FC<ExchangeProviderProps> = ({
  children,
}) => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [history, setHistory] = useState<Calculation[]>(
    JSON.parse(localStorage.getItem("history") || "[]")
  );

  useEffect(() => {
    const fetchRates = async () => {
      const data = await getExchangeRates();
      if (data && data.success) {
        setRates(data.rates);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const addCalculation = (calculation: Calculation) => {
    setHistory([...history, calculation]);
  };

  return (
    <ExchangeContext.Provider value={{ rates, history, addCalculation }}>
      {children}
    </ExchangeContext.Provider>
  );
};

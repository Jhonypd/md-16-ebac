/** @format */

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getExchangeRates, getAvailableCoins } from "../data/api";
import { toast } from "react-toastify";

export interface Calculation {
	amount: string;
	fromCurrency: string;
	toCurrency: string;
	result: number;
	type: "Compra" | "Venda";
	fromValue: number;
	toValue: number;
	date: Date;
	formattedAmount: string;
	formattedResult: string;
}

export interface ExchangeRate {
	ask: string;
	bid: string;
}

export interface ExchangeContextType {
	rates: { [key: string]: string };
	coins: { [key: string]: string };
	history: Calculation[];
	addCalculation: (calculation: Calculation) => void;
	getExchangeRates: (
		currency: string,
	) => Promise<{ [key: string]: string } | null>;
	fetchExchangeRates: (
		fromCurrency: string,
		toCurrency: string,
	) => Promise<{ dataFrom: ExchangeRate; dataTo: ExchangeRate } | null>;
	showToast: (message: string) => void;
}

export const ExchangeContext = createContext<ExchangeContextType | undefined>(
	undefined,
);

interface ExchangeProviderProps {
	children: ReactNode;
}

export const ExchangeProvider: React.FC<ExchangeProviderProps> = ({
	children,
}) => {
	const [rates, setRates] = useState<{ [key: string]: string }>({});
	const [coins, setCoins] = useState<{ [key: string]: string }>({});
	const [history, setHistory] = useState<Calculation[]>(
		JSON.parse(localStorage.getItem("history") || "[]"),
	);

	useEffect(() => {
		const fetchRates = async () => {
			const data = await getExchangeRates("USD");
			if (data) {
				setRates(data);
			}
		};

		const fetchCoins = async () => {
			const data = await getAvailableCoins();
			if (data) {
				setCoins(data);
			}
		};

		fetchRates();
		fetchCoins();
	}, []);

	useEffect(() => {
		localStorage.setItem("history", JSON.stringify(history));
	}, [history]);

	const addCalculation = async (calculation: Calculation) => {
		const fromRate = await getExchangeRates(calculation.fromCurrency);
		const toRate = await getExchangeRates(calculation.toCurrency);

		if (!fromRate || !toRate) {
			console.error("Invalid currency or unable to fetch exchange rates");

			return;
		}

		const fromValue = parseFloat(fromRate.ask);
		const toValue = parseFloat(toRate.bid);

		const type = calculation.fromCurrency === "USD" ? "Compra" : "Venda";
		const amount = parseFloat(calculation.amount);

		const result = type === "Compra" ? amount * toValue : amount * fromValue;

		const calculationWithDetails: Calculation = {
			...calculation,
			type,
			fromValue,
			toValue,
			result,
			date: new Date(),
			formattedAmount: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: calculation.fromCurrency,
			}).format(amount),
			formattedResult: new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: calculation.toCurrency,
			}).format(result),
		};

		setHistory([...history, calculationWithDetails]);
	};

	const fetchExchangeRates = async (
		fromCurrency: string,
		toCurrency: string,
	) => {
		try {
			const dataFrom = await getExchangeRates(fromCurrency);
			const dataTo = await getExchangeRates(toCurrency);

			if (dataFrom && dataTo) {
				setRates({ ...rates, ...dataFrom, ...dataTo });
				return { dataFrom, dataTo };
			} else {
				showToast(`Moeda não encontrada.`);
				return null;
			}
		} catch (error) {
			console.error("Error fetching exchange rates:", error);
			return null;
		}
	};

	const showToast = (message: string) => {
		toast.error(message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	return (
		<ExchangeContext.Provider
			value={{
				rates,
				coins,
				history,
				addCalculation,
				getExchangeRates,
				fetchExchangeRates,
				showToast,
			}}>
			{children}
		</ExchangeContext.Provider>
	);
};

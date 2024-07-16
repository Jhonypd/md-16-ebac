/** @format */

import React, { useContext, useState } from "react";
import { ExchangeContext } from "./ExchangeContext";

const Calculator = () => {
	const { rates, addCalculation } = useContext(ExchangeContext);
	const [amount, setAmount] = useState(0);
	const [fromCurrency, setFromCurrency] = useState("USD");
	const [toCurrency, setToCurrency] = useState("GBP");
	const [result, setResult] = useState(null);

	const convert = () => {
		if (rates[toCurrency] && rates[fromCurrency]) {
			const convertedAmount =
				(amount / rates[fromCurrency]) * rates[toCurrency];
			setResult(convertedAmount);
			addCalculation({
				amount,
				fromCurrency,
				toCurrency,
				result: convertedAmount,
			});
		}
	};

	return (
		<div>
			<h2>Calculadora de Conversão Monetária</h2>
			<input
				type="number"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
				placeholder="Montante"
			/>
			<select
				value={fromCurrency}
				onChange={(e) => setFromCurrency(e.target.value)}>
				{Object.keys(rates).map((currency) => (
					<option key={currency} value={currency}>
						{currency}
					</option>
				))}
			</select>
			<select
				value={toCurrency}
				onChange={(e) => setToCurrency(e.target.value)}>
				{Object.keys(rates).map((currency) => (
					<option key={currency} value={currency}>
						{currency}
					</option>
				))}
			</select>
			<button onClick={convert}>Converter</button>
			{result && <p>Resultado: {result}</p>}
		</div>
	);
};

export default Calculator;

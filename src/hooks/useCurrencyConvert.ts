import { useState, useContext } from "react";
import { ExchangeContext } from "../context/ExchangeContext";

const useCurrencyConverter = (convert?: (amount: string, fromCurrency: string, toCurrency: string) => Promise<number>) => {
	// Usa a função convert fornecida, se disponível, ou a função do contexto
	const context = useContext(ExchangeContext);
	const actualConvert = convert || context?.convert;

	if (!actualConvert)
		throw new Error("ExchangeContext must be used within an ExchangeProvider");

	const [amount, setAmount] = useState<string>("");
	const [fromCurrency, setFromCurrency] = useState<string>("");
	const [toCurrency, setToCurrency] = useState<string>("");
	const [validConversion, setValidConversion] = useState<boolean>(false);
	const [result, setResult] = useState<number | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setAmount(value);
		const amountNumber = parseFloat(value);
		setValidConversion(!isNaN(amountNumber) && amountNumber >= 0);
	};

	const handleConvert = async () => {
		if (!actualConvert) return;
		try {
			const total = await actualConvert(amount, fromCurrency, toCurrency);
			if (total !== null) {
				setResult(total);
			}
		} catch (error) {
			setResult(null);
		}
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return {
		amount,
		fromCurrency,
		toCurrency,
		validConversion,
		result,
		isModalOpen,
		setFromCurrency,
		setToCurrency,
		handleAmountChange,
		handleConvert,
		openModal,
		closeModal,
		setAmount,
	};
};

export default useCurrencyConverter;

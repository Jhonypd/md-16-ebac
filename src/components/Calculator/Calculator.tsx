
import React, { useContext, useState } from "react";
import { ExchangeContext, Calculation } from "../../context/ExchangeContext";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";

const Calculator: React.FC = () => {
  const exchangeContext = useContext(ExchangeContext);
  if (!exchangeContext)
    throw new Error("ExchangeContext must be used within an ExchangeProvider");

  const { coins, addCalculation, fetchExchangeRates } = exchangeContext;
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [isBuying, setIsBuying] = useState<boolean>(true);
  const [validConversion, setValidConversion] = useState<boolean>(false);
  const [result, setResult] = useState<number | null>(null);

  const convert = async () => {
	try {
	  const rates = await fetchExchangeRates(fromCurrency, toCurrency);
	  if (!rates) return;
  
	  const fromValue = parseFloat(rates.dataFrom.ask);
	  const toValue = parseFloat(rates.dataTo.bid);
  
	  const exchangeRate = isBuying
		? (Number(amount) / fromValue) * toValue
		: (Number(amount) / toValue) * fromValue;
  
	  setResult(exchangeRate);
  
	  const type: "Compra" | "Venda" = isBuying ? "Compra" : "Venda";
  
	  const calculation: Calculation = {
		amount,
		fromCurrency,
		toCurrency,
		result: exchangeRate,
		type,
		fromValue,
		toValue,
		date: new Date(),
		formattedAmount: new Intl.NumberFormat('pt-BR', {
		  style: 'currency',
		  currency: fromCurrency
		}).format(parseFloat(amount)),
		formattedResult: new Intl.NumberFormat('pt-BR', {
		  style: 'currency',
		  currency: toCurrency
		}).format(exchangeRate)
	  };
  
	  addCalculation(calculation);
	} catch (error) {
	  console.error("Error fetching exchange rates:", error);
	}
  };
  
  

  const currencyOptions = Object.keys(coins).map((currency) => ({
    value: currency,
    label: `${currency} - ${coins[currency as keyof typeof coins]}`,
  }));

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const amountNumber = parseFloat(value);
    setValidConversion(!isNaN(amountNumber) && amountNumber >= 0);
  };

  return (
    <Container className="flex flex-col gap-3 items-center md:mt-8">
      <h2 className="text-xl text-slate-800 font-bold">Conversão Monetária</h2>
      <Input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Montante"
      />
      <Select
        options={currencyOptions}
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      />
      <Select
        options={currencyOptions}
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={isBuying}
            onChange={(e) => setIsBuying(e.target.checked)}
          />
          Compra
        </label>
      </div>
      <Button
        onClick={convert}
        className={`uppercase ${
          validConversion ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={!validConversion}
      >
        Converter
      </Button>
      {result !== null && (
        <p>
          Resultado:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: toCurrency,
          }).format(result)}
        </p>
      )}
    </Container>
  );
};

export default Calculator;

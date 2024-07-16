/** @format */

import React, { useContext } from "react";
import { ExchangeContext } from "./ExchangeContext";

const History = () => {
	const { history } = useContext(ExchangeContext);

	return (
		<div>
			<h2>Histórico de Cálculos</h2>
			<ul>
				{history.map((calc, index) => (
					<li key={index}>
						{calc.amount} {calc.fromCurrency} para {calc.toCurrency} ={" "}
						{calc.result}
					</li>
				))}
			</ul>
		</div>
	);
};

export default History;

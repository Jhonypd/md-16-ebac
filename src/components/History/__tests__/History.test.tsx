/** @format */

import { render,  screen } from "@testing-library/react";
import History from "../History";
import { ExchangeProvider, ExchangeContext } from "../../../context/ExchangeContext";
import { Calculation } from "../../../context/ExchangeContext";

const mockHistory: Calculation[] = [
	{
		amount: "100",
		fromCurrency: "USD",
		toCurrency: "EUR",
		ask: 1.1,
		total: 85,
		date: new Date(),
		formattedAmount: "R$ 100,00",
		formattedTotal: "€ 85,00",
	},
];

describe("History Component", () => {
	const MockExchangeProvider = ({ children }: { children: React.ReactNode }) => {
		return (
			<ExchangeProvider>
				<ExchangeContext.Provider
					value={{
						coins: {},
						combinations: {},
						history: mockHistory,
						addCalculation: jest.fn(),
						convert: async () => 0,
						showToastError: jest.fn(),
						showToastSuccess: jest.fn(),
					}}>
					{children}
				</ExchangeContext.Provider>
			</ExchangeProvider>
		);
	};

	it("deve exibir histórico corretamente", () => {
		render(
			<MockExchangeProvider>
				<History />
			</MockExchangeProvider>,
		);

		expect(screen.getByText("Histórico")).toBeInTheDocument();
		const tableBody = screen.getByRole("table").querySelector("tbody");
		expect(tableBody).toHaveTextContent(/23\/07\/2024/i);
		expect(tableBody).toHaveTextContent(/USD/i);
		expect(tableBody).toHaveTextContent(/EUR/i);
		expect(tableBody).toHaveTextContent(/R\$ 100,00/i);
		expect(tableBody).toHaveTextContent(/1.1/i);
		expect(tableBody).toHaveTextContent(/€ 85,00/i);
	});

	it("deve exibir mensagem 'Sem histórico' quando não houver histórico", () => {
		render(
			<MockExchangeProvider>
				<ExchangeContext.Provider
					value={{
						coins: {},
						combinations: {},
						history: [],
						addCalculation: jest.fn(),
						convert: async () => 0,
						showToastError: jest.fn(),
						showToastSuccess: jest.fn(),
					}}>
					<History />
				</ExchangeContext.Provider>
			</MockExchangeProvider>,
		);

		const tableBody = screen.getByRole("table").querySelector("tbody");
		expect(tableBody).toHaveTextContent(/Sem histórico/i);
	});
});

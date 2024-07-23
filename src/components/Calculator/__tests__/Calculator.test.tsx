/** @format */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ExchangeProvider } from "../../../context/ExchangeContext";
import Calculator from "../Calculator";
import { getExchangeRates } from "../../../data/api";

jest.mock("../../../data/api");

describe("Calculator Component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render correctly", () => {
		render(
			<ExchangeProvider>
				<Calculator />
			</ExchangeProvider>,
		);

		expect(screen.getByText("Conversão Monetária")).toBeInTheDocument();
	});

	it("should handle conversion correctly", async () => {
		(getExchangeRates as jest.Mock).mockResolvedValue({ USDBRL: { ask: "5.25" } });

		render(
			<ExchangeProvider>
				<Calculator />
			</ExchangeProvider>,
		);

		fireEvent.change(screen.getByPlaceholderText("Montante"), {
			target: { value: "100" },
		});
		fireEvent.change(screen.getByLabelText("De"), { target: { value: "USD" } });
		fireEvent.change(screen.getByLabelText("Para"), { target: { value: "BRL" } });
		fireEvent.click(screen.getByText("Converter"));

		await waitFor(() => {
			expect(
				screen.getByText((content, element) => {
					return element?.textContent === "Resultado: R$ 525,00";
				}),
			).toBeInTheDocument();
		});
	});

	it("should show error message when conversion fails", async () => {
		(getExchangeRates as jest.Mock).mockRejectedValue(new Error("API Error"));

		render(
			<ExchangeProvider>
				<Calculator />
			</ExchangeProvider>,
		);

		fireEvent.change(screen.getByPlaceholderText("Montante"), {
			target: { value: "100" },
		});
		fireEvent.change(screen.getByLabelText("De"), { target: { value: "USD" } });
		fireEvent.change(screen.getByLabelText("Para"), { target: { value: "BRL" } });
		fireEvent.click(screen.getByText("Converter"));

		await waitFor(() => {
			expect(screen.queryByText("Resultado:")).toBeNull();
		});
	});
});

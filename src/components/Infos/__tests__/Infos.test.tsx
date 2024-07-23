/** @format */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Infos from "../Infos"; 

describe("Infos Component", () => {
	const mockOnClose = jest.fn();
	const mockLists = [
		{ value: "1", label: "USD to BRL" },
		{ value: "2", label: "EUR to USD" },
		{ value: "3", label: "GBP to JPY" },
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("deve renderizar corretamente", () => {
		render(<Infos lists={mockLists} onClose={mockOnClose} />);

		expect(screen.getByText("Combinações Disponíveis")).toBeInTheDocument();
		expect(screen.getByText("USD to BRL")).toBeInTheDocument();
		expect(screen.getByText("EUR to USD")).toBeInTheDocument();
		expect(screen.getByText("GBP to JPY")).toBeInTheDocument();
	});

	it("deve chamar onClose quando o botão de fechar é clicado", () => {
		render(<Infos lists={mockLists} onClose={mockOnClose} />);

		const closeButton = screen.getByRole("button");
		fireEvent.click(closeButton);

		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("deve exibir todas as combinações disponíveis na lista", () => {
		render(<Infos lists={mockLists} onClose={mockOnClose} />);

		mockLists.forEach((item) => {
			expect(screen.getByText(item.label)).toBeInTheDocument();
		});
	});
});

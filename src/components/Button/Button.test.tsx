/** @format */

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

it("deve corresponder ao snapshot padrão", () => {
	const { asFragment } = render(<Button>Default Button</Button>);
	expect(asFragment()).toMatchSnapshot();
});

it('deve corresponder ao snapshot com variante "destructive"', () => {
	const { asFragment } = render(
		<Button variant="destructive">Destructive Button</Button>,
	);
	expect(asFragment()).toMatchSnapshot();
});

it('deve corresponder ao snapshot com variante "outline"', () => {
	const { asFragment } = render(
		<Button variant="outline">Outline Button</Button>,
	);
	expect(asFragment()).toMatchSnapshot();
});

it('deve corresponder ao snapshot com variante "dark"', () => {
	const { asFragment } = render(<Button variant="dark">Dark Button</Button>);
	expect(asFragment()).toMatchSnapshot();
});

it("deve renderizar corretamente com o texto dado", () => {
	render(<Button>Test Button</Button>);
	expect(screen.getByText("Test Button")).toBeInTheDocument();
});

it("deve aplicar a classe correta baseada na variante", () => {
	const { rerender } = render(<Button variant="default">Default</Button>);
	expect(screen.getByText("Default")).toHaveClass("bg-red-500 text-white");

	rerender(<Button variant="destructive">Destructive</Button>);
	expect(screen.getByText("Destructive")).toHaveClass("bg-red-700 text-white");

	rerender(<Button variant="outline">Outline</Button>);
	expect(screen.getByText("Outline")).toHaveClass(
		"bg-transparent text-red-500 border border-red-500",
	);

	rerender(<Button variant="dark">Dark</Button>);
	expect(screen.getByText("Dark")).toHaveClass("bg-gray-800 text-white");
});

it("deve adicionar classes personalizadas corretamente", () => {
	render(<Button className="custom-class">Custom Class</Button>);
	expect(screen.getByText("Custom Class")).toHaveClass("custom-class");
});

it("deve chamar a função de clique quando clicado", () => {
	const handleClick = jest.fn();
	render(<Button onClick={handleClick}>Click Me</Button>);
	fireEvent.click(screen.getByText("Click Me"));
	expect(handleClick).toHaveBeenCalledTimes(1);
});

/** @format */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TimerItem from "./TimerItem";

test("deve corresponder ao snapshot", () => {
	const { asFragment } = render(<TimerItem timer={10} timerUni="s" />);
	expect(asFragment()).toMatchSnapshot();
});

test("deve renderizar o timer e a unidade quando props válidas são fornecidas", () => {
	render(<TimerItem timer={10} timerUni="seconds" />);
	expect(screen.getByText("10")).toBeInTheDocument();
	expect(screen.getByText("seconds")).toBeInTheDocument();
});

test("não deve renderizar o timer quando a prop timer é nula", () => {
	render(<TimerItem timer={null} timerUni="seconds" />);
	expect(screen.queryByText("10")).not.toBeInTheDocument();
	expect(screen.getByText("seconds")).toBeInTheDocument();
});

test("não deve renderizar a unidade quando a prop timerUni é vazia", () => {
	render(<TimerItem timer={10} timerUni="" />);
	expect(screen.getByText("10")).toBeInTheDocument();
	expect(screen.queryByText("No Unit")).not.toBeInTheDocument();
});

test("não deve renderizar o timer nem a unidade quando ambas as props são nulas", () => {
	render(<TimerItem timer={null} timerUni="" />);
	expect(screen.queryByText("10")).not.toBeInTheDocument();
	expect(screen.queryByText("seconds")).not.toBeInTheDocument();
});

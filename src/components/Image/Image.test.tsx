
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Image from "./Image";

it("deve corresponder ao snapshot", () => {
	const { asFragment } = render(<Image src="image.jpg" alt="Test Image" />);
	expect(asFragment()).toMatchSnapshot();
});

it("deve renderizar a imagem corretamente", () => {
	render(<Image src="image.jpg" alt="Test Image" />);
	const img = screen.getByAltText("Test Image");
	expect(img).toBeInTheDocument();
	expect(img).toHaveAttribute("src", "image.jpg");
});

it("deve renderizar a imagem, mas sem o src se src estiver ausente", () => {
	render(<Image alt="Test Image" />);
	const img = screen.getByAltText("Test Image");
	expect(img).toBeInTheDocument();
	expect(img).not.toHaveAttribute("src");
});

it("deve renderizar a imagem, mas sem alt se alt estiver ausente", () => {
	render(<Image src="image.jpg" />);
	const img = screen.getByRole("img");
	expect(img).toBeInTheDocument();
	expect(img).toHaveAttribute("src", "image.jpg");
	expect(img).not.toHaveAttribute("alt");
});

it("deve aplicar a className corretamente", () => {
	render(<Image src="image.jpg" alt="Test Image" className="test-class" />);
	const img = screen.getByAltText("Test Image");
	expect(img).toHaveClass("test-class");
});

/** @format */

import { Container } from "react-bootstrap";
import NavStore from "./NavStore";

interface HeaderProps {
	cartItemsCount: number;
}

const Header = ({ cartItemsCount }: HeaderProps) => {
	return (
		<header
			id="hg_300"
			className="fixed py-3 top-0 left-0 w-full bg-transparent z-10 ">
			<Container fluid>
				<NavStore cartItemsCount={cartItemsCount} />
			</Container>
		</header>
	);
};

export default Header;

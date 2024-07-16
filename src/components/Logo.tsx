/** @format */
import "bootstrap/dist/css/bootstrap.min.css";
import { NavbarBrand } from "react-bootstrap";

const LogoContainer = () => {
	return (
		<NavbarBrand className="text-gray-950 font-bold">
			LV <span className="text-[#fe4c50]">Store</span>
		</NavbarBrand>
	);
};

export default LogoContainer;

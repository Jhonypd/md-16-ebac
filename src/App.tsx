/** @format */

import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BannerHome from "./components/Banner";
import DealOfWeek from "./components/DealOfWeek";
import Products from "./components/Products";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";

interface ProductProps {
	id: number;
	title: string;
	image: string;
	price: number;
}

function App() {
	const [cartItems, setCartItems] = useState<ProductProps[]>([]);

	const addToCart = (product: ProductProps) => {
		setCartItems([...cartItems, product]);
	};
	return (
		<div className="App">
			<Header cartItemsCount={cartItems.length} />
			<BannerHome />
			<DealOfWeek addToCart={addToCart} />
			<Products addToCart={addToCart} />
			<Benefits />
			<Footer />
		</div>
	);
}

export default App;

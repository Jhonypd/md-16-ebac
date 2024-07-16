/** @format */

import CardItem from "./CardItem";
import useProducts from "../hooks/useProducts";
import Container from "./Container/Container";

interface AddToCartProps {
	addToCart: (product: ProductProps) => void;
}

interface ProductProps {
	id: number;
	title: string;
	image: string;
	price: number;
}
const Products = ({ addToCart }: AddToCartProps) => {
	const { products } = useProducts();
	console.table(products);
	return (
		<Container className="mt-12" id="products">
			<div className="after mb-3">
				<h2 className="text-3xl uppercase font-semibold after">Destaques</h2>
			</div>

			<div className="flex gap-4 py-6 px-5 overflow-x-auto no-scrollbar">
				{products.map((product: ProductProps) => (
					<CardItem key={product.id} product={product} addToCart={addToCart} />
				))}
			</div>
		</Container>
	);
};

export default Products;

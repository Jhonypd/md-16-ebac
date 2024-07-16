/** @format */

import { Card } from "react-bootstrap";
import Image from "./Image/Image";
import Button from "./Button/Button";

interface ProductProps {
	id: number;
	title: string;
	image: string;
	price: number;
}

type ProductCardProps = Omit<ProductProps, 'id'>;

interface ParamsProps {
	addToCart: (product: ProductProps) => void;
	product: ProductCardProps; 
}

const CardItem = ({ product, addToCart }: ParamsProps) => {
	return (
		<div className="min-w-56 border flex flex-col items-center p-1 rounded-[5px]">
			<Image
				alt={product.title}
				src={product.image}
				className="min-h-48 max-h-52 object-contain p-1"
			/>
			<Card.Body>
				<Card.Title>{product.title}</Card.Title>
				<p>R$ {product.price}</p>
				<Button variant="dark" onClick={() => addToCart(product as ProductProps)}>
					Adicionar ao carrinho
				</Button>
			</Card.Body>
		</div>
	);
};

export default CardItem;

/** @format */

import { ReactNode, FC } from "react";

interface ContainerProps {
	children: ReactNode;
	className?: string;
	id?: string;
	"data-testid"?: string;
}

const Container: FC<ContainerProps> = ({
	children,
	id,
	className = "",
	"data-testid": dataTestId,
	...props
}) => {
	return (
		<div
			className={`container mx-auto px-4 ${className}`}
			id={id}
			data-testid={dataTestId}
			{...props}>
			{children}
		</div>
	);
};

export default Container;

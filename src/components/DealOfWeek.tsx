/** @format */

import TimerItem from "./TimerItem/TimerItem";
import { useState, useEffect } from "react";
import useDeals from "../hooks/useDeals";
import calculateTime from "../helper/calculateTime";
import Button from "./Button/Button";
import Container from "./Container/Container";
import Image from "./Image/Image";

interface ProductProps {
	id: number;
	title: string;
	image: string;
	price: number;
	startDate?: string;
	startTime?: string;
	endDate?: string;
	endTime?: string;
}

interface addToCartProps {
	addToCart: (product: ProductProps) => void;
}

type Nullable<T> = T | null;

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const DealOfWeek = ({ addToCart }: addToCartProps) => {
	const { weeklyDeals, error } = useDeals();
	const [timeLeft, setTimeLeft] = useState<Nullable<TimeLeft>>(null);
	const [isStarted, setIsStarted] = useState<boolean>(false);

	useEffect(() => {
		if (weeklyDeals && weeklyDeals.length > 0) {
			const oferta = weeklyDeals[0];
			const { startDate, startTime, endDate, endTime } = oferta;
			const startDateTime = `${startDate}T${startTime}`;
			const endDateTime = `${endDate}T${endTime}`;

			const { timeLeft, isStarted } = calculateTime({
				startDateTime,
				endDateTime,
			});
			setTimeLeft(timeLeft);
			setIsStarted(isStarted);

			const timer = setInterval(() => {
				const { timeLeft, isStarted } = calculateTime({
					startDateTime,
					endDateTime,
				});
				setTimeLeft(timeLeft);
				setIsStarted(isStarted);
			}, 1000);

			return () => clearInterval(timer);
		}
	}, [weeklyDeals]);

	if (error) {
		console.log("Error:", error);
	}

	if (!weeklyDeals || weeklyDeals.length === 0 || !isStarted) {
		console.log(
			"Oferta semanal não encontrada ou não iniciada ainda (isStarted é falso).",
		);
		return null;
	}

	const deal = weeklyDeals[0];

	return (
		<div className="w-full mt-10 bg-[#f2f2f2] relative" id="deal">
			<Container>
				<div className="row items-center">
					<div className="">
						<div className="h-[500px]">
							<Image src={deal.image} alt={deal.title} />
						</div>
					</div>
					<div className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-full">
						<div className="relative top-auto left-auto md:h-full h-auto items-center">
							<div className="inline-block text-center after">
								<h2 className="inline-block text-white md:text-slate-950 md:text-shadow-hidden text-shadow h2">
									Oferta da Semana
								</h2>
							</div>
							<ul className="flex items-center justify-between gap-4 mt-16">
								{timeLeft?.days !== undefined && timeLeft.days !== 0 && (
									<TimerItem timer={timeLeft.days} timerUni="Dias" />
								)}
								{timeLeft?.hours !== undefined && timeLeft.hours !== 0 && (
									<TimerItem timer={timeLeft.hours} timerUni="Horas" />
								)}
								{timeLeft?.minutes !== undefined && timeLeft.minutes !== 0 && (
									<TimerItem timer={timeLeft.minutes} timerUni="min" />
								)}
								{timeLeft?.seconds !== undefined && timeLeft.seconds !== 0 && (
									<TimerItem timer={timeLeft.seconds} timerUni="sec" />
								)}
							</ul>
							<Button
								onClick={() => addToCart(deal)}
								variant="dark"
								className="mt-12">
								Adicionar ao carrinho
							</Button>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default DealOfWeek;

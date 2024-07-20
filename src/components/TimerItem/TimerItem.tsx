/** @format */

interface TimersProps {
	timer: number | null;
	timerUni?: string;
}

const TimerItem = ({ timer, timerUni }: TimersProps) => {
	return (
		<li className="flex flex-col justify-center items-center h-20 w-20 md:w-28 md:h-28 rounded-[50%] bg-slate-950">
			{timer != null && (
				<div
					id="second"
					className="text-4xl md:text-5xl font-semibold mt-2 text-slate-400">
					{timer}
				</div>
			)}
			{timerUni && (
				<div className="text-[#b5aec8] mt-[2px] text-sm font-semibold md:mt-3 md:text-base">
					{timerUni}
				</div>
			)}
		</li>
	);
};

export default TimerItem;

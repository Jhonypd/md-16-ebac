/** @format */

interface BenefitItemProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => {
	return (
		<div className="mb-4 md:mb-8 md:border-r-2 md:border-white flex-[0 0 auto] w-full md:w-1/4">
			<div className="flex items-center h-24 bg-[#f3f3f3] pl-6">
				<div>{icon}</div>
				<div className="pl-5 text-start">
					<h6 className="uppercase text-sm font-medium md:text-xs">{title}</h6>
					<p className="text-xs text-[#b5aec8]">{description}</p>
				</div>
			</div>
		</div>
	);
};

export default BenefitItem;

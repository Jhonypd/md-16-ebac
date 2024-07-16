/** @format */

import { Container } from "react-bootstrap";

const BannerHome = () => {
	return (
		<Container>
			<div
				className="mt-24 h-[500px] md:h-[700px]"
				style={{
					backgroundImage: "url(/images/banner-bg.jpg)",
					width: "100%",
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				}}>
				<Container>
					<div className="row">
						<div className="col-md-12">
							<div className="glass p-8 max-w-md absolute right-0 top-40 text-start">
								<h2 className="mb-2 text-2xl font-bold text-slate-950">
									Venha ter experiências únicas
								</h2>
								<div className="w-24 h-1 bg-slate-950"></div>
								<p className="my-4">O visual perfeito para cada momento</p>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</Container>
	);
};

export default BannerHome;

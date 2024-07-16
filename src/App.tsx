/** @format */

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator/Calculator";
import History from "./components/Calculator/History";
import { ExchangeContext } from "./components/Calculator/ExchangeContext";

function App() {
	return (
		<ExchangeContext>
			<div className="App">
				<Header />
				<Calculator />
				<History />
				<Footer />
			</div>
		</ExchangeContext>
	);
}

export default App;

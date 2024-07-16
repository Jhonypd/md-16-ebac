/** @format */

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Calculator from "./components/Calculator/Calculator";
import History from "./components/Calculator/History";
import { ExchangeProvider } from "./components/Calculator/ExchangeContext";
import Container from "./components/Container/Container";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ExchangeProvider>
        <Header />
        <Container className="pt-24 h-screen">
          <Calculator />
          <History />
        </Container>
        <Footer />
      </ExchangeProvider>
    </div>
  );
}

export default App;

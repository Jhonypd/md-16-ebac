/** @format */

import BenefitItem from "./BenefitItem";
import { Container } from "react-bootstrap";
import { FaTruck, FaUndo, FaMoneyBill, FaRegClock } from "react-icons/fa";

const Benefits = () => {
  return (
    <div className="mt-28">
      <Container className="w-full">
        <div className="md:flex w-full justify-center items-center px-4">
          <BenefitItem
            icon={<FaTruck className="text-3xl text-[#fe4c50]" />}
            title="Frete Grátis"
            description="Entrega gratuita para todas as compras"
          />
          <BenefitItem
            icon={<FaUndo className="text-3xl text-[#fe4c50]" />}
            title="Devolução em 45 dias"
            description="Política de devolução em até 45 dias"
          />
          <BenefitItem
            icon={<FaMoneyBill className="text-3xl text-[#fe4c50]" />}
            title="Pagamento na Entrega"
            description="Pague no momento da entrega"
          />
          <BenefitItem
            icon={<FaRegClock className="text-3xl text-[#fe4c50]" />}
            title="Aberto Toda Semana"
            description="Das 8h às 21h, todos os dias"
          />
        </div>
      </Container>
    </div>
  );
};

export default Benefits;

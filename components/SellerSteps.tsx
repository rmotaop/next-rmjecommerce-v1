const SellerSteps = ({ current = 0 }) => {
  return (
    <ul className="mt-24 steps steps-vertical lg:steps-horizontal w-full">
      {[
        "usuário logado",
        "Complemento do contrato",
        "Método de pagamento",
        "Resumo do plano",
      ].map((step, index) => (
        <li
          key={step}
          className={`step
           ${index <= current ? "step-primary" : ""}
           `}
        >
          {step}
        </li>
      ))}
    </ul>
  );
};
export default SellerSteps;

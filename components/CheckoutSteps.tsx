const CheckoutSteps = ({ current = 0 }) => {
  return (
    <ul className="mt-24 steps steps-vertical lg:steps-horizontal w-full">
      {[
        "Usuário Logado",
        "Endereço de entrega",
        "Método de Pagamento",
        "Finalizar pedido",
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
export default CheckoutSteps;

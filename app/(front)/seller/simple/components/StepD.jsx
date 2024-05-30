import Link from "next/link";

const StepD = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleSubmitFormData,
}) => {
  return (
    <div>
      <h1 className="mt-2 text-xl font-bold text-blue-900">
        Passo Final: Confirmar dados, contrato e registrar no ecommerce
      </h1>
      <DataConfirmRow label="name:" value={formData.name} />
      <DataConfirmRow label="Last Name:" value={formData.email} />
      <DataConfirmRow label="Business Name:" value={formData.businessName} />
      <DataConfirmRow label="Business City:" value={formData.businessCity} />
      <DataConfirmRow
        label="Business Website:"
        value={formData.businessWebsite}
      />
      <DataConfirmRow label="Business Email:" value={formData.email} />
      <DataConfirmRow
        label="Income Per Month:"
        value={formData.incomePerMonth}
      />
      <DataConfirmRow label="Tax Percantage:" value={formData.taxPercantage} />

      <div className="my-4 flex items-center">
        <input
          type="checkbox"
          name="agreeToTerms"
          id="agreeToTerms"
          value={formData.agreeToTerms}
          onChange={(e) => handleChangeInput(e)}
          className="w-4 h-4 mr-2 accent-pink-300 focus:accent-pink-500"
        />
        <label htmlFor="agreeToTerms">
          Eu concordo com os{" "}
          <Link className="link" href={`/seller/terms`}>
            Termos de Serviços.
          </Link>
        </label>
      </div>

      <div className="my-2 flex justify-between items-center">
        <button
          className="bg-yellow-400 px-4 py-2 rounded-xl"
          onClick={handlePrevStep}
        >
          Voltar
        </button>
        <button
          className="bg-blue-400 px-4 py-2 rounded-xl"
          onClick={handleSubmitFormData}
        >
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default StepD;

// A Seperate component to show data
const DataConfirmRow = ({ label, value }) => {
  return (
    <div className="my-3 border border-solid border-gray-200 p-1 rounded-md">
      <span className="mr-4 text-slate-500">{label}</span>
      <span className="mr-4 text-slate-900">{value}</span>
    </div>
  );
};

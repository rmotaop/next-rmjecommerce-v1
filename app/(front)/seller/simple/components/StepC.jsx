const StepC = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div>
      <h1 className="mt-2 text-xl font-bold text-blue-900">
        Passo C: Informações do contrato
      </h1>

      <div className="my-2">
        <label className="mt-1 text-black">Contrato por mês</label>
        <input
          type="number"
          name="incomePerMonth"
          value={formData.incomePerMonth}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label className="mt-1 text-black">Contrato anual</label>
        <input
          type="number"
          name="incomePerMonth"
          value={formData.incomePerMonth}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label className="mt-1 text-black">
          Escolha o plano mensal adequado para você
        </label>
        <select
          name="incomePerMonth"
          value={formData.incomePerMonth}
          placeholder="Escolha o plano"
          onChange={(e) => handleChangeInput(e)}
          className="select w-full border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        >
          <option disabled selected></option>

          <option value="20">
            <span>R$20 - </span>
            Bronze
          </option>
          <option value="30">
            <span>R$30 - </span>
            Prata
          </option>
          <option value="40">
            <span>R$40 - </span>
            Ouro
          </option>
          <option value="50">
            <span>R$50 - </span>
            Diamante
          </option>
          <option value="60">
            <span>R$60 - </span>
            Platinun
          </option>
        </select>
      </div>
      <div className="my-2">
        <label className="mt-1 text-black">
          Prefere o plano anual com desconto para você
        </label>
        <select
          name="incomePerYear"
          value={formData.incomePerYear}
          placeholder="Escolha o plano"
          onChange={(e) => handleChangeInput(e)}
          className="select w-full border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        >
          <option disabled selected></option>

          <option value="200">
            <span>R$200 - </span>
            Bronze
          </option>
          <option value="300">
            <span>R$300 - </span>
            Prata
          </option>
          <option value="400">
            <span>R$400 - </span>
            Ouro
          </option>
          <option value="500">
            <span>R$500 - </span>
            Diamante
          </option>
          <option value="600">
            <span>R$600 - </span>
            Platinun
          </option>
        </select>
      </div>

      <div className="my-2 flex justify-between items-center">
        <button
          className="bg-yellow-400 px-4 py-2 text-black rounded-md"
          onClick={handlePrevStep}
        >
          Voltar
        </button>
        <button
          className="bg-blue-700 px-4 py-2 text-black rounded-md"
          onClick={handleNextStep}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default StepC;

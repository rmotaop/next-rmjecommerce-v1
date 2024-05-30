const StepB = ({
  formData,
  handleChangeInput,
  handlePrevStep,
  handleNextStep,
}) => {
  return (
    <div>
      <h1 className="mt-2 text-xl font-bold text-blue-900">
        Passo 2 de 4: Informação do negócio.
      </h1>

      <div className="my-2">
        <label className="mt-1 text-black">Nome do estabecimento</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label className="mt-1 text-black">Cidade</label>
        <input
          type="text"
          name="businessCity"
          value={formData.businessCity}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label className="mt-1 text-black">Pais</label>
        <input
          type="text"
          name="businessWebsite"
          value={formData.businessWebsite}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label className="mt-1 text-black">Descrição do negócio</label>
        <input
          type="email"
          name="businessEmail"
          value={formData.businessEmail}
          onChange={(e) => handleChangeInput(e)}
          className="w-full outline-none border border-gray-400 px-2 py-1 rounded-lg focus:border-blue-600"
        />
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

export default StepB;

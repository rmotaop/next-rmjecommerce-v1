const StepA = ({ formData, handleChangeInput, handleNextStep }) => {
  return (
    <div>
      <h1 className="mt-2 text-xl font-bold text-blue-900">
        Passo 1 de 4: Informações do vendedor
      </h1>
      <div className="my-2">
        <label className="mt-1 text-black">Nome do vendedor</label>
        <input
          type="text"
          name="name"
          placeholder="aaaaa aaaaa "
          value={formData.name}
          onChange={(e) => handleChangeInput(e)}
          className="placeholder:italic placeholder:text-slate-700 w-1/2 outline-none border border-gray-400 px-2 py-1 rounded-md focus:border-blue-600"
        />
      </div>
      <div className="my-2">
        <label className="mt-1 text-black">e-mail</label>
        <input
          type="text"
          name="email"
          placeholder="aaaaa@aaaaa.com"
          value={formData.email}
          onChange={(e) => handleChangeInput(e)}
          className="placeholder:italic placeholder:text-slate-700 w-1/2 outline-none border border-gray-400 px-2 py-1 rounded-md focus:border-blue-600"
        />
      </div>
      <div className="my-2 flex justify-end items-center">
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

export default StepA;

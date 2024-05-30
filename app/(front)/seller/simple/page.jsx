import SimpleMultiStepForm from "./components/SimpleMultiStepForm";

const page = () => {
  return (
    <div className="mt-6 rounded-lg mx-4">
      <h1 className="text-center text-blue-400 text-2xl">
        Cadastro de vendedor
      </h1>
      <br />
      <br />
      <br />
      <SimpleMultiStepForm showStepNumber={true} />
    </div>
  );
};

export default page;

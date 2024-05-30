"use client";
import SellerSteps from "@/components/SellerSteps";
import useSellerService from "@/lib/hooks/useSellerStore";
import { SellerContract } from "@/lib/models/SellerModel";
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, ValidationRule, useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";

// type Inputs = {
//   cpf: string;
//   cnpj: string;
//   address: string;
//   phone: string;
//   bronze: string;
//   contract: string;
//   complement: string;
//   diamante: string;
//   logo: string;
//   storename: string;
//   description: string;
//   termo: string;
// };

const Form = () => {
  const router = useRouter();
  // const { data: session } = useSession();
  const { saveSellerContract, sellerContract } = useSellerService();

  // const params = useSearchParams();
  // let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SellerContract>({
    defaultValues: {
      cpf: "",
      cnpj: "",
      address: "",
      phone: "",
      complement: "",
      contract: "",
      diamante: "",
      logo: "",
      storename: "",
      description: "",
      termo: "",
    },
  });
  useEffect(() => {
    setValue("cpf", sellerContract.cpf);
    setValue("cnpj", sellerContract.cnpj);
    setValue("address", sellerContract.address);
    setValue("phone", sellerContract.phone);
    setValue("complement", sellerContract.complement);
    setValue("contract", sellerContract.contract);
    setValue("storename", sellerContract.storename);
    setValue("description", sellerContract.description);
    setValue("termo", sellerContract.termo);
  }, [setValue, sellerContract]);

  const formSubmit: SubmitHandler<SellerContract> = async (form) => {
    saveSellerContract(form);
    router.push("/seller-payment");
  };

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof SellerContract;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="mb-2">
      <label className="label" htmlFor={id}>
        {name}
      </label>
      <input
        type="text"
        id={id}
        {...register(id, {
          required: required && `${name} deve ser informado.`,
          pattern,
        })}
        className="input input-bordered w-full max-w-sm"
      />
      {errors[id]?.message && (
        <div className="text-error">{errors[id]?.message}</div>
      )}
    </div>
  );

  //   try {
  //     const res = await fetch("/api/auth/seller", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name,
  //         cpf,
  //         cnpj,
  //         phone,
  //         bronze,
  //         diamante,
  //         contract,
  //         complement,
  //         logo,
  //         storename,
  //         address,
  //         description,
  //         termo,
  //       }),
  //     });
  //     if (res.ok) {
  //       return router.push(`/seller-payment`);
  //     } else {
  //       const data = await res.json();
  //       throw new Error(data.message);
  //     }
  //   } catch (err: any) {
  //     const error =
  //       err.message && err.message.indexOf("E11000") === 0
  //         ? "cpf / cnpj - está duplicado verifique"
  //         : err.message;
  //     toast.error(error || "error");
  //   }
  // };

  const [document, setDocument] = useState("");
  const [contract, setContract] = useState("");

  const onOptionChange = (e: { target: { value: SetStateAction<string> } }) => {
    setDocument(e.target.value);
  };
  const onContractChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setContract(e.target.value);
  };

  return (
    <div>
      <SellerSteps current={1} />
      <div className="w-1/2 mx-auto card bg-base-300 mt-4">
        <div className="card-body">
          <h1 className="text-center text-lg">
            Informações de cadastro do vendedor
          </h1>

          <form onSubmit={handleSubmit(formSubmit)}>
            {/* radio cpf/cnpj */}
            <div className="grid-col-1">
              <div className="pt-1 flex flex-row">
                <input
                  className="w-5 "
                  type="radio"
                  value="cpf"
                  name="document"
                  // checked={document === "cpf"}
                  id="cpf"
                  onChange={onOptionChange}
                />
                <label className="label mr-1" htmlFor="cpf">
                  Pessoa Física
                </label>
                <span className="mx-5 pt-2"> / </span>
                <input
                  className="w-5"
                  type="radio"
                  value="cnpj"
                  name="document"
                  // checked={document === "cnpj"}
                  id="cnpj"
                  onChange={onOptionChange}
                />
                <label className="label" htmlFor="cnpj">
                  Pessoa Jurídica
                </label>
              </div>
            </div>
            <h6 className="bg-yellow-400 p-2 rounded text-black font-bold font-basic">
              Dados básicos
            </h6>

            {/* radio cpf */}
            <div className="pt-1 inline-grid grid-cols-2 gap-4">
              {document === "cpf" ? (
                <div
                // className="placeholder:italic placeholder:text-slate-700 input input-bordered lg:w-60 sm:w-16 md:w-32"
                >
                  <label className="label" htmlFor="cpf">
                    Doc do vendedor
                  </label>
                  <input
                    type="text"
                    id="cpf"
                    placeholder="000.000"
                    {...register("cpf", {})}
                    className="placeholder:italic placeholder:text-slate-700 input input-bordered font-basic lg:w-60 sm:w-16 md:w-32 md:text-xs"
                  />
                  {errors.cpf?.message && (
                    <div className="text-error">{errors.cpf.message}</div>
                  )}
                </div>
              ) : (
                <div>
                  <label className="label" htmlFor="cnpj">
                    Doc da empresa
                  </label>
                  <input
                    type="text"
                    id="cnpj"
                    placeholder="00.000.000"
                    {...register("cnpj", {})}
                    className="placeholder:italic placeholder:text-slate-700 input input-bordered font-basic lg:w-60 sm:w-16 md:w-32 md:text-xs"
                  />
                  {errors.cnpj?.message && (
                    <div className="text-error"> {errors.cnpj.message}</div>
                  )}
                </div>
              )}
              <div>
                <label className="label" htmlFor="phone">
                  Telefone contato
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="00-0000-0000"
                  {...register("phone", {})}
                  // {...register("name", {
                  //   required: "O nome é obrigatório",
                  // })}
                  className="placeholder:italic placeholder:text-slate-700 input input-bordered lg:w-60 sm:w-16 md:w-32 md:text-xs"
                />
                {errors.phone?.message && (
                  <div className="text-error">{errors.phone.message}</div>
                )}
              </div>
            </div>
            {/* logotipo */}
            <div className="pt-1 inline-grid grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="logo">
                  Logotipo
                </label>
                <input
                  type="text"
                  id="logo"
                  {...register("logo", {})}
                  // {...register("cnpj", {
                  //   required: "O email é obrigatório",
                  //   pattern: {
                  //     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  //     message:
                  //       "Email aparentemente é inválido por favor verifique",
                  //   },
                  // })}
                  className="input input-bordered sm:w-15 md:w-32 lg:w-60"
                />
                {errors.logo?.message && (
                  <div className="text-error"> {errors.logo.message}</div>
                )}
              </div>
              <div>
                <label className="label" htmlFor="storename">
                  Nome da loja
                </label>
                <input
                  type="text"
                  id="storename"
                  {...register("storename", {})}
                  // {...register("name", {
                  //   required: "O nome é obrigatório",
                  // })}
                  className="input input-bordered lg:w-60 sm:w-16 sm:font-extralight md:w-32 md:font-extralight"
                />
                {errors.storename?.message && (
                  <div className="text-error">{errors.storename.message}</div>
                )}
              </div>
            </div>
            {/* endereço */}
            <div>
              <label className="label" htmlFor="address">
                Endereço do estabelecimento
              </label>
              <input
                type="text"
                id="address"
                {...register("address", {})}
                // {...register("cnpj", {
                //   required: "O email é obrigatório",
                //   pattern: {
                //     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                //     message:
                //       "Email aparentemente é inválido por favor verifique",
                //   },
                // })}
                className="input input-bordered lg:w-full sm:w-32 md:w-48"
              />
              {errors.address?.message && (
                <div className="text-error"> {errors.address.message}</div>
              )}
            </div>
            {/* descrição */}
            <div>
              <label className="label" htmlFor="description">
                Descrição da loja
              </label>
              <input
                type="text"
                id="description"
                {...register("description", {})}
                // {...register("cnpj", {
                //   required: "O email é obrigatório",
                //   pattern: {
                //     value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                //     message:
                //       "Email aparentemente é inválido por favor verifique",
                //   },
                // })}
                className="input input-bordered lg:w-full sm:w-32 md:w-48"
              />
              {errors.description?.message && (
                <div className="text-error"> {errors.description.message}</div>
              )}
            </div>

            <div className="divider"></div>

            <h6 className="bg-yellow-400 p-2 mb-2 rounded text-black font-bold font-basic">
              Contrato plano mensal
            </h6>
            <div className="grid grid-rows-4">
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="100"
                  id="contract"
                  name="contract"
                  onChange={(e) => setValue("contract", e.target.value)}
                />
                <label className="label mr-1" htmlFor="contract">
                  R$100 - Bronze - suporte limitado a 2 assistências.
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="300"
                  id="contract"
                  name="contract"
                  onChange={(e) => setValue("contract", e.target.value)}
                />
                <label className="label" htmlFor="contract">
                  R$300 - prata - suporte em vendas e ranking ate 5
                  assistências.
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="600"
                  id="contract"
                  name="contract"
                  onChange={(e) => setValue("contract", e.target.value)}
                />
                <label className="label" htmlFor="contract">
                  R$600 - ouro - suporte em marketing e vendas até 20
                  assistências.
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="1000"
                  id="contract"
                  name="contract"
                  onChange={(e) => setValue("contract", e.target.value)}
                />
                <label className="label" htmlFor="contract">
                  R$1000 - diamante - suporte completo em marketing e vendas.
                </label>
              </div>
            </div>

            <div className="divider"></div>

            <h6 className="bg-yellow-400 p-2 mb-2 rounded text-black font-bold font-basic">
              Complemento do contrato
            </h6>
            <div className="grid grid-rows-4">
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="100"
                  id="complement"
                  name="complement"
                  onChange={(e) => setValue("complement", e.target.value)}
                />
                <label className="label mr-1" htmlFor="complement">
                  R$100 - On line service - cadastro 10 produtos
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="1000"
                  id="complement"
                  name="complement"
                  onChange={(e) => setValue("complement", e.target.value)}
                />
                <label className="label" htmlFor="complement">
                  R$1000 - On line service - cadastro 100 produtos
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="9000"
                  id="complement"
                  name="complement"
                  onChange={(e) => setValue("complement", e.target.value)}
                />
                <label className="label" htmlFor="complement">
                  R$9000 - On line service - cadastro 1000 produtos
                </label>
              </div>
              <div className="flex flex-row">
                <input
                  className="w-6"
                  type="radio"
                  value="40000"
                  id="complement"
                  name="complement"
                  onChange={(e) => setValue("complement", e.target.value)}
                />
                <label className="label" htmlFor="complement">
                  R$40000 - On line service - cadastro 5000 produtos
                </label>
              </div>
            </div>
            <div className="divider"></div>
            <h6 className="bg-yellow-400 p-2 mb-2 rounded text-black font-bold font-basic">
              Aceite dos termos do contrato
            </h6>
            <div className="flex flex-row">
              <input
                className="w-6"
                type="radio"
                id="termo"
                onChange={(e) => setValue("termo", e.target.value)}
              />
              <label htmlFor="agreeToTerms">
                Eu concordo com os{" "}
                <Link className="link" href={`/terms`}>
                  Termos de Serviços.
                </Link>
              </label>
            </div>

            <div className="divider"></div>
            <div className="my-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-48"
              >
                {isSubmitting && (
                  <span className="loading loading-spinner"></span>
                )}
                Próximo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;

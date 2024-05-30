"use client";
import SellerSteps from "@/components/SellerSteps";
import useSellerService from "@/lib/hooks/useSellerStore";
import { SellerContract } from "@/lib/models/SellerModel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, ValidationRule, useForm } from "react-hook-form";

const Form = () => {
  const router = useRouter();
  const { saveSellerContract, sellerContract } = useSellerService();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SellerContract>({
    defaultValues: {
      logo: "",
      storename: "",
      description: "",
      address: "",
      phone: "",
      rating: 0,
      numReviews: 0,
      contract: "",
      complement: "",
      diamante: "",
    },
  });

  useEffect(() => {
    setValue("address", sellerContract.address);
    setValue("logo", sellerContract.logo);
    setValue("storename", sellerContract.storename);
    setValue("description", sellerContract.description);
    setValue("address", sellerContract.address);
    setValue("phone", sellerContract.phone);
    setValue("contract", sellerContract.contract);
    setValue("complement", sellerContract.complement);
  }, [setValue, sellerContract]);

  const formSubmit: SubmitHandler<SellerContract> = async (form) => {
    saveSellerContract(form);
    router.push("/payment");
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

  return (
    <div>
      <SellerSteps current={1} />
      <div className="max-w-sm mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h2 className="card-title">Dados do vendedor</h2>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name="Endereço" id="address" required />
            <FormInput name="Nome da Loja" id="storename" required />
            <FormInput name="Resumo da loja" id="description" required />
            <FormInput name="Telefone" id="phone" required />
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

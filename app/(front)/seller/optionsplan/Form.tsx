"use client";
import SellerSteps from "@/components/SellerSteps";
import useSellerService from "@/lib/hooks/useSellerStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Form = () => {
  const router = useRouter();
  const { savePaymentMethod, paymentMethod, sellerInfo } = useSellerService();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    savePaymentMethod(selectedPaymentMethod);
    router.push("/seller/sellerregister");
  };

  useEffect(() => {
    if (!sellerInfo) {
      return router.push("/personalinfo");
    }
    setSelectedPaymentMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, sellerInfo]);

  return (
    <div>
      <SellerSteps current={3} />
      <div className="w-1/2 mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h1 className="card-title">Complemento o seu plano</h1>

          <div className="grid grid-rows-4">
            <div className="flex flex-row">
              <input
                className="w-6"
                type="radio"
                name="plano"
                value="plano"
                id="plano"
              />
              <label className="label mr-1" htmlFor="sellerCpf">
                On line service - cadastro 10 produtos
              </label>
            </div>
            <div className="flex flex-row">
              <input
                className="w-6"
                type="radio"
                name="plano"
                value="plano"
                id="cnpj"
              />
              <label className="label" htmlFor="sellerCnpj">
                On line service - cadastro 100 produtos
              </label>
            </div>
            <div className="flex flex-row">
              <input
                className="w-6"
                type="radio"
                name="plano"
                value="plano"
                id="cnpj"
              />
              <label className="label font-medium" htmlFor="sellerCnpj">
                On line service - cadastro 1000 produtos
              </label>
            </div>
            <div className="flex flex-row">
              <input
                className="w-6"
                type="radio"
                name="plano"
                value="plano"
                id="cnpj"
              />
              <label className="label" htmlFor="sellerCnpj">
                On line service - cadastro 5000 produtos
              </label>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-medium text-white dark:text-white">
              How much do you expect to use each month?
            </h3>
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="hosting-small"
                  name="hosting"
                  value="hosting-small"
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor="hosting-small"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-amber-500 border border-amber-950 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">0-50 MB</div>
                    <div className="w-full">Bom para pequenos comerciantes</div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="hosting-big"
                  name="hosting"
                  value="hosting-big"
                  className="hidden peer"
                />
                <label
                  htmlFor="hosting-big"
                  className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-amber-500 border border-amber-950 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      500-1000 MB
                    </div>
                    <div className="w-full">Bom para grandes comerciantes</div>
                  </div>
                  <svg
                    className="w-5 h-5 ms-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </label>
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <span></span>
            {["Bronze", "Prata", "Ouro", "Diamante"].map((payment) => (
              <div key={payment}>
                <label className="label cursor-pointer">
                  <span className="label-text">{payment}</span>
                  <div className="divider"> </div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio"
                    value={payment}
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                  />
                </label>
              </div>
            ))}
            <div>
              <h6 className="my-4 ">
                <span className="text-amber-700">Bronze: </span> R$19{", "}
                <span className="text-stone-500">Prata: </span> R$29{", "}
                <span className="text-orange-400">Ouro: </span> R$39{", "}
                <span className="text-indigo-900">Diamante: </span> R$49{", "}
                Comlementos do plano.
              </h6>
            </div>
            <div className="grid grid-cols-1">
              <div className="flex flex-row ...">
                <div className=" ">
                  <button
                    type="submit"
                    className="btn btn-primary w-36 mr-4 h-14"
                  >
                    Próximo
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="btn w-36 h-14"
                    onClick={() => router.back()}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;

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
    router.push("/seller/optionsplan");
  };

  useEffect(() => {
    if (!sellerInfo) {
      return router.push("/sellerInfo");
    }
    setSelectedPaymentMethod(paymentMethod || "PayPal");
  }, [paymentMethod, router, sellerInfo]);

  return (
    <div>
      <SellerSteps current={2} />
      <div className="w-1/2 mx-auto card bg-base-300 my-4">
        <div className="card-body">
          <h1 className="card-title">Escolha o contrato</h1>
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
                planos mensais.
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

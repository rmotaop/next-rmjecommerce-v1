"use client";
import useSellerService from "@/lib/hooks/useSellerStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { formatPrice, round2 } from "@/lib/utils";

const Form = () => {
  const router = useRouter();
  const { sellerContract, paymentMethod } = useSellerService();

  var plano = sellerContract.contract;
  var complemento = sellerContract.complement;
  var taxPrice = round2(Number(0.15 * parseInt(plano)));
  var total = round2(
    Number(parseInt(plano) + parseInt(complemento) + taxPrice)
  );

  const { trigger: placeContract, isMutating: isPlacing } = useSWRMutation(
    `/api/sellers/mine`,
    async () => {
      const res = await fetch("/api/sellers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          sellerContract,
          // items,
          // itemsPrice,
          // taxPrice,
          // shippingPrice,
          // totalPrice,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // clear();
        toast.success("Contrato realizado com sucesso.");
        return router.push(`/seller/${data.seller._id}`);
      } else {
        toast.error(data.message);
      }
    }
  );
  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/seller-payment");
    }
    // if (items.length === 0) {
    //   return router.push("/");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div>
      <div className="grid md:grid-cols-4 md:gap-5 my-4">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Dados do lojista:</h2>
              <p>
                Doc: {sellerContract.cpf} - {sellerContract.cnpj}
              </p>
              <p>
                Endereço: {sellerContract.address} - Telefone:{" "}
                {sellerContract.phone}
              </p>
              <p>
                Logotipo: {sellerContract.logo} - Nome da Loja:{" "}
                {sellerContract.storename}
              </p>

              <div>
                <Link
                  className="btn hover:bg-amber-500 hover:text-black"
                  href="/sellerinfo"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Método de pagamento:</h2>
              <p>{paymentMethod}</p>
              <div>
                <Link
                  className="btn hover:bg-amber-500 hover:text-black"
                  href="/seller-payment"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Planos contratado(s):</h2>
              <p>Plano Mensal: {formatPrice(sellerContract.contract)}</p>
              <p>
                Complemento do plano: {formatPrice(sellerContract.complement)}
              </p>
              <div>
                <Link
                  className="btn hover:bg-amber-500 hover:text-black"
                  href="/sellerinfo"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Resumo do Contrato</h2>
              <ul className="space-y-3">
                <li>
                  <div className=" flex justify-between">
                    <div>Plano mensal:</div>
                    <div>{formatPrice(sellerContract.contract)}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Imposto devido:</div>
                    <div>{formatPrice(taxPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Complemento:</div>
                    <div>{formatPrice(sellerContract.complement)}</div>
                  </div>
                </li>
                <li>
                  <div className=" flex justify-between">
                    <div>Total:</div>
                    <div>{formatPrice(total)}</div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => placeContract()}
                    disabled={isPlacing}
                    className="btn btn-primary w-full"
                  >
                    {isPlacing && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Realizar contrato
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;

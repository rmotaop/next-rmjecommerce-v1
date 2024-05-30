"use client";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { OrderItem } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import moment from "moment";
import { formatPrice } from "@/lib/utils";
import "moment/locale/pt-br";

export default function OrderDetails({
  orderId,
  paypalClientId,
}: {
  orderId: string;
  paypalClientId: string;
}) {
  const { trigger: deliverOrder, isMutating: isDelivering } = useSWRMutation(
    `/api/orders/${orderId}`,
    async () => {
      const res = await fetch(`/api/admin/orders/${orderId}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Pedido enviado com sucesso")
        : toast.error(data.message);
    }
  );
  const { trigger: paidOrder, isMutating: isPaiding } = useSWRMutation(
    `/api/orders/${orderId}`,
    async () => {
      const res = await fetch(`/api/admin/orders/${orderId}/paid`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Pedido pago com sucesso")
        : toast.error(data.message);
    }
  );

  const { data: session } = useSession();

  async function createPayPalOrder() {
    const response = await fetch(`/api/orders/${orderId}/create-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    return order.id;
  }

  async function onApprovePayPalOrder(data: any) {
    const response = await fetch(
      `/api/orders/${orderId}/capture-paypal-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const orderData = await response.json();
    toast.success("Pedido pago com sucesso");
  }

  const { data, error } = useSWR(`/api/orders/${orderId}`);

  if (error) return error.message;
  if (!data) return "Carregando...";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  moment.locale("pt-br");

  return (
    <div>
      <div className="grid pt-14 md:grid-cols-4 md:gap-5 my-4">
        <div className="md:col-span-3">
          <div className="card bg-base-300">
            <div className="card-body">
              <h1 className="text-2xl bg-amber-400 p-1 text-black rounded">
                Pedido: {orderId}
              </h1>
              <h2 className="card-title">Endereço de envio</h2>
              <p>{shippingAddress.fullName}</p>
              <p>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}{" "}
              </p>
              {isDelivered ? (
                <div className="text-success">
                  Envio em: {moment(deliveredAt).format("DD/MM/yyyy")}
                </div>
              ) : (
                <div className="text-error">Não enviado</div>
              )}
              {isDelivered ? (
                <div className="text-success">
                  Código de rastreio: <span>IA</span>
                  {orderId.substring(1, 9)}
                  <span>BR</span>
                </div>
              ) : (
                <div className="text-error">
                  Em breve código de rastreamento
                </div>
              )}
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Método de pagamento</h2>
              <p>{paymentMethod}</p>
              {isPaid ? (
                <div className="text-success">
                  Pagamento em: {moment(paidAt).format("DD/MM/yyyy")}
                </div>
              ) : (
                <div className="text-error">Pagamento pendente</div>
              )}
            </div>
          </div>

          <div className="card bg-base-300 mt-4">
            <div className="card-body">
              <h2 className="card-title">Produto(s)</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: OrderItem) => (
                    <tr key={item.slug}>
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          <span className="px-2">
                            {item.name} ({item.color} {item.size})
                          </span>
                        </Link>
                      </td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="card bg-base-300">
            <div className="card-body">
              <h2 className="card-title">Total do pedido:</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Custo(s)</div>
                    <div>{formatPrice(itemsPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Imposto</div>
                    <div>{formatPrice(taxPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Frete</div>
                    <div>{formatPrice(shippingPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>{formatPrice(totalPrice)}</div>
                  </div>
                </li>

                {!isPaid && paymentMethod === "PayPal" && (
                  <li className="flex justify-around">
                    <div className="flex justify-around w-auto sm:w-16 md:w-32 lg:w-48">
                      <PayPalScriptProvider
                        options={{ clientId: paypalClientId }}
                      >
                        <PayPalButtons
                          createOrder={createPayPalOrder}
                          onApprove={onApprovePayPalOrder}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </li>
                )}

                {isPaid ? (
                  <div className="btn btn-primary w-full text-amber-950">
                    Pagamanto confirmado.
                  </div>
                ) : (
                  <>
                    {session?.user.name && (
                      <li>
                        <button
                          className="btn w-full my-2 hover:bg-green-800"
                          onClick={() => paidOrder()}
                          disabled={isPaiding}
                        >
                          {isPaiding && (
                            <span className="loading loading-spinner"></span>
                          )}
                          Simular Pagamento
                        </button>
                      </li>
                    )}
                  </>
                )}

                {isDelivered ? (
                  <div className="btn mt-2 btn-primary w-full text-amber-950">
                    Envio confirmado.
                  </div>
                ) : (
                  <>
                    {session?.user.isAdmin && (
                      <li>
                        <button
                          className="btn w-full my-2 hover:bg-green-900"
                          onClick={() => deliverOrder()}
                          disabled={isDelivering}
                        >
                          {isDelivering && (
                            <span className="loading loading-spinner"></span>
                          )}
                          Simular envio
                        </button>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

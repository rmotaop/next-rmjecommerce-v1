"use client";
import { Order } from "@/lib/models/OrderModel";
import Link from "next/link";
import useSWR from "swr";
import moment from "moment";
import "moment/locale/pt-br";
import { formatPrice } from "@/lib/utils";

export default function Orders() {
  const { data: orders, error } = useSWR(`/api/sellers/orders`);
  if (error) return "Ocorreu um erro inesperado.";
  if (!orders) return "Carregando...";

  moment.locale("pt-br");

  return (
    <div>
      <h1 className="py-4 text-2xl">Pedidos</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Usuário</th>
              <th>Data</th>
              <th>Total</th>
              <th>Pagamento</th>
              <th>Envio</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>..{order._id.substring(20, 24)}</td>
                <td>{order.user?.name || "Excluir usuário"}</td>
                <td>{moment(order.createdAt).format("DD/MM/yyyy")}</td>
                <td>{formatPrice(order.totalPrice)}</td>
                <td>
                  {order.isPaid && order.paidAt
                    ? `${moment(order.paidAt).format("DD/MM/yyyy")}`
                    : "pendente"}
                </td>
                <td>
                  {order.isDelivered && order.deliveredAt
                    ? `${moment(order.deliveredAt).format("DD/MM/yyyy")}`
                    : "Não enviado"}
                </td>
                <td>
                  <Link href={`/order/${order._id}`} passHref>
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

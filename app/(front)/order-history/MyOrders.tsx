"use client";

import { Order } from "@/lib/models/OrderModel";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import useSWR from "swr";
import "moment/locale/pt-br";

export default function MyOrders() {
  const router = useRouter();
  const { data: orders, error } = useSWR(`/api/orders/mine`);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error) return "Ocorreu um erro.";
  if (!orders) return "Carregando...";

  moment.locale("pt-br");

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{order._id.substring(20, 24)}</td>
              <td>{moment(order.createdAt).format("DD/MM/yyyy")}</td>
              <td>{formatPrice(order.totalPrice)}</td>
              <td>
                {order.isPaid && order.paidAt
                  ? `${moment(order.paidAt).format("DD/MM/yyyy")}`
                  : "Pendente"}
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
  );
}

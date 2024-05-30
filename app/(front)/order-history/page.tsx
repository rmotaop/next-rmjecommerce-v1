import { Metadata } from "next";
import MyOrders from "./MyOrders";

export const metadata: Metadata = {
  title: "Histórico de pedidos",
};
export default function OrderHistory() {
  return (
    <>
      <h1 className="mt-24 text-2xl py-2">Histórico pedidos</h1>
      <MyOrders />
    </>
  );
}

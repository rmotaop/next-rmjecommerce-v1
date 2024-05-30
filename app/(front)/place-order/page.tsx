import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Realizar pedido",
};

export default async function PlaceOrderPage() {
  return <Form />;
}

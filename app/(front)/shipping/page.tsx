import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Endereço de entrega",
};

export default async function ShippingPage() {
  return <Form />;
}

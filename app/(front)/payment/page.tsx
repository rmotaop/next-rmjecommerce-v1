import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Forma de pagamento",
};

export default async function PaymentPage() {
  return <Form />;
}

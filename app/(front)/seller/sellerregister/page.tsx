import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Informações da conta",
};

export default async function SellerRegister() {
  return <Form />;
}

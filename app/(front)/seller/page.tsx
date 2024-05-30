import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Seja Bem vindo vendedor",
};

export default async function SellerReg() {
  return <Form />;
}

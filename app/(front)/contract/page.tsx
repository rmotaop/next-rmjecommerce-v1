import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Dados do contrato",
};

export default async function ContractPage() {
  return <Form />;
}

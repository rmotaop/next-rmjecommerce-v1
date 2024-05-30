import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Contrato de vendedor",
};

export default async function PlaceContractPage() {
  return <Form />;
}

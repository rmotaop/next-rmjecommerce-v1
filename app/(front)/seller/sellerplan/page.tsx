import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Escolha o plano",
};

export default async function PlanPage() {
  return <Form />;
}

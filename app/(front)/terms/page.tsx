import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Termos e serviços",
};

export default async function TermsPage() {
  return <Form />;
}

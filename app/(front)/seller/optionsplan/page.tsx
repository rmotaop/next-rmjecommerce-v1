import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Complemente o plano",
};

export default async function OptionsPlan() {
  return <Form />;
}

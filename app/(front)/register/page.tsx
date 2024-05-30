import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Registrar",
};

export default async function Register() {
  return <Form />;
}

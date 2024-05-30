import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Entrar",
};

export default async function Signin() {
  return <Form />;
}

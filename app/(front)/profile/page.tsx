import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Meu Perfil",
};

export default async function Profile() {
  return <Form />;
}

import { Metadata } from "next";
import MyProducts from "./MyProducts";

export const metadata: Metadata = {
  title: "Meus produtos",
};
export default function ProductsHistory() {
  return (
    <>
      <h1 className="mt-24 text-2xl py-2">Histórico de produtos</h1>
      <MyProducts />
    </>
  );
}

"use client";

import { Product } from "@/lib/models/ProductModel";
import { formatId, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";
import useSWR from "swr";
import "moment/locale/pt-br";

export default function MyProducts() {
  const router = useRouter();
  const { data: products, error } = useSWR(`/api/products/mine`);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  if (error) return "Ocorreu um erro.";
  if (!products) return "Carregando...";

  moment.locale("pt-br");

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Em estoque</th>
            <th>Avaliação</th>
            <th>Ações:</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product._id}>
              <td>{formatId(product._id!)}</td>
              <td>{product.name}</td>
              <td>{formatPrice(product.price)}</td>
              <td>{product.category}</td>
              <td>{product.countInStock}</td>
              <td>{product.rating}</td>
              <td>
                <Link
                  href={`/seller/products/${product._id}`}
                  type="button"
                  className="btn btn-ghost btn-sm"
                >
                  Editar
                </Link>
                &nbsp;
                {/* <button
                    onClick={() => deleteProduct({ productId: product._id! })}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Excluir
                  </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

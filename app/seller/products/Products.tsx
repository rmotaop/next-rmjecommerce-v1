"use client";
import { Product } from "@/lib/models/ProductModel";
import { formatId, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function Products() {
  const { data: products, error } = useSWR(`/api/sellers/products`);

  const router = useRouter();

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/sellers/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading("Excluindo produto...");
      const res = await fetch(`${url}/${arg.productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Produto excluído com sucesso", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/sellers/products`,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Produto criado com sucesso");
      router.push(`/seller/products/${data.product._id}`);
    }
  );

  if (error) return "Ocorreu um erro.";
  if (!products) return "Carregando...";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="py-4 text-2xl">Produtos</h1>
        <button
          disabled={isCreating}
          onClick={() => createProduct()}
          className="btn btn-primary btn-sm"
        >
          {isCreating && <span className="loading loading-spinner"></span>}
          Cadastrar produto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
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
                  <button
                    onClick={() => deleteProduct({ productId: product._id! })}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

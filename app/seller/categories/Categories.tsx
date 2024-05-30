"use client";
import { Category } from "@/lib/models/CategoryModel";
import { formatId } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";

export default function Categories() {
  const { data: categories, error } = useSWR(`/api/sellers/categories`);

  const router = useRouter();

  const { data: session } = useSession();

  const { trigger: deleteCategory } = useSWRMutation(
    `/api/sellers/categories`,
    async (url, { arg }: { arg: { categoryId: string } }) => {
      const toastId = toast.loading("Excluindo categoria...");
      const res = await fetch(`${url}/${arg.categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Categoria excluída com sucesso", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );

  const { trigger: createCategory, isMutating: isCreating } = useSWRMutation(
    `/api/sellers/categories`,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Categoria criada com sucesso");
      router.push(`/seller/categories/${data.category._id}`);
    }
  );

  if (error) return "Ocorreu um erro.";
  if (!categories) return "Carregando...";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="py-4 text-2xl">Categorias</h1>
        <button
          disabled={isCreating}
          onClick={() => createCategory()}
          className="btn btn-primary btn-sm"
        >
          {isCreating && <span className="loading loading-spinner"></span>}
          Cadastrar categoria
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Acões:</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: Category) => (
              <tr key={category._id}>
                <td>{formatId(category._id)}</td>
                <td>{category.name}</td>
                <td>
                  <Link
                    href={`/seller/categories/${category._id}`}
                    type="button"
                    className="btn btn-ghost btn-sm"
                  >
                    Editar
                  </Link>
                  &nbsp;
                  {session!.user.isAdmin ? (
                    <button
                      onClick={() =>
                        deleteCategory({ categoryId: category._id })
                      }
                      type="button"
                      className="btn btn-ghost btn-sm "
                    >
                      Excluir
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        deleteCategory({ categoryId: category._id })
                      }
                      type="button"
                      className="btn btn-ghost btn-sm cursor-not-allowed"
                    >
                      Excluir
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

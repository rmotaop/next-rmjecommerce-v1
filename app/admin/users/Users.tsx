"use client";

import { User } from "@/lib/models/UserModel";
import { formatId } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useSession } from "next-auth/react";

export default function Users() {
  const { data: session } = useSession();
  const { data: users, error } = useSWR(`/api/admin/users`);
  const { trigger: deleteUser } = useSWRMutation(
    `/api/admin/users`,
    async (url, { arg }: { arg: { userId: string } }) => {
      const toastId = toast.loading("Excluindo usuário...");
      const res = await fetch(`${url}/${arg.userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success("Usuário excluído com sucesso", {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    }
  );
  if (error) return "Ocorreu um erro.";
  if (!users) return "Carregando...";

  return (
    <div>
      <h1 className="py-4 text-2xl">Usuários</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Administrador</th>
              <th>Proprietário</th>
              <th>Vendedor</th>
              <th>Acões:</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{formatId(user._id)}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Sim" : "Não"}</td>
                <td>{user.isOwner ? "Sim" : "Não"}</td>
                <td>{user.isSeller ? "Sim" : "Não"}</td>

                {session && session.user.isOwner ? (
                  <td>
                    <Link
                      href={`/admin/users/${user._id}`}
                      type="button"
                      className="btn btn-ghost btn-sm"
                    >
                      Editar
                    </Link>
                    &nbsp;
                    <button
                      onClick={() => deleteUser({ userId: user._id })}
                      type="button"
                      className="btn btn-ghost btn-sm"
                    >
                      Excluir
                    </button>
                  </td>
                ) : (
                  <td>Restrito</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

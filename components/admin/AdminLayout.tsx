import { auth } from "@/lib/auth";
import Link from "next/link";

const AdminLayout = async ({
  activeItem = "dashboard",
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session || !session.user.isAdmin) {
    return (
      <div className="relative flex flex-grow p-4">
        <div>
          <h1 className="text-2xl">Não autorizado</h1>
          <p>É necessária permissão de administrador.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 relative flex flex-grow">
      <div className="w-full grid md:grid-cols-5">
        <div className="bg-base-200">
          <ul className="menu">
            <li>
              <Link
                className={"dashboard" === activeItem ? "active" : ""}
                href="/admin/dashboard"
              >
                Painél Administrativo
              </Link>
            </li>
            <li>
              <Link
                className={"reviews" === activeItem ? "active" : ""}
                href="/admin/reviews"
              >
                Avaliações produtos
              </Link>
            </li>
            <li>
              <Link
                className={"categories" === activeItem ? "active" : ""}
                href="/admin/categories"
              >
                Categorias
              </Link>
            </li>
            <li>
              <Link
                className={"orders" === activeItem ? "active" : ""}
                href="/admin/orders"
              >
                Pedidos
              </Link>
            </li>
            <li>
              <Link
                className={"products" === activeItem ? "active" : ""}
                href="/admin/products"
              >
                Produtos
              </Link>
            </li>

            <li>
              <Link
                className={"users" === activeItem ? "active" : ""}
                href="/admin/users"
              >
                Usuários
              </Link>
            </li>
            <li>
              <Link
                className={"sellers" === activeItem ? "active" : ""}
                href="/admin/sellers"
              >
                Vendedores
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 px-4">{children} </div>
      </div>
    </div>
  );
};

export default AdminLayout;

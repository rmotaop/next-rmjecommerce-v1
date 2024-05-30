import { auth } from "@/lib/auth";
import Link from "next/link";

const SellerLayout = async ({
  activeItem = "dashboard",
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  if (!session || !session.user.isSeller) {
    return (
      <div className="relative flex flex-grow p-4">
        <div>
          <h1 className="text-2xl">Não autorizado</h1>
          <p>É necessária permissão de vendedor.</p>
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
                href="/seller/dashboard"
              >
                Painél do Vendedor
              </Link>
            </li>
            <li>
              <Link
                className={"categories" === activeItem ? "active" : ""}
                href="/seller/categories"
              >
                Categorias
              </Link>
            </li>
            <li>
              <Link
                className={"orders" === activeItem ? "active" : ""}
                href="/seller/orders"
              >
                Pedidos
              </Link>
            </li>
            <li>
              <Link
                className={"products" === activeItem ? "active" : ""}
                href="/seller/products"
              >
                Produtos
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 px-4">{children} </div>
      </div>
    </div>
  );
};

export default SellerLayout;

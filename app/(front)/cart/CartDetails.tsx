"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase, removeItemCart } =
    useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      <h1 className="mt-2 pt-14 py-4 text-2xl">Carrinho compras</h1>

      {items.length === 0 ? (
        <div>
          Seu carrinho esta vazio.{" "}
          <Link className="bg-amber-400 p-1 text-white rounded" href="/">
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.slug}>
                    <td>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={150}
                          height={150}
                          className="rounded"
                        ></Image>
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => decrease(item)}
                        disabled={item.qty === 1}
                      >
                        -
                      </button>
                      <span className="px-2">{item.qty}</span>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => increase(item)}
                        disabled={item.qty === item.countInStock}
                      >
                        +
                      </button>
                    </td>
                    <td>{formatPrice(item.price)}</td>
                    <td>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => removeItemCart(item)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="card bg-base-300">
              <div className="card-body">
                <ul>
                  <li>
                    <div className="pb-3 text-lg">
                      Subtotal ({items.reduce((a, c) => a + c.qty, 0)}):
                      <span> </span>
                      {formatPrice(itemsPrice)}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/shipping")}
                      className="btn btn-primary w-full"
                    >
                      Finalizar compra
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

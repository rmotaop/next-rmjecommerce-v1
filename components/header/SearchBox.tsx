"use client";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const SearchBox = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "Todos";

  const { data: categories, error } = useSWR("/api/products/categories");

  if (error) return error.message;
  if (!categories) return "Carregando...";

  return (
    <form action="/search" method="GET">
      <div className="join">
        <select
          name="category"
          defaultValue={category}
          className="join-item select"
        >
          <option value="Todos">Departamentos</option>
          {categories.map((c: string) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          className="join-item input input-bordered  w-48"
          placeholder="Buscar produtos..."
          defaultValue={q}
          name="q"
        />
        <button className="join-item btn input-bordered hover:input-bordered">
          Procurar
        </button>
      </div>
    </form>
  );
};

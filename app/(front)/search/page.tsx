import ProductItem from "@/components/products/ProductItem";
import { Rating } from "@/components/products/Rating";
import productServices from "@/lib/services/productService";
import Link from "next/link";

const sortOrders = ["Lançamento", "Menor preço", "Maior preço", "Avaliação"];
const prices = [
  {
    name: "R$1 a R$50",
    value: "1-50",
  },
  {
    name: "R$51 a R$200",
    value: "51-200",
  },
  {
    name: "R$201 a R$1000",
    value: "201-1000",
  },
  {
    name: "R$1001 a R$...",
    value: "1001-1000000",
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: {
    q = "Todos",
    category = "Todos",
    brand = "Todos",
    price = "Todos",
    rating = "Todos",
  },
}: {
  searchParams: {
    q: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  if (
    (q !== "Todos" && q !== "") ||
    category !== "Todos" ||
    brand !== "Todos" ||
    rating !== "Todos" ||
    price !== "Todos"
  ) {
    return {
      title: `Search ${q !== "Todos" ? q : ""}
          ${category !== "Todos" ? ` : Category ${category}` : ""}
          ${brand !== "Todos" ? ` : Brand ${brand}` : ""}
          ${price !== "Todos" ? ` : Price ${price}` : ""}
          ${rating !== "Todos" ? ` : Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Buscar Produtos",
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = "Todos",
    category = "Todos",
    brand = "Todos",
    price = "Todos",
    rating = "Todos",
    sort = "Lançamento",
    page = "1",
  },
}: {
  searchParams: {
    q: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    b,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    b?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = { q, category, brand, price, rating, sort, page };
    if (c) params.category = c;
    if (p) params.price = p;
    if (b) params.brand = b;
    if (r) params.rating = r;
    if (pg) params.page = pg;
    if (s) params.sort = s;
    return `/search?${new URLSearchParams(params).toString()}`;
  };
  const categories = await productServices.getCategories();
  const brandies = await productServices.getBrandies();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    brand,
    price,
    rating,
    page,
    sort,
  });
  return (
    <div className="grid md:grid-cols-5 md:gap-5 pt-14">
      <div>
        <div className="text-xl pt-3">Departamentos:</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${
                  "Todos" === category && "link-primary"
                }`}
                href={getFilterUrl({ c: "Todos" })}
              >
                Todos
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link link-hover ${
                    c === category && "link-primary"
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-xl pt-3">Marcas:</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${
                  "Todos" === brand && "link-primary"
                }`}
                href={getFilterUrl({ b: "Todos" })}
              >
                Todos
              </Link>
            </li>
            {brandies.map((b: string) => (
              <li key={b}>
                <Link
                  className={`link link-hover ${b === brand && "link-primary"}`}
                  href={getFilterUrl({ b })}
                >
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xl pt-3">Preços:</div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${
                  "Todos" === price && "link-primary"
                }`}
                href={getFilterUrl({ p: "Todos" })}
              >
                Todos
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`link link-hover ${
                    p.value === price && "link-primary"
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xl pt-3">Avaliações de cliente:</div>
          <ul>
            <li>
              <Link
                className={`link link-hover ${
                  "Todos" === rating && "link-primary"
                }`}
                href={getFilterUrl({ r: "Todos" })}
              >
                Todos
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`link link-hover ${
                    `${r}` === rating && "link-primary"
                  }`}
                >
                  <Rating caption={""} value={r}></Rating>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="flex items-center justify-between  py-4">
          <div className="flex items-center">
            {products.length === 0 ? "No" : countProducts} Resultados
            {q !== "Todos" && q !== "" && " : " + q}
            {category !== "Todos" && " : " + category}
            {brand !== "Todos" && " : " + brand}
            {price !== "Todos" && " : Price " + price}
            {rating !== "Todos" && " : Rating " + rating + " & acima"}
            &nbsp;
            {(q !== "Todos" && q !== "") ||
            category !== "Todos" ||
            rating !== "Todos" ||
            price !== "Todos" ? (
              <Link className="btn btn-sm btn-ghost" href="/search">
                Clear
              </Link>
            ) : null}
          </div>
          <div>
            Ordenar por:{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 link link-hover ${
                  sort == s ? "link-primary" : ""
                } `}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3  ">
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          <div className="join">
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`join-item btn ${
                    Number(page) === p + 1 ? "btn-active" : ""
                  } `}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

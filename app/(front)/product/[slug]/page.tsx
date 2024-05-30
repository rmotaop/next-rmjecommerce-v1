import AddToCart from "@/components/products/AddToCart";
import { convertDocToObj, formatPrice } from "@/lib/utils";
import productService from "@/lib/services/productService";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@/components/products/Rating";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return { title: "Produto não encontrado." };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getBySlug(params.slug);
  if (!product) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <>
      <h1 className="mt-2 pt-14 text-2xl">Detalhes do produto</h1>
      <div className="mt-4 grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            priority={false}
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>
          <ul>
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            <li>
              {product.numReviews < 2 ? (
                <Rating
                  value={product.rating}
                  caption={`${product.numReviews} classificação`}
                />
              ) : (
                <Rating
                  value={product.rating}
                  caption={`${product.numReviews} classificações`}
                />
              )}
            </li>
            <li> {product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li className="text-xl">
              Descrição do produto:
              <p>{product.description}</p>
            </li>
            <li>
              <div className="divider"></div>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-4">
            <li className="text-xl">Avaliações recentes</li>
            <li>
              {product?.reviews?.map((rev: any) => (
                <ul key={rev.id}>
                  <li>{rev.name}</li>
                  <li>
                    <Rating value={rev.rating} caption={`${rev.rating}`} />
                  </li>
                  <li>{rev.comment}</li>
                  <br />
                </ul>
              ))}
            </li>
          </ul>
        </div>
        <div>
          <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Preço</div>
                <div>{formatPrice(product.price)}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Estoque</div>
                <div>
                  {product.countInStock > 0 ? "Disponível" : "Em breve"}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className="card-actions justify-center">
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: "",
                      size: "",
                    }}
                  />
                </div>
              )}
              <div className="my-3 p-3 bg-slate-700 hover:bg-slate-500 rounded-lg text-center">
                <Link href="/">Voltar ao catálogo</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

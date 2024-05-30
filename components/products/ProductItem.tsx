import { Product } from "@/lib/models/ProductModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "./Rating";
import { formatPrice } from "@/lib/utils";

export default function ProductItem({ product }: { product: Product }) {
  return (
    //Detalhes dos produtos no catálogo principal
    <div className="card bg-base-300 shadow-xl mb-4">
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image
            priority={false}
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className=" h-64 w-128"
          />
        </Link>
      </figure>

      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <h2 className="card-title font-light">{product.name}</h2>
        </Link>
        <Rating value={product.rating} caption={`(${product.numReviews})`} />
        <p className="mb-2">{product.brand}</p>
        <div className="card-actions flex items-center justify-between">
          <span className="text-lg">{formatPrice(product.price)}</span>
        </div>
      </div>
    </div>
  );
}

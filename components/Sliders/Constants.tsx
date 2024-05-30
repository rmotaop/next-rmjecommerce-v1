export const images = [
  {
    id: 1,
    slug: "ar-condicionado",
    src: "/images/banner1.jpg",
    title: "Ar Condicionado Split",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 2,
    slug: "baden-baden",
    src: "/images/banner2.jpg",
    title: "Baden Baden Pilsen",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    slug: "brinquedo-roler",
    src: "/images/banner3.jpg",
    title: "Giro 360º",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua .",
  },
  {
    id: 4,
    slug: "notebook-clean",
    src: "/images/banner4.jpg",
    title: "Notebook Clean",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  },
  {
    id: "65bff44c8bc2359c4c361df1",
    slug: "ps5-pro",
    src: "/images/banner5.jpg",
    title: "PS5 Pro Oferta",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];

/*

import React from "react";
import productService from "@/lib/services/productService";
import Link from "next/link";

export default async function images() {
  const featuredProducts = await productService.getFeatured();
  return (
    <div className="w-full relative carousel rounded-lg">
      {featuredProducts.map((product, index) => (
        <div
          key={product._id}
          id={`slide-${index}`}
          className="carousel-item relative w-full"
        >
          <Link href={`/product/${product.slug}`}>
            <img src={product.banner} alt={product.name} />
          </Link>
          <div
            className="absolute flex justify-between transform 
        -translate-y-1/2 left-5 right-5 bottom-1/3"
          >
            <a
              href={`#slide-${
                index === 0 ? featuredProducts.length - 1 : index - 1
              }`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide-${
                index === featuredProducts.length - 1 ? 0 : index + 1
              }`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
 */

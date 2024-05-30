import { cache } from "react";
import dbConnect from "@/lib/dbConnect";
import ProductModel, { Product } from "@/lib/models/ProductModel";

export const revalidate = 3600;

const getLatest = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({})
    .sort({ _id: -1 })
    .limit(50)
    .lean();
  return products as Product[];
});

const getFeatured = cache(async () => {
  await dbConnect();
  const products = await ProductModel.find({ isFeatured: true })
    .limit(3)
    .lean();
  return products as Product[];
});

const getBySlug = cache(async (slug: string) => {
  await dbConnect();
  const product = await ProductModel.findOne({ slug }).lean();
  return product as Product;
});

const PAGE_SIZE = 3;
const getByQuery = cache(
  async ({
    q,
    category,
    brand,
    sort,
    price,
    rating,
    page = "1",
  }: {
    q: string;
    category: string;
    brand: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  }) => {
    await dbConnect();

    const queryFilter =
      q && q !== "Todos"
        ? {
            name: {
              $regex: q,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "Todos" ? { category } : {};
    const brandFilter = brand && brand !== "Todos" ? { brand } : {};
    const ratingFilter =
      rating && rating !== "Todos"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    // 10-50
    const priceFilter =
      price && price !== "Todos"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const order: Record<string, 1 | -1> =
      sort === "Menor preço"
        ? { price: 1 }
        : sort === "Maior preço"
        ? { price: -1 }
        : sort === "Avaliação"
        ? { rating: -1 }
        : { _id: -1 };

    const categories = await ProductModel.find().distinct("category");
    const brandies = await ProductModel.find().distinct("brand");
    const products = await ProductModel.find(
      {
        ...queryFilter,
        ...categoryFilter,
        ...brandFilter,
        ...priceFilter,
        ...ratingFilter,
      },
      "-reviews"
    )
      .sort(order)
      .skip(PAGE_SIZE * (Number(page) - 1))
      .limit(PAGE_SIZE)
      .lean();

    const countProducts = await ProductModel.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    });

    return {
      products: products as Product[],
      countProducts,
      page,
      pages: Math.ceil(countProducts / PAGE_SIZE),
      categories,
      brandies,
    };
  }
);

const getCategories = cache(async () => {
  await dbConnect();
  const categories = await ProductModel.find().distinct("category");
  return categories;
});
const getBrandies = cache(async () => {
  await dbConnect();
  const brandies = await ProductModel.find().distinct("brand");
  return brandies;
});

const productService = {
  getLatest,
  getFeatured,
  getBySlug,
  getByQuery,
  getCategories,
  getBrandies,
};
export default productService;

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user.isAdmin || !req.auth.user.isSeller) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const products = await ProductModel.find();
  return Response.json(products);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user.isAdmin || !req.auth.user.isSeller) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  const { user } = req.auth;
  await dbConnect();
  const product = new ProductModel({
    user: "Nome do usuário",
    name: "Informe o nome do produto",
    slug: "nome-do-nome- substitua espaço por -",
    seller: "nome do vendedor",
    image: "/images/produto.jpg",
    price: 0,
    category: "categoria",
    brand: "informe o fabricante",
    countInStock: 0,
    description: "descrição do produto",
    rating: 0,
    numReviews: 0,
  });
  try {
    await product.save();
    return Response.json(
      { message: "Produto criado com sucesso.", product },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;

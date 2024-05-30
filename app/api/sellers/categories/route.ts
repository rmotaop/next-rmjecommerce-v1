import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/lib/models/CategoryModel";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isSeller) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const categories = await CategoryModel.find();
  return Response.json(categories);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isSeller) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const category = new CategoryModel({
    name: "Nome da Categoria",
  });
  try {
    await category.save();
    return Response.json(
      { message: "Categoria criada com sucesso.", category },
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

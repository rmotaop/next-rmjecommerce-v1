import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/lib/models/ReviewModel";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const reviews = await ReviewModel.find();
  return Response.json(reviews);
}) as any;

export const POST = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const review = new ReviewModel({
    name: "Nome do usuário",
  });
  try {
    await review.save();
    return Response.json(
      { message: "Avaliação criada com sucesso.", review },
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

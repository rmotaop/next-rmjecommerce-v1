import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/lib/models/ReviewModel";

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const review = await ReviewModel.findById(params.id);
  if (!review) {
    return Response.json(
      { message: "Avaliação não encontrada." },
      {
        status: 404,
      }
    );
  }
  return Response.json(review);
}) as any;

export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }

  const { name, comment, rating } = await req.json();

  try {
    await dbConnect();
    const review = await ReviewModel.findById(params.id);
    if (review) {
      review.name = name;
      review.comment = comment;
      review.rating = rating;

      const updatedReview = await review.save();
      return Response.json(updatedReview);
    } else {
      return Response.json(
        { message: "Avaliação não encontrada." },
        {
          status: 404,
        }
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();
    const review = await ReviewModel.findById(params.id);
    if (review) {
      await review.deleteOne();
      return Response.json({ message: "Avaliação excluída com sucesso." });
    } else {
      return Response.json(
        { message: "Avaliação não encontrada." },
        {
          status: 404,
        }
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
}) as any;

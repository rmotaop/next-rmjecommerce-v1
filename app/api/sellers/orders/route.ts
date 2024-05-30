import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  const { user } = req.auth;
  await dbConnect();
  const orders = await OrderModel.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("user", "name");

  return Response.json(orders);
}) as any;

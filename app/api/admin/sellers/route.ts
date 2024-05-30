import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import SellerModel from "@/lib/models/SellerModel";

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
  const sellers = await SellerModel.find()
    .sort({ createdAt: -1 })
    .populate("user", "name");
  return Response.json(sellers);
}) as any;

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import SellerModel from "@/lib/models/SellerModel";
import { round2 } from "@/lib/utils";

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  const { user } = req.auth;
  try {
    const payload = await req.json();
    await dbConnect();

    const newSeller = new SellerModel({
      sellerContract: payload.sellerContract,
      paymentMethod: payload.paymentMethod,
      user: user._id,
    });

    const createdSeller = await newSeller.save();
    return Response.json(
      { message: "O contrato foi criado", seller: createdSeller },
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

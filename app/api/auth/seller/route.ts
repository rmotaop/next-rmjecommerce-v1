import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SellerModel from "@/lib/models/SellerModel";

export const POST = async (request: NextRequest) => {
  const {
    name,
    cpf,
    cnpj,
    address,
    phone,
    logo,
    storename,
    description,
    termo,
    complement,
    contract,
    diamante,
  } = await request.json();
  await dbConnect();
  const newSeller = new SellerModel({
    name,
    cpf,
    cnpj,
    address,
    phone,
    logo,
    storename,
    termo,
    contract,
    complement,
    diamante,
    description,
  });
  try {
    await newSeller.save();
    return Response.json(
      { message: "Cadastro de vendedor foi criado." },
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
};

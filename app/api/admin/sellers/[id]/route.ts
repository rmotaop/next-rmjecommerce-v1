import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import SellerModel from "@/lib/models/SellerModel";

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isSeller) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }
  await dbConnect();
  const seller = await SellerModel.findById(params.id);
  if (!seller) {
    return Response.json(
      { message: "Vendedor não encontrado." },
      {
        status: 404,
      }
    );
  }
  return Response.json(seller);
}) as any;

export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p;
  if (!req.auth || !req.auth.user?.isSeller) {
    return Response.json(
      { message: "Não autorizado" },
      {
        status: 401,
      }
    );
  }

  const { name, email, isSeller } = await req.json();

  try {
    await dbConnect();
    const seller = await SellerModel.findById(params.id);
    if (seller) {
      seller.name = name;
      seller.email = email;
      seller.isSeller = Boolean(isSeller);

      const updatedSeller = await seller.save();
      return Response.json({
        message: "Vendedor atualizado com sucesso.",
        seller: updatedSeller,
      });
    } else {
      return Response.json(
        { message: "Vendedor não encontrado." },
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
    const seller = await SellerModel.findById(params.id);
    if (seller) {
      if (seller.isSeller)
        return Response.json(
          { message: "O usuário é vendedor." },
          {
            status: 400,
          }
        );
      await seller.deleteOne();
      return Response.json({ message: "Vendedor excluído com sucesso." });
    } else {
      return Response.json(
        { message: "Vendedor não encontrado." },
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

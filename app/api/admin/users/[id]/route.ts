import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";

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
  const user = await UserModel.findById(params.id);
  if (!user) {
    return Response.json(
      { message: "Usuário não encontrado." },
      {
        status: 404,
      }
    );
  }
  return Response.json(user);
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

  const { name, email, isAdmin, isOwner, isSeller } = await req.json();

  try {
    await dbConnect();
    const user = await UserModel.findById(params.id);
    if (user) {
      user.name = name;
      user.email = email;
      user.isAdmin = Boolean(isAdmin);
      user.isOwner = Boolean(isOwner);
      user.isSeller = Boolean(isSeller);

      const updatedUser = await user.save();
      return Response.json({
        message: "Usuário atualizado com sucesso.",
        user: updatedUser,
      });
    } else {
      return Response.json(
        { message: "Usuário não encontrado." },
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
    const user = await UserModel.findById(params.id);
    if (user) {
      if (user.isAdmin && !user.isOwner)
        return Response.json(
          { message: "O usuário é administrador." },
          {
            status: 400,
          }
        );
      await user.deleteOne();
      return Response.json({ message: "Usuário excluído com sucesso." });
    } else {
      return Response.json(
        { message: "Usuário não encontrado." },
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

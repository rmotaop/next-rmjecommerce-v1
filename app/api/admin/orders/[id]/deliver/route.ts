import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

export const PUT = auth(async (...args: any) => {
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

    const order = await OrderModel.findById(params.id);
    if (order) {
      if (order.isDelivered)
        return Response.json(
          { message: "Ops... o pedido já foi enviado." },
          {
            status: 400,
          }
        );
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      return Response.json(updatedOrder);
    } else {
      return Response.json(
        { message: "Pedido não encontrado" },
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

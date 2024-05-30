import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

export const PUT = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth) {
    return Response.json(
      { message: "Não autorizado 212" },
      {
        status: 401,
      }
    );
  }
  try {
    await dbConnect();

    const order = await OrderModel.findById(params.id);
    if (order) {
      if (order.isPaid)
        return Response.json(
          { message: "Ops... Pagamento já registrado!" },
          {
            status: 400,
          }
        );
      order.isPaid = true;
      order.paidAt = Date.now();
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

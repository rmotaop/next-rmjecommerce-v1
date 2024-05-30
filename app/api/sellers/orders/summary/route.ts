import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import OrderModel from "@/lib/models/OrderModel";
import UserModel from "@/lib/models/UserModel";
import ProductModel from "@/lib/models/ProductModel";

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

  const ordersCount = await OrderModel.countDocuments({ user: user._id });
  const productsCount = await ProductModel.countDocuments({ user: user._id });
  const usersCount = await UserModel.countDocuments({ user: user._id });

  const ordersPriceGroup = await OrderModel.aggregate([
    { $unwind: "$user" },
    {
      $group: {
        _id: "$user",
        sales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);

  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const salesData = await OrderModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: "$totalPrice" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const productsData = await ProductModel.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const usersData = await UserModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        totalUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return Response.json({
    ordersCount,
    productsCount,
    usersCount,
    ordersPrice,
    salesData,
    productsData,
    usersData,
  });
}) as any;

import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import { auth } from '@/lib/auth'

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json(
      { message: 'Não autorizado' },
      {
        status: 401,
      }
    )
  }
  const { user } = req.auth
  await dbConnect()
  const products = await ProductModel.find({ user: user._id })
  return Response.json(products)
}) as any

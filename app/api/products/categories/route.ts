import { auth } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

export const GET = auth(async () => {
  await dbConnect()
  const categories = await ProductModel.find().distinct('category')
  return Response.json(categories)
}) as any

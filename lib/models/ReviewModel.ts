import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String },
    comment: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
)

const ReviewModel =
  mongoose.models?.Review || mongoose.model('Review', ReviewSchema)

export default ReviewModel

export type Review = {
  _id: string
  name: string
  comment: string
  rating: number
}

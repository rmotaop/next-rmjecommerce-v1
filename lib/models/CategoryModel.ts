import mongoose from "mongoose";

export type Category = {
  _id: string;
  name: string;
};

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models?.Category || mongoose.model("Category", CategorySchema);

export default CategoryModel;

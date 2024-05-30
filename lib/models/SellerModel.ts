import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sellerContract: {
      cpf: { type: String },
      cnpj: { type: String },
      logo: { type: String },
      storename: { type: String },
      address: { type: String },
      description: { type: String },
      phone: { type: String },
      contract: { type: String },
      complement: { type: String },
      rating: { type: Number },
      numReviews: { type: Number },
      diamante: { type: String },
      bronze: { type: String },
      termo: { type: String },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

const SellerModel =
  mongoose.models.Seller || mongoose.model("Seller", SellerSchema);

export type Seller = {
  _id: string;
  user?: { name: string };

  sellerContract: {
    logo?: string;
    storename: string;
    description: string;
    address: string;
    phone: string;
    contract: string;
    complement: string;
    diamante: string;
    rating: number;
    numReviews: number;
    cpf?: string;
    cnpj?: string;
    termo: string;
  };
  isPaid: boolean;
  paidAt?: string;
};

export default SellerModel;

export type SellerContract = {
  logo?: string;
  storename?: string;
  description: string;
  address: string;
  phone: string;
  contract: string;
  complement: string;
  diamante: string;
  rating: number;
  numReviews: number;
  cpf?: string;
  cnpj?: string;
  termo: string;
};

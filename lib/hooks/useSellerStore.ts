import { create } from "zustand";
import { SellerContract } from "../models/SellerModel";
import { persist } from "zustand/middleware";

type Contract = {
  taxPrice: number;
  totalPrice: number;
  paymentMethod: string;
  sellerContract: SellerContract;
};
const initialState: Contract = {
  taxPrice: 0,
  totalPrice: 0,
  paymentMethod: "PayPal",
  sellerContract: {
    logo: "",
    storename: "",
    description: "",
    address: "",
    phone: "",
    rating: 0,
    numReviews: 0,
    contract: "",
    complement: "",
    diamante: "",
    termo: "",
  },
};

export const contractStore = create<Contract>()(
  persist(() => initialState, {
    name: "contractStore",
  })
);

export default function useSellerService() {
  const { taxPrice, totalPrice, paymentMethod, sellerContract } =
    contractStore();
  return {
    taxPrice,
    totalPrice,
    paymentMethod,
    sellerContract,

    saveSellerContract: (sellerContract: SellerContract) => {
      contractStore.setState({
        sellerContract,
      });
    },
    savePaymentMethod: (paymentMethod: string) => {
      contractStore.setState({
        paymentMethod,
      });
    },
    init: () => contractStore.setState(initialState),
  };
}

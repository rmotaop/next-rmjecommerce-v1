import SellerLayout from "@/components/seller/SellerLayout";
import Orders from "./Orders";

export const metadata = {
  title: "Pedidos da loja",
};
const SellerOrdersPage = () => {
  return (
    <SellerLayout activeItem="orders">
      <Orders />
    </SellerLayout>
  );
};

export default SellerOrdersPage;

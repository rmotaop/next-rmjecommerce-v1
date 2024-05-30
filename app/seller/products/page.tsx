import SellerLayout from "@/components/seller/SellerLayout";
import Products from "./Products";

export const metadata = {
  title: "Produtos",
};
const SellerProductsPage = () => {
  return (
    <SellerLayout activeItem="products">
      <Products />
    </SellerLayout>
  );
};

export default SellerProductsPage;

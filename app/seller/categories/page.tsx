import SellerLayout from "@/components/seller/SellerLayout";
import Categories from "./Categories";

export const metadata = {
  title: "Categorias",
};
const SellerCategoriesPage = () => {
  return (
    <SellerLayout activeItem="categories">
      <Categories />
    </SellerLayout>
  );
};

export default SellerCategoriesPage;

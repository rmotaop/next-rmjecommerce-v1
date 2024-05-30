import AdminLayout from "@/components/admin/AdminLayout";
import Products from "./Products";

export const metadata = {
  title: "Produtos",
};
const AdminProductsPage = () => {
  return (
    <AdminLayout activeItem="products">
      <Products />
    </AdminLayout>
  );
};

export default AdminProductsPage;

import AdminLayout from "@/components/admin/AdminLayout";
import Categories from "./Categories";

export const metadata = {
  title: "Categorias",
};
const AdminCategoriesPage = () => {
  return (
    <AdminLayout activeItem="categories">
      <Categories />
    </AdminLayout>
  );
};

export default AdminCategoriesPage;

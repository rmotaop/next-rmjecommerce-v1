import AdminLayout from "@/components/admin/AdminLayout";
import Sellers from "./Sellers";

export const metadata = {
  title: "Usuário Vendedor",
};
const AdminSellersPage = () => {
  return (
    <AdminLayout activeItem="sellers">
      <Sellers />
    </AdminLayout>
  );
};

export default AdminSellersPage;

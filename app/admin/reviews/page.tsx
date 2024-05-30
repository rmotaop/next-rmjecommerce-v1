import AdminLayout from "@/components/admin/AdminLayout";
import Reviews from "./Reviews";

export const metadata = {
  title: "Avaliações",
};
const AdminReviewsPage = () => {
  return (
    <AdminLayout activeItem="reviews">
      <Reviews />
    </AdminLayout>
  );
};

export default AdminReviewsPage;

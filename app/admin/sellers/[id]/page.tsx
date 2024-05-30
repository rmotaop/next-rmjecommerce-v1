import AdminLayout from "@/components/admin/AdminLayout";
import Form from "./Form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Editar Vendedor ${params.id}`,
  };
}

export default function SellerEditPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout activeItem="sellers">
      <Form sellerId={params.id} />
    </AdminLayout>
  );
}

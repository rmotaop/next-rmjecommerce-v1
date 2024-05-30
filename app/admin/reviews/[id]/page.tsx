import AdminLayout from "@/components/admin/AdminLayout";
import Form from "./Form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Editar avaliação ${params.id}`,
  };
}

export default function ReviewEditPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout activeItem="reviews">
      <Form reviewId={params.id} />
    </AdminLayout>
  );
}

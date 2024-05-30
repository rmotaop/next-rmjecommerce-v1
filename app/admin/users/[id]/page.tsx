import AdminLayout from "@/components/admin/AdminLayout";
import Form from "./Form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Editar Usuário ${params.id}`,
  };
}

export default function UserEditPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout activeItem="users">
      <Form userId={params.id} />
    </AdminLayout>
  );
}

import SellerLayout from "@/components/seller/SellerLayout";
import Form from "./Form";

export function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Editar categoria ${params.id}`,
  };
}

export default function CategoryEditPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <SellerLayout activeItem="categories">
      <Form categoryId={params.id} />
    </SellerLayout>
  );
}

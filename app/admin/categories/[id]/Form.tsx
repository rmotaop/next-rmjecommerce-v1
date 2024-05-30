"use client";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import toast from "react-hot-toast";
import Link from "next/link";
import { ValidationRule, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Category } from "@/lib/models/CategoryModel";
import { formatId } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CategoryEditForm({
  categoryId,
}: {
  categoryId: string;
}) {
  const { data: category, error } = useSWR(
    `/api/admin/categories/${categoryId}`
  );
  const router = useRouter();
  const { trigger: updateCategory, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/categories/${categoryId}`,
    async (url, { arg }) => {
      const res = await fetch(`${url}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success("Categoria atualizada com sucesso.");
      router.push("/admin/categories");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Category>();

  useEffect(() => {
    if (!category) return;
    setValue("name", category.name);
  }, [category, setValue]);

  const formSubmit = async (formData: any) => {
    await updateCategory(formData);
  };

  if (error) return error.message;
  if (!category) return "Carregando...";

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Category;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="md:flex my-3">
      <label className="label md:w-1/5" htmlFor={id}>
        {name}
      </label>
      <div className="md:w-4/5">
        <input
          type="text"
          id={id}
          {...register(id, {
            required: required && `${name} é necessário`,
            pattern,
          })}
          className="input input-bordered w-full max-w-md"
        />
        {errors[id]?.message && (
          <div className="text-error">{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl py-4">
        Editar Categoria, cadastro: {formatId(categoryId)}
      </h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Nome" id="name" required />

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Atualizar
          </button>
          <Link className="btn ml-4" href="/admin/categories">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

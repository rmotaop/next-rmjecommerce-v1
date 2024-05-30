"use client";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import toast from "react-hot-toast";
import Link from "next/link";
import { ValidationRule, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Review } from "@/lib/models/ReviewModel";
import { formatId } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ReviewEditForm({ reviewId }: { reviewId: string }) {
  const { data: review, error } = useSWR(`/api/admin/reviews/${reviewId}`);
  const router = useRouter();
  const { trigger: updateReview, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/reviews/${reviewId}`,
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

      toast.success("Avaliação atualizada com sucesso.");
      router.push("/admin/reviews");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Review>();

  useEffect(() => {
    if (!review) return;
    setValue("name", review.name);
    setValue("comment", review.comment);
    setValue("rating", review.rating);
  }, [review, setValue]);

  const formSubmit = async (formData: any) => {
    await updateReview(formData);
  };

  if (error) return error.message;
  if (!review) return "Carregando...";

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Review;
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
        Editar avaliação, cadastro: {formatId(reviewId)}
      </h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Nome" id="name" required />
          <FormInput name="Comentário" id="comment" required />
          <FormInput name="Avaliação 1 a 5" id="rating" required />

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Atualizar
          </button>
          <Link className="btn ml-4" href="/admin/reviews">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

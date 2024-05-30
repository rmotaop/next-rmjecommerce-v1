"use client";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import toast from "react-hot-toast";
import Link from "next/link";
import { ValidationRule, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Seller } from "@/lib/models/SellerModel";
import { formatId } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SellerEditForm({ sellerId }: { sellerId: string }) {
  const { data: seller, error } = useSWR(`/api/admin/sellers/${sellerId}`);
  const router = useRouter();
  const { trigger: updateSeller, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/sellers/${sellerId}`,
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

      toast.success("Vendedor atualizado com sucesso.");
      router.push("/admin/sellers");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Seller>();

  useEffect(() => {
    if (!seller) return;
    setValue("name", seller.name);
    setValue("email", seller.email);
    setValue("storename", seller.storename);
    setValue("phone", seller.phone);
    setValue("rating", seller.rating);
    setValue("numReviews", seller.numReviews);
    setValue("logo", seller.logo);
    setValue("description", seller.description);
  }, [seller, setValue]);

  const formSubmit = async (formData: any) => {
    await updateSeller(formData);
  };

  if (error) return error.message;
  if (!seller) return "Carregando...";

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Seller;
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

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading("Fazendo upload da imagem...");
    try {
      const resSign = await fetch("/api/cloudinary-sign", {
        method: "POST",
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setValue("logo", data.secure_url);
      toast.success("Arquivo enviado com sucesso.", {
        id: toastId,
      });
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl py-4">
        Editar Vendedor, cadastro: {formatId(sellerId)}
      </h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Nome" id="name" required />
          <FormInput name="e-mail" id="email" required />
          <FormInput name="Nome da Loja" id="storename" required />
          <FormInput name="Telefone" id="phone" required />
          <FormInput name="Classificação" id="rating" required />
          <FormInput name="Avaliações" id="numReviews" required />
          <FormInput name="Logotipo" id="logo" />
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="logo">
              Carregar Imagem
            </label>
            <div className="md:w-4/5">
              <input
                type="file"
                className="file-input w-full max-w-md"
                id="logo"
                onChange={uploadHandler}
              />
            </div>
          </div>
          <FormInput name="Resumo da loja" id="description" required />

          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Atualizar
          </button>
          <Link className="btn ml-4" href="/admin/sellers">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

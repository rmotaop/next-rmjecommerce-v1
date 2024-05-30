"use client";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { ValidationRule, useForm } from "react-hook-form";
import { formatId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/models/ProductModel";

export default function ProductEditForm(
  this: any,
  {
    productId,
  }: {
    productId: string;
  }
) {
  const { data: product, error } = useSWR(`/api/admin/products/${productId}`);
  const { data: category } = useSWR(`/api/admin/categories`);
  const { data: user } = useSWR(`/api/admin/users`);
  const { data: seller } = useSWR(`/api/admin/sellers`);
  const { data: reviews } = useSWR(`/api/admin/reviews`);

  const router = useRouter();

  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/admin/products/${productId}`,
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

      toast.success("Produto atualizado com sucesso.");
      router.push("/admin/products");
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (!product) return;
    setValue("user", product.user);
    setValue("name", product.name);
    setValue("slug", product.slug);
    setValue("category", product.category);
    setValue("image", product.image);
    setValue("price", product.price);
    setValue("countInStock", product.countInStock);
    setValue("brand", product.brand);
    setValue("seller", product.seller);
    setValue("rating", product.rating);
    setValue("numReviews", product.numReviews);
    setValue("description", product.description);
    setValue("isFeatured", product.isFeatured);
  }, [product, setValue]);

  const formSubmit = async (formData: any) => {
    await updateProduct(formData);
  };

  if (error) return error.message;
  if (!product) return "Carregando...";

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className="md:flex mb-6">
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

  {
    /* Carregar imagem do produto */
  }
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
      setValue("image", data.secure_url);
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
        Editar Produto, cadastro: {formatId(productId)}
      </h1>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <FormInput name="Usuário" id="user" required />
          {/* Usuário */}
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="User">
              Alterar usuário
            </label>
            <div className="md:w-4/5">
              <select
                className="file-input w-full max-w-md"
                id="user"
                onChange={(e) => setValue("user", e.target.value)}
              >
                <option id="user" value="0">
                  lista de usuários:
                </option>
                {user?.map((use: any, _id: any) => (
                  <option id="user" key={_id}>
                    {use.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FormInput name="Nome" id="name" required />
          <FormInput name="Texto Web" id="slug" required />
          <FormInput name="Imagem" id="image" required />
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="imageFile">
              Carregar Imagem
            </label>
            <div className="md:w-4/5">
              <input
                type="file"
                className="file-input w-full max-w-md"
                id="imageFile"
                onChange={uploadHandler}
              />
            </div>
          </div>
          <FormInput name="Preço" id="price" required />
          <FormInput name="Categoria" id="category" required />
          {/* escolha da categoria */}
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="Category">
              Alterar categoria
            </label>
            <div className="md:w-4/5">
              <select
                className="file-input w-full max-w-md"
                id="category"
                onChange={(e) => setValue("category", e.target.value)}
              >
                <option id="category" value="0">
                  Selecionar categoria:
                </option>
                {category?.map((cat: any, _id: any) => (
                  <option id="category" key={_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormInput name="Vendedor" id="seller" required />
          {/* escolha do vendedor */}
          <div className="md:flex mb-6">
            <label className="label md:w-1/5" htmlFor="Seller">
              Alterar vendedor
            </label>
            <div className="md:w-4/5">
              <select
                className="file-input w-full max-w-md"
                id="seller"
                onChange={(e) => setValue("seller", e.target.value)}
              >
                <option id="seller" value="0">
                  Selecionar vendedor:
                </option>
                {seller?.map((sell: any, _id: any) => (
                  <option id="seller" key={_id}>
                    {sell.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <FormInput name="Fabricante" id="brand" required />
          <FormInput name="Descrição" id="description" required />
          <FormInput name="Em estoque" id="countInStock" required />
          <button
            type="submit"
            disabled={isUpdating}
            className="btn btn-primary"
          >
            {isUpdating && <span className="loading loading-spinner"></span>}
            Atualizar
          </button>
          <Link className="btn ml-4 " href="/admin/products">
            Cancelar
          </Link>
          <div>
            {reviews === 0 ? (
              <li className="text-xl">Avaliações em breve...</li>
            ) : (
              <ul className="pt-2 space-y-4">
                <li className="text-xl">Veja avaliações recentes:</li>
                <li>
                  {product?.reviews?.map((rev: any) => (
                    <ul key={rev.id}>
                      <li>Nome: {rev.name}</li>
                      <li>
                        <li>Comentário: {rev.comment}</li>
                      </li>
                      <li>Avaliação: {rev.rating}</li>
                      <br />
                    </ul>
                  ))}
                </li>
              </ul>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

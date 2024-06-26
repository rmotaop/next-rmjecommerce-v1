"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SellerSteps from "@/components/SellerSteps";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session } = useSession();

  const params = useSearchParams();
  const router = useRouter();
  let callbackUrl = params.get("callbackUrl") || "/";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  useEffect(() => {
    if (session && session.seller) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;

    try {
      const res = await fetch("/api/auth/seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        return router.push(`/seller/sellerinfo`);
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      const error =
        err.message && err.message.indexOf("E11000") === 0
          ? "O e-mail está duplicado"
          : err.message;
      toast.error(error || "error");
    }
  };
  return (
    <div>
      <SellerSteps current={1} />
      <div className="w-1/2 mx-auto card bg-base-300 mt-8">
        <div className="card-body">
          <h1 className="text-center text-lg">Registrar conta de vendedor</h1>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="text-center">
              <div className="pt-1 inline-grid grid-cols-2 gap-4">
                <div className="my-2">
                  <label className="label" htmlFor="name">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", {
                      required: "O nome é obrigatório",
                    })}
                    className="input input-bordered w-full max-w-sm"
                  />
                  {errors.name?.message && (
                    <div className="text-error">{errors.name.message}</div>
                  )}
                </div>

                <div className="my-2">
                  <label className="label" htmlFor="email">
                    email
                  </label>
                  <input
                    type="text"
                    id="email"
                    {...register("email", {
                      required: "O email é obrigatório",
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message:
                          "Email aparentemente é inválido por favor verifique",
                      },
                    })}
                    className="input input-bordered w-full max-w-sm"
                  />
                  {errors.email?.message && (
                    <div className="text-error"> {errors.email.message}</div>
                  )}
                </div>
              </div>
              <div className="pt-1 inline-grid grid-cols-2 gap-4">
                <div className="my-2">
                  <label className="label" htmlFor="password">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "A senha é obrigatória",
                    })}
                    className="input input-bordered w-full max-w-sm"
                  />
                  {errors.password?.message && (
                    <div className="text-error">{errors.password.message}</div>
                  )}
                </div>
                <div className="my-2">
                  <label className="label" htmlFor="confirmPassword">
                    Confirmar senha
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Confirmar senha é obrigatório",
                      validate: (value) => {
                        const { password } = getValues();
                        return (
                          password === value || "As senhas devem corresponder!"
                        );
                      },
                    })}
                    className="input input-bordered w-full max-w-sm"
                  />
                  {errors.confirmPassword?.message && (
                    <div className="text-error">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                <div className="my-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Cadastrar
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="divider"> </div>
          <div className="text-right">
            Já tem uma conta?{" "}
            <Link className="link" href={`/signin?callbackUrl=${callbackUrl}`}>
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

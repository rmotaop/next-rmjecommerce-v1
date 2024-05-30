"use client";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

const Form = () => {
  const { data: session } = useSession();

  const params = useSearchParams();
  let callbackUrl = params.get("callbackUrl") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (session && session.user) {
      router.push(callbackUrl);
    }
  }, [callbackUrl, params, router, session]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
    });
  };
  return (
    <div className="mt-24 max-w-sm  mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title">Acessar</h1>
        {params.get("error") && (
          <div className="alert text-error">
            {params.get("error") === "CredentialsSignin"
              ? "E-mail ou senha inválida."
              : params.get("error")}
          </div>
        )}
        {params.get("success") && (
          <div className="alert text-success">{params.get("success")}</div>
        )}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register("email", {
                required: "O e-mail é obrigatório.",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message:
                    "Esse email aparentemente é inválido por favor verifique",
                },
              })}
              className="input input-bordered w-full max-w-sm"
            />
            {errors.email?.message && (
              <div className="text-error">{errors.email.message}</div>
            )}
          </div>
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
          <div className="my-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full"
            >
              {isSubmitting && (
                <span className="loading loading-spinner"></span>
              )}
              Entrar
            </button>
          </div>
        </form>
        <div>
          Ainda não é cliente?{" "}
          <Link className="link" href={`/register?callbackUrl=${callbackUrl}`}>
            Registre-se
          </Link>
        </div>
        <div className="text-center text-gray-500 mt-4"> - OU - </div>
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={() => {
            signIn("github");
          }}
        >
          {" "}
          Acessar com Github
        </button>
      </div>
    </div>
  );
};
export default Form;

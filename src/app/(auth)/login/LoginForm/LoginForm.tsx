"use client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginschema, loginSchemaType } from "./schema/login.schema";

import { signIn } from "next-auth/react";
import { FaFacebook, FaGoogle, FaHeadphones, FaLock, FaTruck } from "react-icons/fa";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm<loginSchemaType>({
    resolver: zodResolver(loginschema),
    defaultValues: {
      
      email: "",
      password: "",
      
    },
  });
  async function handleLogin(data: loginSchemaType) {
    setLoading(true);
    try {
     const isSuccessfulLogin = await signIn("credentials",{redirect:false,...data})
      
     
      if (isSuccessfulLogin?.ok) {
        toast.success("Logged in successfully", {
          position: "top-right",
        });
        setTimeout(() => {
          router.push("/");
        }, 500);
      }else{
        toast.success("incorrect email or password", {
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast.error(error?.message, {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* <form
        className="w-2/3 mx-auto my-5"
        onSubmit={handleSubmit(handleLogin)}
      >
        <FieldGroup>
          
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="email"
                  autoComplete="off"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          
        </FieldGroup>
        <Button className="my-5">{isLoading ? <Spinner /> : "Login"}</Button>
      </form> */}
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl w-full">
          {/* LEFT SIDE */}
          <div className="bg-gray-50 p-10 flex flex-col items-center justify-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
              alt="cart"
              className="w-72 mb-6"
            />

            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>

            <p className="text-gray-500 mb-6">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>

            <div className="flex gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FaTruck /> Free Delivery
              </div>
              <div className="flex items-center gap-1">
                <FaLock /> Secure Payment
              </div>
              <div className="flex items-center gap-1">
                <FaHeadphones /> 24/7 Support
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-10">
            <h1 className="text-center text-2xl font-bold text-green-600 mb-2">
              FreshCart
            </h1>

            <h2 className="text-center text-lg font-semibold mb-1">
              Welcome Back!
            </h2>

            <p className="text-center text-gray-500 mb-6 text-sm">
              Sign in to continue your fresh shopping experience
            </p>

            {/* Social Buttons */}
            <div className="space-y-3 mb-5">
              <button className="w-full border rounded-lg py-2 justify-center flex items-center gap-3 hover:bg-gray-50">
                <FaGoogle className="text-red-600" /> Continue with Google
              </button>

              <button className="w-full border rounded-lg flex items-center justify-center gap-3 py-2 hover:bg-gray-50">
                <FaFacebook className="text-blue-600" /> Continue with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-grow border-t"></div>
              <span className="mx-2 text-gray-400 text-xs">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="flex-grow border-t"></div>
            </div>

            {/* YOUR FORM */}
            <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
              <FieldGroup>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-400"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex justify-between items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                      </div>

                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="border border-gray-400"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button className="w-full my-5 bg-green-600">
                {isLoading ? <Spinner /> : "Sign In"}
              </Button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-5">
              New to FreshCart?{" "}
              <Link href="/register">
                <span className="text-green-600 cursor-pointer">
                  Create an account
                </span>
              </Link>
            </p>

            <div className="flex justify-center gap-4 text-xs text-gray-400 mt-4">
              <span> SSL Secured</span>
              <span> 50K+ Users</span>
              <span> 4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

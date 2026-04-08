'use client'
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerschema, registerSchemaType } from '../schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFn } from '../actions/register.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

export default function RegisterForm() {
    const router = useRouter();
    const [isLoading,setLoading] = useState(false);
    const {handleSubmit, control} = useForm<registerSchemaType>(
        {
            resolver:zodResolver(registerschema),
            defaultValues:{name:"",email:"",password:"",rePassword:"",phone:""}
        }
    );
   async function handleRegister(data:registerSchemaType){
    setLoading(true);
    try{
        const isSuccessfulRegister = await registerFn(data);
        if(isSuccessfulRegister){
           toast.success("Registered successfully",{
            position:"top-right"
           });
           setTimeout(()=>{
            router.push("/login");
           },500);
           
        
        }
    }catch(error:any){
        toast.error(error?.message,{
            position:"top-right"
        });
    }finally{
        setLoading(false);
    }
      
    }
    
  return (
    <div>
      {/*<form className='w-2/3 mx-auto my-5' onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="rePassword">rePassword</FieldLabel>
                <Input
                  {...field}
                  id="rePassword"
                  aria-invalid={fieldState.invalid}
                  placeholder="rePassword"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">phone</FieldLabel>
                <Input
                  {...field}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="phone"
                  autoComplete="off"
                  type="tel"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button className='my-5'>{isLoading ? <Spinner /> : "Register"}</Button>
      </form>*/}
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl">
          {/* LEFT SIDE */}
          <div className="p-10 bg-gray-50">
            <h1 className="text-2xl font-bold mb-2">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-gray-500 mb-6">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                  ⭐
                </div>
                <div>
                  <h3 className="font-semibold">Premium Quality</h3>
                  <p className="text-sm text-gray-500">
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                  🚚
                </div>
                <div>
                  <h3 className="font-semibold">Fast Delivery</h3>
                  <p className="text-sm text-gray-500">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                  🔒
                </div>
                <div>
                  <h3 className="font-semibold">Secure Shopping</h3>
                  <p className="text-sm text-gray-500">
                    Your data and payments are completely secure
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src="https://i.pravatar.cc/40"
                  className="w-10 h-10 rounded-full"
                  alt="user"
                />
                <div>
                  <h4 className="font-semibold text-sm">Sarah Johnson</h4>
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">
                "FreshCart has transformed my shopping experience..."
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-10">
            <h2 className="text-xl font-bold mb-2">Create Your Account</h2>
            <p className="text-gray-500 mb-6">
              Start your fresh journey with us today
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-4">
              <button className="w-full border flex items-center justify-center gap-2 rounded-lg py-2 hover:bg-gray-50">
                <FaGoogle className="text-red-600"></FaGoogle>
                Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
                <FaFacebook className="text-blue-600"></FaFacebook>
                Facebook
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t"></div>
              <span className="mx-2 text-gray-400 text-sm">or</span>
              <div className="flex-grow border-t"></div>
            </div>

            {/* YOUR FORM */}
            <form className="w-full" onSubmit={handleSubmit(handleRegister)}>
              <FieldGroup>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name" className='font-bold'>Name<span className="text-red-600">*</span></FieldLabel>
                      <Input {...field} id="name" placeholder="name" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

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
                        placeholder="email"
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
                      <Input {...field} id="password" type="password" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="rePassword">
                        Confirm Password
                      </FieldLabel>
                      <Input {...field} id="rePassword" type="password" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone">Phone</FieldLabel>
                      <Input {...field} id="phone" type="tel" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button className="w-full my-5 bg-green-600">
                {isLoading ? <Spinner /> : "Create My Account"}
              </Button>

              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <span className="text-green-600 cursor-pointer">Sign In</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

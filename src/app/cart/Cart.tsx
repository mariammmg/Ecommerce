'use client'

import { CartRes, productType } from '@/apis/cart/interfaces/cart.interface';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteCart } from '../_components/ProductItem/actions/deleteCart.action';
import { UpdateCart } from '../_components/ProductItem/actions/updateCart.action';
import { clearCart } from '../_components/ProductItem/actions/clearCart.action';
import Link from 'next/link';
import { FaTrash, FaTruck } from 'react-icons/fa';


export default  function Cart() {
   const {data}=useQuery<CartRes>({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetch('/api/cart');
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
      return data;
    }
   })
   const queryClient = useQueryClient();
   const {mutate:delMutate,data:delData,isPending:delPending}=useMutation({
    mutationFn:deleteCart,
     onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["cart"]})
     }
   })
   const {
     mutate: updateMutate,
     data: updateData,
     isPending: upPending,
   } = useMutation({
        mutationFn:UpdateCart,
        onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:["cart"]})
        }
   });
   const {
     mutate: clearMutate
   } = useMutation({
     mutationFn: clearCart,
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["cart"] });
     },
   });
   function handlemutateincrease(productId:string,count:number){
    updateMutate({productId,count});
   }
    function handlemutatedecrease(productId:string,count:number){
    updateMutate({productId,count});
   }
   if(delPending){
    return <h1>deleting...</h1>
   }
  return (
    <div>
      <div className="max-w-7xl mx-auto bg-gray-100 p-5 ">
        {/* Header */}
        <div>
          <nav className="flex text-sm text-slate-500 mb-6 font-medium">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900 font-semibold">Shopping Cart</span>
          </nav>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="bg-green-400 p-3 rounded-2xl flex items-center justify-center shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A] tracking-tight">
                Shopping Cart
              </h1>
            </div>
            <p className="text-lg md:text-xl text-slate-500 font-medium mt-1 mb-3">
              You have{" "}
              <span className="text-green-500 font-bold">
                {data?.data?.products?.length || 0} item
              </span>{" "}
              in your cart
            </p>
          </div>
        </div>

        <button
          className=" rounded-xl px-3 py-1 mb-4 bg-red-600 text-white"
          onClick={() => clearMutate()}
        >
          Clear Cart
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Products */}
          <div className="lg:col-span-2 space-y-4">
            {data?.data?.products?.map((prod: productType) => (
              <div
                key={prod.product._id}
                className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row gap-4 border-accent"
              >
                <img
                  src={prod.product.imageCover}
                  className="w-24 h-24 object-contain rounded-xl border"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{prod.product.title}</h2>
                  <span className="inline-block bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full mt-2">
                    {prod.product.category.name}
                  </span>
                  <p className="text-xl font-bold text-green-600 mt-3">
                    {prod.price} EGP
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      className="px-3 border border-black rounded bg-white"
                      onClick={() =>
                        handlemutatedecrease(prod?.product?._id, prod.count - 1)
                      }
                    >
                      -
                    </button>
                    <span>{prod.count}</span>
                    <button
                      className="px-3 border rounded bg-green-500"
                      onClick={() =>
                        handlemutateincrease(prod?.product?._id, prod.count + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div>
                    <p className="font-bold text-gray-500">Total</p>
                    <p className="font-bold text-xl text-black">
                      {prod.price * prod.count} EGP
                    </p>
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => delMutate(prod?.product?._id)}
                  >
                    <FaTrash></FaTrash>
                  </button>
                </div>
              </div>
            ))}

            {/* Repeat Item */}
          </div>
          {/* RIGHT: Summary */}
          <div className="bg-white rounded-xl shadow p-5 h-fit">
            <div className="bg-green-500 p-5 rounded-t-2xl mb-3">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            </div>
            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm mb-4 flex items-center gap-2">
              <FaTruck></FaTruck>
              Free Shipping
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{data?.data?.totalCartPrice} EGP</span>
              </div>
            </div>
            <Link href={`/payment/${data?.cartId}`}>
              <button className="w-full mt-5 bg-green-600 text-white py-2 rounded-lg">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

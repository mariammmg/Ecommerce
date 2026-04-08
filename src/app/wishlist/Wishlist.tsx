"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import ButtonCom from "../_components/ButtonCom";
import { deleteWish } from "@/apis/wishlist/actions/deleteWish.action";
import Link from "next/link";
import {  WishProducts, WishRes } from "@/apis/wishlist/interfaces/wishlist.interface";

export default function Wishlist() {
  const { data, isLoading, error } = useQuery<WishRes>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/wishlist");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
  console.log("w", data);

  const queryClient = useQueryClient();
  const {
    mutate: delMutate,
    data: delData,
    isPending: delPending,
  } = useMutation({
    mutationFn: deleteWish,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  // ✅ Loading
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading your wishlist...
      </div>
    );
  }

  // ✅ Error
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load wishlist ❌
      </div>
    );
  }

  // ✅ Empty State
  if (!data?.data?.length) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Your wishlist is empty 💔
        </h2>
        <p className="text-gray-400 mt-2">Start adding products you love!</p>
      </div>
    );
  }
  if (delPending) {
    return <h1>deleting...</h1>;
  }
  return (
    <>
      <div>
        <nav className="flex text-sm text-slate-500 my-6 font-medium ">
          <Link href="/" className="hover:text-red-500 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900 font-semibold">Wishlist</span>
        </nav>
        <div className="flex items-center gap-5 my-4">
          <div className="bg-red-50 p-4 rounded-xl flex items-center justify-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-none mb-1">
              My Wishlist
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              {data?.data?.length || 0} item saved
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-12 w-full border-b border-gray-200">
          <div className="col-span-6  text-gray-500 px-6 py-4 text-sm font-medium text-center">
            Product
          </div>
          <div className="col-span-2 px-6 py-4 text-sm font-medium text-gray-500 text-center">
            Price
          </div>
          <div className="col-span-2 px-6 py-4 text-sm font-medium text-gray-500 text-center">
            Status
          </div>
          <div className="col-span-2 px-6 py-4 text-sm font-medium text-gray-500 text-center">
            Actions
          </div>
        </div>

        {/* Product Row */}
        {data.data.map((prod:WishProducts) => (
          
            <div key={prod._id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
              {/* Product */}
              <div className="md:col-span-6 flex items-center gap-4">
                <Link
                  className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                  href={`/productsdetails/${prod._id}`}
                >
                  <img
                    alt="Woman Shawl"
                    className="w-full h-full object-contain p-2"
                    src={prod.imageCover}
                  />
                </Link>
                <div className="min-w-0">
                  <Link
                    className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                    href={`/productsdetails/${prod._id}`}
                  >
                    {prod.title}
                  </Link>
                  <p className="text-sm text-gray-400 mt-1">
                    {prod.category.name}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                <span className="md:hidden text-sm text-gray-500">Price:</span>
                <div className="text-right md:text-center">
                  <div className="font-semibold text-gray-900">
                    {prod.price} EGP
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="md:col-span-2 flex md:justify-center items-center">
                <span className="md:hidden text-sm text-gray-500 mr-2">
                  Status:
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  In Stock
                </span>
              </div>

              {/* Actions */}
              <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                <ButtonCom
                  id={prod?._id}
                  cls="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-500 text-white hover:bg-primary-700"
                >
                  <span className="inline text-white">Add to Cart</span>
                </ButtonCom>

                <button
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                  onClick={() => delMutate(prod?._id)}
                  title="Remove"
                >
                  <FaTrash></FaTrash>
                </button>
              </div>
            </div>
          
        ))}
      </div>
    </>
  );
}

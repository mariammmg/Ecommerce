"use client"
import { cashPayment } from '@/apis/payment/cashorder.api';
import { onlinePayment } from '@/apis/payment/checkoutonline.api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { FaCashRegister, FaCheck, FaIdCard, FaTruck } from 'react-icons/fa';
import { toast } from 'sonner';

export default function Payment({id}:{id:string}) {
  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) {
        throw new Error("Failed to fetch cart data");
      }
      const data = await response.json();
      return data;
    },
  });
  console.log("Cart data in payment page", cartData);
    
    interface FormData {
        city: string;
        details: string;
        phone: string;
    }
    const router=useRouter();
    const {register, handleSubmit}=useForm<FormData>();
    const [payment, setPayment] = React.useState("cash");
    async function handleorder(data:FormData){
        console.log("order data", data);
        if(payment==="cash"){
            const response =await cashPayment(id,data);
            console.log("Cash payment response", response);
            if(response.status==="success"){
              toast.success("Order Created successfully",{
            position:"top-right"
           });
           setTimeout(()=>{
            router.push("/allorders");
           },500);
           
        
              
               
            }
        }
        else{
            const response=await onlinePayment(id,data);
            console.log("Online payment response", response);
            if(response.status==="success"){
                window.location.href=response.session.url;
            }
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit(handleorder)}>
        <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow">
              <div className="bg-green-600 text-white px-6 py-4 rounded-t-xl font-semibold">
                Shipping Address
                <p className="text-sm opacity-80">
                  Where should we deliver your order?
                </p>
              </div>
              <div className="p-6 space-y-4">
                {/* Saved Address */}
                {/* Inputs */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    {...register("city")}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("details")}
                    placeholder="Street name, building number..."
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="Phone Number"
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
            </div>
            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow">
              <div className="bg-green-600 text-white px-6 py-4 rounded-t-xl font-semibold">
                Payment Method
                <p className="text-sm opacity-80">
                  Choose how you'd like to pay
                </p>
              </div>
              <div className="p-6 space-y-4">
                {/* Cash */}
                <div
                  onClick={() => setPayment("cash")}
                  className={`border-2 p-4 rounded-lg flex justify-between cursor-pointer ${
                    payment === "cash" ? "border-green-500" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-600 text-white p-2 rounded">
                     <FaCashRegister></FaCashRegister>
                    </div>
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>
                  <input type="radio" checked={payment === "cash"} readOnly />
                </div>
                {/* Online */}
                <div
                  onClick={() => setPayment("online")}
                  className={`border-2 p-4 rounded-lg flex justify-between cursor-pointer ${
                    payment === "online"
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-200 p-2 rounded"><FaIdCard></FaIdCard></div>
                    <div>
                      <p className="font-medium">Pay Online</p>
                      <p className="text-sm text-gray-500">
                        Credit / Debit Card
                      </p>
                    </div>
                  </div>
                  <input type="radio" checked={payment === "online"} readOnly />
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE */}
          <div className="bg-white rounded-xl shadow h-fit">
            <div className="bg-green-600 text-white px-6 py-4 rounded-t-xl font-semibold">
              Order Summary
            </div>
            <div className="p-6 space-y-4">
              {cartData?.data?.products.map((prod: any) => (
                <div className="flex justify-between items-center" key={prod.id}>
                  <div>
                    <img
                      src={prod.product.imageCover}
                      alt={prod.product.name}
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                    <p className="font-medium">{prod.product.title}</p>
                    <p className="text-sm text-gray-500">{prod.count} x {prod.product.quantity}</p>
                  </div>
                  <p className="font-medium">{prod.price * prod.count} EGP</p>
                </div>
              ))}
              
              
              {/* Totals */}
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{cartData?.data?.totalCartPrice} EGP</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span className="text-green-600">{cartData?.data?.totalCartPrice} EGP</span>
              </div>
              {/* Button */}
              <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Place Order
              </button>
              {/* Footer */}
              <div className="flex justify-between text-xs text-gray-500 pt-2">
                <span className="flex items-center gap-3"><FaCheck></FaCheck> Secure</span>
                <span className="flex items-center gap-3"><FaTruck></FaTruck> Fast Delivery</span>
                <span className="flex items-center gap-3"><FaCheck></FaCheck> Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

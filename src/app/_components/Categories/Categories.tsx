import {Categoryinterface, getCategories } from "@/apis/categories.api";
import Link from "next/link";
import { FaEnvelopeOpen, FaStar, FaTruck, FaUser } from "react-icons/fa";


export default async function Categories() {
  //todo your in view all categories 
    const data = await getCategories();
    //console.log(data);
  return (
    <>
      <div className="max-w-7xl mx-auto py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M5 18h14M5 18a2 2 0 1 0 4 0M5 18a2 2 0 1 1 4 0m10 0a2 2 0 1 0 4 0M19 18a2 2 0 1 1 4 0M1 10h11m8 0h3l-3-5h-3v5zM12 5h3v5h-3zM1 10l3 5h8v-5M1 10v5h3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight">
              Free Shipping
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              On orders over 500 EGP
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-emerald-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-emerald-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight">
              Secure Payment
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              100% secure transactions
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-orange-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-orange-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight">
              Easy Returns
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">14-day return policy</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 flex-shrink-0 bg-purple-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-purple-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M3 18v-6a9 9 0 0 1 18 0v6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight">
              24/7 Support
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Dedicated support team
            </p>
          </div>
        </div>
      </div>

      <div className=" grid gap-5 my-5  lg:grid-cols-6 md:grid-cols-5 grid-cols-2">
        {data?.map((category:Categoryinterface, index:number) => (
          <CatItem key={category._id ?? index} category={category} />
        ))}
      </div>

 <div className="max-w-7xl mx-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="relative overflow-hidden bg-gradient-to-br from-[#00B864] to-[#008A4B] rounded-[2rem] p-8 text-white shadow-lg">
    
    <div className="relative z-10">
      <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-6">
        🔥 Deal of the Day
      </span>
      <h2 className="text-3xl font-extrabold mb-2">Fresh Organic Fruits</h2>
      <p className="text-white/80 text-sm mb-6">
        Get up to 40% off on selected organic fruits
      </p>
      <div className="flex items-baseline gap-3 mb-8">
        <span className="text-4xl font-black">40% OFF</span>
        <span className="text-xs text-white/90">
          Use code: <span className="font-bold">ORGANIC40</span>
        </span>
      </div>
      <button className="bg-white text-[#008A4B] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition shadow-md">
        Shop Now <span>→</span>
      </button>
    </div>
  </div>
  <div className="relative overflow-hidden bg-gradient-to-br from-[#FF8C33] via-[#FF6B4A] to-[#FF3D68] rounded-[2rem] p-8 text-white shadow-lg">
    
    <div className="relative z-10">
      <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium mb-6">
        ✨ New Arrivals
      </span>
      <h2 className="text-3xl font-extrabold mb-2">Exotic Vegetables</h2>
      <p className="text-white/80 text-sm mb-6">
        Discover our latest collection of premium vegetables
      </p>
      <div className="flex items-baseline gap-3 mb-8">
        <span className="text-4xl font-black">25% OFF</span>
        <span className="text-xs text-white/90">
          Use code: <span className="font-bold">FRESH25</span>
        </span>
      </div>
      <button className="bg-white text-[#FF6B4A] px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition shadow-md">
        Explore Now <span>→</span>
      </button>
    </div>
  </div>
</div>
<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2 flex flex-col justify-center">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-[#00B864] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </div>
      <div>
        <p className="text-[10px] font-bold text-[#00B864] tracking-widest uppercase">Newsletter</p>
        <p className="text-xs text-gray-400">50,000+ subscribers</p>
      </div>
    </div>
    <h2 className="text-4xl font-extrabold text-[#1A202C] leading-tight">
      Get the Freshest Updates<br />
      <span className="text-[#00B864]">Delivered Free</span>
    </h2>
    <p className="text-gray-500 mt-4 mb-8 text-lg">Weekly recipes, seasonal offers &amp; exclusive member perks.</p>
    <div className="flex flex-wrap gap-3 mb-8">
      <span className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 flex items-center gap-2 shadow-sm">
        <span className="text-green-500 text-xs"><FaEnvelopeOpen/></span> Fresh Picks Weekly
      </span>
      <span className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 flex items-center gap-2 shadow-sm">
        <span className="text-green-500 text-xs"><FaTruck/></span> Free Delivery Codes
      </span>
      <span className="px-4 py-2 bg-white border border-gray-100 rounded-full text-sm text-gray-600 flex items-center gap-2 shadow-sm">
        <span className="text-green-500 text-xs"><FaUser/></span> Members-Only Deals
      </span>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
      <input type="email" placeholder="you@example.com" className="flex-grow px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 bg-white shadow-sm" />
      <button className="bg-[#00B864] hover:bg-[#00a358] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200">
        Subscribe <span>→</span>
      </button>
    </div>
    <p className="text-xs text-gray-400 mt-4 flex items-center gap-1 italic">
      <FaStar></FaStar> Unsubscribe anytime. No spam, ever.
    </p>
  </div>
  <div className="bg-[#111827] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between">
    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -mr-32 -mt-32" />
    <div className="relative z-10">
      <span className="inline-flex  gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-medium mb-8">
        📱 MOBILE APP
      </span>
      <h3 className="text-2xl font-bold mb-4">Shop Faster on Our App</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-8">
        Get app-exclusive deals &amp; 15% off your first order.
      </p>
      <div className="space-y-4">
        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition text-left group">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-11.4 0-51.1-19-81.4-18.6-38.6.5-81.9 25.1-105.2 69.4-46.9 89.1-15.8 213.5 30.2 282.7 22.4 33.8 54.1 71.3 90 70.2 32.2-1.2 46.8-21.4 86.8-21.4s52.7 21.4 86.5 20.8c36.6-.6 64.2-34.1 86.1-66.2 25.2-37.2 35.6-73.3 35.9-75.1-1.1-.3-69.1-26.7-69.2-104.8zM232.1 79.2c16.1-20.2 26.9-48.2 23.9-76.2-24.1 1-53.1 16.1-70.4 36.3-15.5 18.1-28.9 45.9-25.2 73.1 26.3 2 54-14.7 71.7-33.2z" /></svg>
          <div>
            <p className="text-[10px] uppercase opacity-60">Download on</p>
            <p className="text-lg font-semibold leading-none">App Store</p>
          </div>
        </button>
        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-2xl flex items-center gap-4 transition text-left">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 512 512"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 58.9-34.1c18-10.3 25.5-30.4 25.5-50.4s-7.5-40.1-25.5-50.4zM325.3 277.7l60.1 60.1L104.6 499l220.7-221.3z" /></svg>
          <div>
            <p className="text-[10px] uppercase opacity-60">Get it on</p>
            <p className="text-lg font-semibold leading-none">Google Play</p>
          </div>
        </button>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3">
      <div className="flex text-yellow-400 text-xs">
        ★★★★★
      </div>
      <p className="text-xs text-gray-400">4.9 • 100K+ downloads</p>
    </div>
  </div>
</div>

    </>
  );
}
export function CatItem({category}:{category:Categoryinterface}){
    return(
      <Link href={`/subcategories/${category._id}`} >
        <div className=" text-center rounded-[8px] shadow-md border border-border-color p-4">
            <img src={category.image} alt={category.name} className="rounded-full size-25 my-4 mx-auto"/>
           <p>{category.name}</p>
        </div>
        </Link>
    )
}

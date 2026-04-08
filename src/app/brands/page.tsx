import { Brandinterface, getBrands } from '@/apis/getbrands.api';
import Link from 'next/link';


export default async function page() {
  
   const data=await getBrands();
  return (
    <div>
      <div className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white p-8 rounded-b-2xl">
        <nav className="flex items-center gap-2 text-sm text-white/70  p-3">
          <Link className="hover:text-white transition-colors" href="/">
            Home
          </Link>

          <span className="text-white/40">/</span>
          <span className="text-white font-medium">Brands</span>
        </nav>
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 bg-violet-500 rounded-md flex items-center justify-center">
            {/* Example Icon: stack layers */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 18l9 5 9-5"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Top Brands</h1>
            <p className="text-lg text-green-100 mt-1">
              Browse our wide range of product brands
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 px-4">
        {/* Example Category Card */}
        {data?.map((brand: Brandinterface) => (
          <div key={brand._id}>
            <Link href={`/brandproducts/${brand._id}`}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center font-medium text-gray-900">
                  {brand.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

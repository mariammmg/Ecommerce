

import { getSpecificCategory } from '@/apis/getcategory.api';

import { getSubCategoriesonCategory } from '@/apis/subcategories.api';
import Link from 'next/link';

import {  FaFolder } from 'react-icons/fa';
export interface SubCategoryinterface{
    
    _id: string,
    name: string,
    
 
}

export default async function page({params}:{params:Promise<{id:string}>}) {
    const id =( await params).id;
    const subcategories=await getSubCategoriesonCategory(id);
    
    const category= await getSpecificCategory(id);
    
    
  return (
    <div>
      <div>
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white">
          <nav className="flex items-center gap-2 text-sm text-white/70  py-6">
  <Link className="hover:text-white transition-colors" href="/">
    Home
  </Link>
  <span className="text-white/40">/</span>
  <Link className="hover:text-white transition-colors" href="/categories">
    Categories
  </Link>
  <span className="text-white/40">/</span>
  <span className="text-white font-medium">Music</span>
</nav>

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-5">
            

            <img
              src={category?.image}
              className="w-16 h-16 rounded-xl object-cover shadow-md"
            />
            
            <div>
              <h1 className="text-4xl font-bold">{category?.name}</h1>
              <p className="text-green-100 mt-2 text-lg">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Back */}
          <Link href="/categories">
            <button className="flex items-center gap-2 text-gray-600 hover:text-black mb-6">
              <span className="text-xl">←</span>
              <span className="text-lg">Back to Categories</span>
            </button>
          </Link>
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {subcategories?.length || 0} Subcategories in {category?.name}
          </h2>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card */}
            {subcategories?.map((subcat: SubCategoryinterface) => (
              <Link key={subcat._id} href={`/subproducts/${subcat._id}`}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-xl mb-4">
                    <FaFolder className="text-green-500"></FaFolder>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {subcat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

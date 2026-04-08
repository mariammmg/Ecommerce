import { getproducts } from '@/apis/products.api';
import ProductItem from '@/app/_components/ProductItem/ProductItem';
import { Productinterface } from '@/interface/product.interface';
import { FaFolderOpen } from 'react-icons/fa';
import Link from 'next/link';

export default async function page({params}:{params:Promise<{id:string}>}) {
    const id=(await (params)).id;
    const products=await getproducts();
    const filteredProducts:Productinterface[] = products?.filter((product) =>
  product.brand._id === id
) || [];
   
    
  return (
    <div>
      <div className="bg-gradient-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <nav className="flex items-center gap-2 text-sm text-white/70  p-3">
          <Link className="hover:text-white transition-colors" href="/">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <Link className="hover:text-white transition-colors" href="/brands">
            brands
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">
            {filteredProducts[0]?.brand.name}
          </span>
        </nav>
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center gap-5">
          {/* Image TODO*/}
          <FaFolderOpen className="text-3xl"></FaFolderOpen>
          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold">
              {filteredProducts[0]?.brand.name || "no products found"}
            </h1>
            <p className="text-green-100 mt-2 text-lg">
              browse {filteredProducts?.length} products in this brand
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 py-10 px-2">
        {filteredProducts?.map((product: Productinterface) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import { getproducts } from '@/apis/products.api';
import ProductItem from '@/app/_components/ProductItem/ProductItem';
import { Productinterface } from '@/interface/product.interface';
import Link from 'next/link';

export default async function page({params}:{params:Promise<{id:string}>}) {
    const id=(await (params)).id;
    const products=await getproducts();
    
    const filteredProducts:Productinterface[] = products?.filter((product) =>
  product.subcategory.some((sub) => sub._id === id)
) || [];
   
    
  return (
    <div>
      <div className="bg-gradient-to-r from-green-500 to-green-400 text-white">
        <nav className="flex items-center gap-2 text-md text-white/70  p-3">
          <Link className="hover:text-white transition-colors" href="/">
            Home
          </Link>
          <span className="text-white/40">/</span>
          <Link
            className="hover:text-white transition-colors"
            href="/categories"
          >
            Categories
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white font-medium">Music</span>
        </nav>
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-center gap-5">
          {/* Image TODO*/}
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <svg
              data-prefix="fas"
              data-icon="folder-open"
              className="svg-inline--fa fa-folder-open text-3xl"
              role="img"
              viewBox="0 0 576 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M56 225.6L32.4 296.2 32.4 96c0-35.3 28.7-64 64-64l138.7 0c13.8 0 27.3 4.5 38.4 12.8l38.4 28.8c5.5 4.2 12.3 6.4 19.2 6.4l117.3 0c35.3 0 64 28.7 64 64l0 16-365.4 0c-41.3 0-78 26.4-91.1 65.6zM477.8 448L99 448c-32.8 0-55.9-32.1-45.5-63.2l48-144C108 221.2 126.4 208 147 208l378.8 0c32.8 0 55.9 32.1 45.5 63.2l-48 144c-6.5 19.6-24.9 32.8-45.5 32.8z"
              ></path>
            </svg>
          </div>
          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold">
              {filteredProducts[0]?.subcategory[0].name || "no products found"}
            </h1>
            <p className="text-green-100 mt-2 text-lg">
              browse {filteredProducts.length} products in this subcategory
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

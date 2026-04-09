import { getproducts } from '@/apis/products.api';
import ProductItem from '../ProductItem/ProductItem';
import { Productinterface } from '@/interface/product.interface';

export default async function Products() {
    const data= await getproducts();
  return (
    <>
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100">
      
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Green vertical line */}
        <div className="w-1 h-8 bg-green-500 rounded"></div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Featured <span className="text-green-600">Products</span>
        </h2>
      </div>

      {/* Right Side */}
      
    </div>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 py-10 px-2">
        {data?.map((product: Productinterface) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

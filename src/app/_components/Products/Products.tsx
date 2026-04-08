import { getproducts } from '@/apis/products.api';
import ProductItem from '../ProductItem/ProductItem';
import { Productinterface } from '@/interface/product.interface';

export default async function Products() {
    const data= await getproducts();
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 py-10 px-2">
        {data?.map((product: Productinterface) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

import { Productinterface } from '@/interface/product.interface';
import RatingStars from '../RatingStar/RatingStars';
import { FaEye } from 'react-icons/fa';
import Link from 'next/link';
import ButtonCom from '../ButtonCom';
import WishListButton from '../wishlistButton';

export default function ProductItem({product}:{product:Productinterface}) {
    function getSalePercentage(beforePrice:number, afterPrice:number):number {
  return Math.round(((beforePrice - afterPrice) / beforePrice) * 100);
}
const salePercentage = product.priceAfterDiscount ? getSalePercentage(product.price, product.priceAfterDiscount) : 0;

  return (
    <div className="p-4 rounded-[8px] border border-border-color">
      <div className="relative">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-1/2 block mx-auto"
        />
        <Link href={`/productsdetails/${product.id}`}>
          <div className="absolute top-0 right-0 rounded-full bg-gray-200 w-5 h-5 justify-center items-center flex">
            <FaEye></FaEye>
          </div>
        </Link>
        <WishListButton id={product.id} cls="absolute top-6 right-0 rounded-full bg-gray-200 w-5 h-5 justify-center items-center flex">❤️</WishListButton>
        {product.priceAfterDiscount && (
          <div className="absolute top-0 left-0 bg-red-500 rounded-md  text-white px-2">
            {salePercentage} %
          </div>
        )}
      </div>
      <h5 className="font-light text-gray-400 my-3">{product.category.name}</h5>
      <p className="line-clamp-2">{product.title}</p>
      <div className="flex gap-2">
        <RatingStars rating={product.ratingsAverage} />
      </div>
      <div className="flex items-center justify-between mt-3">
        <>
          {product.priceAfterDiscount ? (
            <div className="flex gap-3">
              <p className="text-green-500 font-bold">
                {product.priceAfterDiscount}
              </p>
              <p className="line-through text-gray-400 text-md">
                {product.price} EGP
              </p>
            </div>
          ) : (
            <p className=" font-bold">{product.price} EGP</p>
          )}
        </>
        <ButtonCom id={product.id} cls="rounded-circle text-white bg-green-500">+</ButtonCom>
      </div>
    </div>
  );
}

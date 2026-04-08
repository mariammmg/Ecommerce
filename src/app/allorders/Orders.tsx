
import { getOrders } from '@/apis/payment/getorders.api'
import { CartItem, PayProducts } from '@/apis/payment/interfaces/payment.interface';
import { getid } from '@/utlities/getId';
import Link from 'next/link';

export default  async function Orders() {
    const UserId=await getid();
    const data=await getOrders();
    const filteredOrders=data?.filter((order:PayProducts)=>order.user._id===UserId);

    
  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
        
            <div>
              <h1 className="text-xl font-bold">My Orders</h1>
              <p className="text-gray-500 text-sm">
                Track and manage your orders
              </p>
            </div>
          </div>
          <Link href="/">
            <button className="text-green-600 text-sm flex items-center gap-1">
              🛍 Continue Shopping
            </button>
          </Link>
        </div>

        {filteredOrders?.map((order: PayProducts) => (
          <div
            key={order._id}
            className="bg-white border border-green-200 rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <img
                  src={order.cartItems[0].product.imageCover}
                  className="w-16 h-16 rounded-lg border"
                />
                <div>
                  <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">
                    Processing
                  </span>
                  <div className="text-sm text-gray-500 flex gap-3 mt-1">
                    <span>Feb 2, 2026</span>
                    <span>
                      • {filteredOrders?.[0]?.cartItems[0]?.count} Item
                    </span>
                    <span>• {filteredOrders?.[0]?.shippingAddress.city}</span>
                  </div>
                  <p className="mt-2 font-bold">
                    {filteredOrders?.[0]?.totalOrderPrice} EGP
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                Order Items
              </h3>
              {order.cartItems.map((prod: CartItem) => (
                <div
                  key={prod._id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={prod.product.imageCover}
                      className="w-10 h-10 rounded-md"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {prod.product.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {prod.count} × {prod.price} EGP
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold">
                    {prod.price * prod.count} EGP
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  📍 Delivery Address
                </h3>
                <p className="text-sm font-medium">
                  {order.shippingAddress.city}
                </p>
                <p className="text-xs text-gray-500">
                  {order.shippingAddress.details}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  📞 {order.shippingAddress.phone}
                </p>
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  🧾 Order Summary
                </h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{order.totalOrderPrice} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total</span>
                    <span>{order.totalOrderPrice} EGP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

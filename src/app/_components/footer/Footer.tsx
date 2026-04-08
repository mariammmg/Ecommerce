import { Categoryinterface, getCategories } from '@/apis/categories.api';
import Link from 'next/link';
import { FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaLinkedin, FaPaypal, FaTwitter } from 'react-icons/fa';

export default async function Footer() {
    const categories= await getCategories();
  return (
    <div>
  <footer className="bg-[#0b1320] text-[#9ca3af] p-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6">
            <svg className="w-6 h-6 text-[#4ade80]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-2xl font-bold text-[#1f2937]">FreshCart</span>
          </div>
          <p className="text-sm leading-relaxed mb-8 pr-4">
            FreshCart is your one-stop destination for quality products.
            From fashion to electronics, we bring you the best brands at
            competitive prices with a seamless shopping experience.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-[#10b981]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              +1 (800) 123-4567
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#10b981]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              support@freshcart.com
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#10b981]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              123 Commerce Street, New York, NY 10001
            </div>
          </div>
          <div className="flex gap-3 mt-8">
            <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-gray-700 transition-colors">
              <FaFacebook></FaFacebook>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-gray-700 transition-colors">
              <FaInstagram></FaInstagram>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-gray-700 transition-colors">
                <FaTwitter></FaTwitter>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center hover:bg-gray-700 transition-colors">
                <FaLinkedin></FaLinkedin>
            </a>
          </div>
        </div>
        <div className="lg:pl-8">
          <h4 className="text-white font-semibold text-lg mb-6">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                All Products
              </a>
            </li>
            <li>
              <Link href="/categories" className="hover:text-white transition">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-white transition">
                Brands
              </Link>
            </li>
            {categories?.map((cat:Categoryinterface)=><li key={cat._id}>
              <Link href={`/categories/${cat._id}`} className="hover:text-white transition">
                {cat.name}
              </Link>
            </li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Account</h4>
          <ul className="space-y-4 text-sm">
            
            <li>
              <Link href="/allorders" className="hover:text-white transition">
                Order History
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white transition">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white transition">
                Create Account
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Returns &amp; Refunds
              </a>
            </li>
            <li>
              <Link href="/allorders" className="hover:text-white transition">
                Track Order
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-lg mb-6">Legal</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm">© 2026 FreshCart. All rights reserved.</p>
        <div className="flex items-center gap-6 opacity-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium"><FaCcVisa /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium"><FaCcMastercard /></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium"><FaPaypal /></span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

  );
}

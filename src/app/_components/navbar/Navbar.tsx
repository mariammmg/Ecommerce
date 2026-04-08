"use client";


import Link from "next/link";
import { FaHeart, FaShoppingCart, FaBars, FaSearch } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // Ensure you've run: npx shadcn-ui@latest add sheet
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Categoryinterface, getCategories } from "@/apis/categories.api";

export interface Links{
  path: string;
  name: string;
}

export function NavigationMenuDemo() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const { data: categories } = useQuery<Categoryinterface[]|null>({
    queryKey: ["categories"],
    queryFn: async () => {
       const res = await getCategories();
       return res ;
    }
  });

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await fetch("/api/cart");
      return response.json();
    },
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    enabled: isAuthenticated,
    queryFn: async () => {
      const response = await fetch("/api/wishlist");
      return response.json();
    },
  });

  const links :Links[] = [
    { path: "/", name: "Home" },
    { path: "/brands", name: "Brands" },
  ];

  function handleLogout() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <FaShoppingCart className="text-green-600 text-2xl" />
          <h2 className="text-xl font-bold">FreshCart</h2>
        </Link>

        <NavigationMenu className="hidden md:flex ml-auto">
          <NavigationMenuList className="gap-1">
            {links.map((link: Links) => (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.path}
                    className={navigationMenuTriggerStyle()}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[400px] gap-3 p-4 md:w-[500px] flex flex-col lg:w-[300px]">
                  <Link href="/categories">All Categories</Link>
                  {categories?.map((category: Categoryinterface) => (
                    <Link
                      href={`/subcategories/${category._id}`}
                      key={category._id}
                    >
                      {category.name}
                    </Link>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <span className="text-sm text-gray-800">
                Hi, {session?.user?.name}
              </span>
              <CartIcons
                cartCount={cartData?.numOfCartItems}
                wishlistCount={wishlistData?.count}
              />
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium hover:text-green-600"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2">
                <FaBars size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-3">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
                  <FaShoppingCart className="text-green-600" />
                  FreshCart
                </SheetTitle>
              </SheetHeader>

              {/* Sidebar Links */}
              <nav className="mt-8 flex flex-col gap-4">
                {links.map((link: Links) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="text-lg font-medium hover:text-green-600"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/categories"
                  className="text-lg font-medium hover:text-green-600"
                >
                  All Categories
                </Link>

                <hr className="my-2" />

                {/* Mobile Action Icons */}
                <Link
                  href="/wishlist"
                  className="flex items-center gap-4 py-2 hover:bg-gray-50 rounded-lg group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition">
                    <FaHeart />
                  </div>
                  <span className="font-medium">
                    Wishlist ({wishlistData?.count || 0})
                  </span>
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center gap-4 py-2 hover:bg-gray-50 rounded-lg group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                    <FaShoppingCart />
                  </div>
                  <span className="font-medium">
                    Cart ({cartData?.numOfCartItems || 0})
                  </span>
                </Link>

                {/* Mobile Auth */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        href="/login"
                        className="rounded-lg border border-green-600 py-3 text-center font-bold text-green-600"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="rounded-lg bg-green-600 py-3 text-center font-bold text-white"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={handleLogout}
                      className="col-span-2 rounded-lg bg-red-500 py-3 font-bold text-white"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

function CartIcons({
  cartCount,
  wishlistCount,
}: {
  cartCount?: number;
  wishlistCount?: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/wishlist"
        className="relative text-gray-600 hover:text-red-500"
      >
        <FaHeart size={20} />
        {wishlistCount! > 0 && (
          <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {wishlistCount}
          </span>
        )}
      </Link>
      <Link
        href="/cart"
        className="relative text-gray-600 hover:text-green-600"
      >
        <FaShoppingCart size={20} />
        {cartCount! > 0 && (
          <span className="absolute -right-2 -top-2 rounded-full bg-green-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}

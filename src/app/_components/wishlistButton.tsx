"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWish } from "@/apis/wishlist/actions/addWish.action";
interface pageProps {
  children?: React.ReactNode;
  cls: string;
  id: string;
}

export default function WishListButton({ children, cls, id }: pageProps) {
  const queryClient = useQueryClient();
  const { data, mutate } = useMutation({
    mutationFn: addWish,
    onSuccess: () => {
      toast("Product added to wishlist successfully");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => {
      toast("login first");
    },
  });
  async function handleAddToWishlist() {
    mutate(id);
  }
  return (
    <div>
      <Button onClick={handleAddToWishlist} className={cls}>
        {children}
      </Button>
    </div>
  );
}

'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { addToCart } from './ProductItem/actions/addCart.action'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
interface pageProps{
    children?:React.ReactNode,
    cls:string,
    id:string
}

export default function ButtonCom({children, cls, id}:pageProps) {
    const queryClient = useQueryClient();
    const {data,mutate}=useMutation({
        mutationFn:addToCart,
        onSuccess:()=>{
            toast("Product added to cart successfully")
            queryClient.invalidateQueries({queryKey:["cart"]})
        },
        onError:()=>{
            toast("login first")
        }
        
    })
    async function handleAddToCart(){
      mutate(id);
    }
  return (
    
      <Button onClick={handleAddToCart} className={cls}>
        {children}
      </Button>
    
  )
}

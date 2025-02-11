"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart";
import { Product } from "@/types/product";
import { handlePurchase } from "@/sanity/services/stripe";


export default function Buttons({ product }: { product: Product }) {
    const { addToCart } = useCart()
	return (
		<div className="flex">
			<Button
				size="lg"
				className="text-[17px] py-8 w-full bg-white hover:bg-zinc-100 border shadow-none text-zinc-700 rounded-none"
                onClick={() => addToCart(product)}
			>
				Add to cart
			</Button>
			<Button size="lg" onClick={() => handlePurchase({...product, count: 1})} className="text-[17px] py-8 w-full rounded-none">
				Buy now
			</Button>
		</div>
	);
}

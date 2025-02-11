"use client"

import React from 'react'
import { Product } from '@/types/product';
import Link from 'next/link';
import { TbShoppingBagPlus } from 'react-icons/tb';
import Image from 'next/image';
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go"
import { useCart } from '@/stores/cart';

type Props = {
    product: Product;
    small?: boolean;
    averagePurchases?: number; 
}

export default function ProductCard(props: Props) {
    const { product, small, averagePurchases } = props;

    const admin = !!averagePurchases;
    const isAboveAverage = product.purchases > (averagePurchases || 0)
    const {addToCart} = useCart()
    return (
    <Link target={admin ? '_blank' : '_self'} href={`/product/${product._id}`} className="space-y-3 group">
        <div className={`group relative w-full ${small ? 'h-[200px]' : 'h-[400px]'} flex justify-center items-center bg-secondary`}>
        
            {admin ? null : ( <TbShoppingBagPlus className="absolute right-8 top-3 opacity-0 transition-all group-hover:opacity-100 z-[1] text-xl" onClick={() => addToCart({ ...product, count: 1 })} />)}

            <Image src={product.image} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt='' className="object-contain p-10 group-hover:opacity-65 transition-all" />
        </div>
        {admin ? (
            <div className="flex items-center gap-1.5 border-b pb-3 border-b-zinc-200">
                <div className="flex items-center gap-1">
                    {isAboveAverage ? (
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-green-500"></div>
                            <GoArrowUpRight />
                        </div>
                    ): (
                        <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded bg-red-500"></div>
                            <GoArrowDownRight />
                        </div>
                    )}
                </div>
                <span className="font-semibold">
                    {product.purchases}
                </span>
                <span className="font-semibold text-zinc-700">{isAboveAverage ? 'above' : 'below'} Average {`(${averagePurchases})`}</span>
            </div>
        ): null }
        <p className="font-bold text-primary/80">{product.title}</p>
        <p>{product.price}$</p>
    </Link>
    )
}

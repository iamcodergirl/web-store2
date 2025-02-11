
import ProductCarousel from '@/components/ProductCarousel'
import { getProduct, getRelatedProducts } from '@/sanity/services/product'
import Image from 'next/image'
import React from 'react'
import Buttons from './Buttons'

export default async function Page({ params }: { params: { id: string } }) {

    const { id } = await params;
 
    const [product, relatedProducts] = await Promise.all([
        getProduct(id),
        getRelatedProducts(id)
    ])  
    return (
    <div className="md:grid grid-cols-2 md:h-screen w-full">
        <div className="relative md:h-full h-[400px] w-full flex justify-center items-center">
            <Image src={product.image} alt='' fill className="object-contain p-20" />
        </div>
        <div className="border-l border-l-zinc-200 h-full">
            <div className="flex flex-col justify-center p-20 gap-3">
                <span className="text-5xl font-black p-4 border" style={{color: product.color}}>{product.title}</span>
                <span className="text-4xl font-semibold" style={{color: product.color}}>{product.price}$</span>
                <Buttons product={product} />
            </div>

            <div className="border-t border-zinc-200">
                <ProductCarousel relatedProducts={relatedProducts} />
            </div>
        </div>
    </div>
    )
}

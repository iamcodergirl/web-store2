

import { Product } from "@/types/product";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartProduct = Product & { count: number };
type Store = {
    products: CartProduct[];
    length: number;
    total: number;
    addToCart: (p: Product) => void;
    removeAllFromCart: (id: string) => void;
    decProduct: (id: string) => void;
};

export const useCart = create<Store>()(
    persist<Store>((set) => ({
        products: [],
        length: 0,
        total: 0,
        addToCart: (product) => set((state) => {
            const alrExists = state.products.some(prod => prod._id === product._id)

            let newProducts;
            if (alrExists) {
                newProducts = state.products.map((prod) => {
                    if (prod._id === product._id) {
                        return {
                            ...prod,
                            count: prod.count + 1
                        }
                    } else return prod
                }) as CartProduct[]
            } else {
                const newProduct = { ...product, count: 1 } as CartProduct
                newProducts = [...state.products, newProduct]
            }

            return { products: newProducts, length: newProducts?.length, total: calculateTotal(newProducts) };
        }),    
        removeAllFromCart: () => {}, 
        decProduct: (id) => set((state) => {
            const nProducts = [] as CartProduct[]
            state.products.forEach((product) => {
                if (product._id === id) {
                    if (product.count > 1) {
                        nProducts.push({ ...product, count: product.count - 1 })
                    }
                } else {
                    nProducts.push(product)
                }
            })
            return {products: nProducts, length: nProducts.length, total: calculateTotal(nProducts)};
        }),

    }), { name: "swrld-cart" })
);

function calculateTotal(products: CartProduct[]){
    let total = 0;
    products.forEach(product => {
        total = total + (product.count * product.price)
    })
    return total;
}

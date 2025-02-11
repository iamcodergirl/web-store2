import React from 'react'
import { getBestSellingProducts } from '@/sanity/services/product'
import Status from './Status'
import Chart from './Chart'
import BestSelling from './BestSelling';

export default async function Page() {
  const bestSellingProducts = await getBestSellingProducts();

  const randomProducts = [
    bestSellingProducts[1],
    bestSellingProducts[7],
    bestSellingProducts[1],
    bestSellingProducts[3],
    bestSellingProducts[0],
  ];

		
    // const totalPurchases =  bestSellingProducts.reduce((sum, product) => sum + (product.purchases || 0), 0);

    // const averagePurchases = Math.round(totalPurchases / bestSellingProducts.length);
  
  return (
    <div className="flex flex-col gap-8 p-12 pt-20">
      <Status />
      <Chart products={randomProducts} />
      <BestSelling products={bestSellingProducts} />
    </div>
  )
}

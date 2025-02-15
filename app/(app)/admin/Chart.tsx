"use client";

import React, { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Product } from "@/types/product";

const chartConfig = {
  views: {
    label: "Page Views"
  },
  purchases: {
    label: "Purchases",
    color: "hsl(var(--chart-1))"
  }
} satisfies ChartConfig;

export default function Chart({ products }: { products: Product[] }) {

  const data = useMemo(() => {
    return products.map((product) => ({product: product.title, purchases: product.purchases || 0 }))
  }, [products])

	const total = useMemo(() => {
		return data.reduce((acc, curr) => acc + curr.purchases, 0);
	}, [data]);
	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1px-6 py-6 sm:py-6">
					<CardTitle>Line Chart - Interactive</CardTitle>
					<CardDescription>
						Showing total purchases of the last 3 months
					</CardDescription>
				</div>
				<div className="flex">
					<button className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
						<span className="text-sm text-muted-foreground">
							Purchases
						</span>
						<span className="text-lg font-bold leading-none sm:text-3xl">
							{total}
						</span>
					</button>
				</div>
			</CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <LineChart accessibilityLayer data={data} margin={{left: 12, right: 12}}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="pruduct" tickLine={true} axisLine={true} tickMargin={8} minTickGap={32} />
            <ChartTooltip content={
              <ChartTooltipContent className="w-[150px]" nameKey="purchases" />
            } />
            <Line dataKey="purchases" stroke="#ff0000" />
          </LineChart>
        </ChartContainer>
      </CardContent>
		</Card>
	);
}

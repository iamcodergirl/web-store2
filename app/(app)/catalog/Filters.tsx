"use client";
import { Product } from "@/types/product";
import { Slider } from "@/components/ui/slider";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
	products: Product[];
	setProducts: (products: Product[]) => void;
};

export default function Filters({ products, setProducts }: Props) {
	const colors = useMemo(
		() => (products || []).map((product) => product.color),
		[products]
	);

	const { min, max } = useMemo(() => {
		let max = 0;
		let min = Infinity;

		products.forEach((priceProd, indexProd) => {
			if (indexProd === 0) {
				max = priceProd.price;
				min = priceProd.price;
			}
			if (priceProd.price > max) {
				max = priceProd.price;
			}
			if (priceProd.price < min) {
				min = priceProd.price;
			}
		});
		return { max, min };
	}, [products]);

	const [minPrice, setMinPrice] = useState(min);
	const [selectColors, setSelectColors] = useState<string[]>([]);

	useEffect(() => {
		setMinPrice(min);
	}, [min]);

	const isColorSelected = (color: string) => selectColors.includes(color);

	const toggleColor = (color: string) => {
		setSelectColors((prevColors) =>
			prevColors.includes(color)
				? prevColors.filter((value) => value !== color)
				: [...prevColors, color]
		);
	};

	useEffect(() => {
		let filteredProducts = products;

		// Фильтрация по цветам
		filteredProducts =
			selectColors.length === 0
				? products
				: filteredProducts.filter((prod) =>
						selectColors.includes(prod.color)
					);

		// Фильтрация по цене
		filteredProducts = filteredProducts.filter(
			(prod) => prod.price >= minPrice
		);

		setProducts(filteredProducts);
	}, [selectColors, minPrice, products, setProducts]);

	return (
		<div className="flex flex-col gap-6 px-6 py-10">
			<div className="space-y-2">
				<span className="font-semibold text-zinc-500 text-sm">
					Price Range
				</span>
				<div className="flex items-center gap-1">
					<span>{min}$</span>
					<Slider
						defaultValue={[max]}
						min={min}
						value={[minPrice]}
						max={max}
						step={1}
						onValueChange={(value) => setMinPrice(value[0])}
					/>
					<span>{max}$</span>
				</div>
			</div>
			<div className="space-y-2">
				<span className="font-semibold text-zinc-500 text-sm">
					Colors
				</span>
				<div className="flex flex-wrap gap-2">
					{colors.map((color) => {
						return (
							<div
								key={color}
								onClick={() => toggleColor(color)}
								className={`h-[50px] w-[50px] transition-all ${isColorSelected(color) ? "border border-zinc-600 p-1" : ""}`}
							>
								<div
									className="w-full h-full aspect-square"
									style={{ background: color }}
								></div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

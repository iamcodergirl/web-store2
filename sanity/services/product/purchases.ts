"use server"

import { sanity } from "@/sanity/lib/client"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { CartProduct } from "@/stores/cart";
import { revalidatePath } from "next/cache";

const sk = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || ""

export async function updatePurchases() {
	const cookiesStore = await cookies();
	const token = cookiesStore.get("purchase_products")?.value;
	if (!token) return;
	const { products } = jwt.verify(token, sk) as { products: CartProduct[] };
	if (!products) return;
	await Promise.all(
		products.map((product) =>
			sanity
				.patch(product._id)
				.setIfMissing({ purchases: 0 })
				.inc({ purchases: product.count })
				.commit()
		)
	);
    revalidatePath("/admin");
    cookiesStore.delete("purchase_products")
    
}

"use server"

import { sanity } from "@/sanity/lib/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const sk = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || ""
export type Admin = { email: string, password: string }


export async function handleLogin(admin: Admin) {
    const token = jwt.sign(admin, sk)
    const cookiesStore = await cookies(); 
    cookiesStore.set("admin_token", token)
}

export async function handleIsAdmin(admin: Admin){
    const query = `*[_type=="admin" && password=="${admin.password} && email===${admin.email}"]`
    const result = await sanity.fetch(query)
   
    return !!result as boolean
}

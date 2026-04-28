"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type JwtPayload = {
    name: string;
    mobile: string;
    email: string;
    password: string;
    id: string;
};

export async function getUserFromToken(): Promise<JwtPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) return null;

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
        ) as JwtPayload;

        return decoded;
    } catch (error) {
        return null;
    }
}

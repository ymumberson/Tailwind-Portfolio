"use server"
import { cookies } from "next/headers";

export async function getCookie(cookieName: string) {
    const cookie = (await cookies()).get(cookieName);
    return cookie ? cookie.value : "";
}

export async function setCookie(cookieName: string, cookieValue: string) {
    const cookiesData = await cookies();
    cookiesData.set(cookieName, cookieValue);
}
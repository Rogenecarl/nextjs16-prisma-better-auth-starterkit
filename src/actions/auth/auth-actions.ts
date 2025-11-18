"use server"

import { SignInSchema, SignUpUserSchema } from "@/schemas";
import z from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";


export async function signIn(values: z.infer<typeof SignInSchema>) {


    const validatedFields = SignInSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields provided." };
    }
    const { email, password } = validatedFields.data;

    try {
        const res = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            headers: await headers(),
        });

        if (res.user) {
            // Fetch user with role from database
            const userWithRole = await prisma.user.findUnique({
                where: { id: res.user.id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    image: true,
                    emailVerified: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            console.log("User signed in:", userWithRole);
            console.log("User role:", userWithRole?.role);

            // Return success first, then redirect
            const result = {
                status: true,
                data: res,
                user: userWithRole,
            };

            // Role-based redirection
            if (userWithRole?.role === "ADMIN") {
                redirect("/admin/dashboard");
            } else if (userWithRole?.role === "PROVIDER") {
                redirect("/provider/dashboard");
            } else {
                redirect("/find-services");
            }

            return result;
        }

        return {
            status: false,
            error: "Sign in failed",
        };
    } catch (error) {
        // Don't catch NEXT_REDIRECT errors - let them bubble up
        if (
            error &&
            typeof error === "object" &&
            "digest" in error &&
            typeof error.digest === "string" &&
            error.digest.startsWith("NEXT_REDIRECT")
        ) {
            throw error;
        }

        console.log("Sign in error:", error);
        return {
            status: false,
            error: error instanceof Error ? error.message : "Sign in failed",
        };
    }
}

export async function signUpUser(values: z.infer<typeof SignUpUserSchema>) {

    try {
        const validatedFields = SignUpUserSchema.safeParse(values);

        if (!validatedFields.success) {
            return { error: "Invalid fields provided." };
        }
        const { name, email, password } = validatedFields.data;
        const res = await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
            headers: await headers(),
        });

        if (res.user) {
            console.log("User signed up:", res.user);
            return {
                status: true,
                data: res,
                user: res.user,
            };
        }

        return {
            status: false,
            error: "Failed to create user",
        };
    } catch (error) {
        console.log("Sign up error:", error);
        return {
            status: false,
            error: error instanceof Error ? error.message : "Sign up failed",
        };
    }
}
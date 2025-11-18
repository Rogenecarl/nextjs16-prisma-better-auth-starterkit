"use client"

import { signIn } from "@/actions/auth/auth-actions"
import { signInWithGoogle } from "@/actions/auth/google-auth-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SignInSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { isRedirectError } from "@/lib/utils/redirect-helper"

export function SignInForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof SignInSchema>) {
        setIsLoading(true);
        const toastId = toast.loading("Signing in...");

        try {
            const result = await signIn(values);

            // If we get here, signin failed (successful signin redirects)
            if (!result.success) {
                toast.error(result.error, { id: toastId });
            }
        } catch (error) {
            // Check if it's a redirect error (which means success)
            if (isRedirectError(error)) {
                toast.success("Signed in successfully", { id: toastId });
                // Don't set loading to false, let the redirect happen
                return;
            }

            toast.error("An unexpected error occurred", { id: toastId });
            console.error("Sign in error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Sign in to your account
                                    </p>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="m@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center">
                                                <FormLabel>Password</FormLabel>
                                                <Link
                                                    href="#"
                                                    className="ml-auto text-sm underline-offset-2 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Field>
                                    <Button type="submit" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Login"}
                                    </Button>
                                </Field>
                                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                    Or continue with
                                </FieldSeparator>
                                <Field className="flex">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                        tabIndex={-1}
                                        onClick={signInWithGoogle}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            className="h-4 w-4 mr-2"
                                        >
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Login with Google
                                    </Button>
                                </Field>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/auth/sign-up">Sign up</Link>
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                    </Form>
                    <div className="bg-muted relative hidden md:block">
                        <Image
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            width={40}
                            height={40}
                        />
                    </div>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}

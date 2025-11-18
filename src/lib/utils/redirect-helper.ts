/**
 * Check if error is a Next.js redirect error
 * Next.js uses this special error to handle redirects in Server Actions
 */
export function isRedirectError(error: unknown): boolean {
    return (
        error !== null &&
        typeof error === "object" &&
        "digest" in error &&
        typeof (error as { digest: unknown }).digest === "string" &&
        (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    );
}

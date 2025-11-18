import { AppSidebar } from "@/components/provider-components/provider-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserProvider } from "@/context/UserContext"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type { User } from "@/schemas"

export default async function ProviderLayout({ children }: { children: React.ReactNode }) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/auth/sign-in");
    }

    const user = session?.user as User;
    return (
        <UserProvider user={user}>
            <SidebarProvider>
                <AppSidebar />

                <SidebarInset>
                    {/* HEADER */}
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                        </div>
                    </header>

                    {/* PAGE CONTENT */}
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </UserProvider>
    )
}

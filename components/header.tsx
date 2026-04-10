"use client";

import { usePathname } from "next/navigation";
import { useNavigate } from "@/context/navigation";
import { authClient } from "@/lib/auth/client";
import { LogOut } from "lucide-react";
import { SkeletonAuthPill } from "@/components/skeletons";

// always show all nav links — middleware handles redirecting unauthenticated users to /login
const navItems = [
    { label: "Home",             href: "/" },
    { label: "Apply",            href: "/volunteer" },
    { label: "Events",           href: "/events" },
    { label: "Volunteer Portal", href: "/portal" },
    { label: "Admin",            href: "/admin" },
];

export default function Header(): React.JSX.Element {
    const pathname = usePathname();
    const navigate = useNavigate();

    // data is null when logged out, isPending is true on first load
    const { data: session, isPending } = authClient.useSession();
    const isLoggedIn = !!session?.user;

    // sign out and redirect to the home page
    const handleSignOut = async () => {
        await authClient.signOut();
        navigate("/");
    };

    return (
        <header
            className="text-white shadow-lg sticky top-0 z-50"
            style={{ background: "linear-gradient(135deg, #003366 0%, #1d4ed8 100%)" }}
        >
            <div className="mx-auto px-6 flex items-center justify-between h-[70px]">
                {/* Logo */}
                <button onClick={() => navigate("/")} className="flex items-center gap-3">
                    <img
                        src="/SC-Econ-logo.png"
                        alt="SC Economics"
                        className="h-12 w-auto"
                    />
                </button>

                {/* Nav links + auth controls */}
                <nav className="flex items-center gap-1">
                    {navItems.map(({ label, href }) => (
                        <button
                            key={href}
                            onClick={() => { if (pathname !== href) navigate(href); }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            style={{
                                backgroundColor: pathname === href ? "#1d4ed8" : "transparent",
                            }}
                        >
                            {label}
                        </button>
                    ))}

                    {/* auth area: loading → signed in (name + sign out) → signed out (login button) */}
                    {isPending ? (
                        <SkeletonAuthPill />
                    ) : isLoggedIn ? (
                        <div className="flex items-center gap-2 ml-2 pl-3 border-l border-white/20">
                            <span className="text-sm text-blue-200 hidden md:inline">
                                {session.user.name || session.user.email}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                                title="Sign out"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden md:inline">Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { if (pathname !== "/login") navigate("/login"); }}
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            style={{
                                backgroundColor: pathname === "/login" ? "#1d4ed8" : "transparent",
                            }}
                        >
                            Login
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

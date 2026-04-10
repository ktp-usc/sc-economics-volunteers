"use client";

import { useEffect } from "react";
import { useNavigate } from "@/context/navigation";
import { SkeletonVolunteerPortal } from "@/components/skeletons";

// This page just reads the user's role and redirects them to the right place.
// Once Neon Auth is wired up, swap the localStorage hack below for the real session.
export default function PortalGatePage() {
    const navigate = useNavigate();

    useEffect(() => {
        // TODO: swap this out for the real session role once Neon Auth is hooked up
        // e.g. const role = session?.user?.role
        const role =
            (typeof window !== "undefined"
                ? localStorage.getItem("__dev_role")
                : null) ?? "volunteer";

        const destinations: Record<string, string> = {
            volunteer: "/portal/volunteer",
            admin:     "/admin",
            manager:   "/manager",
        };

        navigate(destinations[role] ?? "/login");
    }, [navigate]);

    // show a skeleton while the redirect happens
    return <SkeletonVolunteerPortal />;
}

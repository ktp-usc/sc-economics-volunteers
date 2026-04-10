"use client";

import { Skeleton } from "@/components/ui/skeleton";

// ── Nav / auth ────────────────────────────────────────────────────────────────

// loading pill in the header while we wait for the session check
export function SkeletonAuthPill() {
    return (
        <div className="ml-2 pl-3 border-l border-white/20 flex items-center">
            <div className="h-8 w-20 rounded-full animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
        </div>
    );
}

// ── Volunteer portal ──────────────────────────────────────────────────────────

// same layout as StatCard
export function SkeletonStatCard() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50 flex items-start gap-4">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1">
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-28 mb-1" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>
    );
}

// same layout as EventRow
export function SkeletonEventRow() {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl border bg-white border-gray-100">
            <Skeleton className="w-5 h-5 rounded-full shrink-0" />
            <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-20 rounded-full" />
                </div>
                <div className="flex flex-wrap gap-3">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>
            <div className="text-center shrink-0">
                <Skeleton className="h-5 w-10 mx-auto mb-1" />
                <Skeleton className="h-3 w-8 mx-auto" />
            </div>
        </div>
    );
}

// full portal page skeleton — used on /portal while redirecting and on /portal/volunteer while loading
export function SkeletonVolunteerPortal() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner */}
            <div
                className="text-white py-10 px-4"
                style={{ background: "linear-gradient(135deg, #001f4d 0%, #003366 55%, #1d4ed8 100%)" }}
            >
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div
                            className="w-16 h-16 rounded-2xl shrink-0 animate-pulse"
                            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        />
                        <div>
                            <div className="h-7 w-44 mb-2 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                            <div className="h-4 w-48 mb-1.5 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                            <div className="h-3 w-56 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-9 w-28 rounded-xl animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                        <div className="h-9 w-24 rounded-xl animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 flex">
                    {[80, 64, 72].map((w) => (
                        <Skeleton key={w} className="h-12 rounded-none" style={{ width: w }} />
                    ))}
                </div>
            </div>

            {/* Body — overview tab skeleton */}
            <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
                {/* Stats */}
                <div>
                    <Skeleton className="h-5 w-24 mb-4" />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <SkeletonStatCard />
                        <SkeletonStatCard />
                    </div>
                </div>

                {/* Progress card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <Skeleton className="h-5 w-40 mb-1.5" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-7 w-24" />
                    </div>
                    <Skeleton className="h-3 w-full rounded-full" />
                    <Skeleton className="h-3 w-56 mt-2" />
                </div>

                {/* Recent events */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-5 w-28" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <SkeletonEventRow />
                        <SkeletonEventRow />
                        <SkeletonEventRow />
                    </div>
                </div>

                {/* Upcoming commitments */}
                <div
                    className="rounded-2xl p-6"
                    style={{ background: "linear-gradient(135deg, #003366 0%, #1d4ed8 100%)" }}
                >
                    <div className="h-6 w-48 mb-2 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                    <div className="h-4 w-56 mb-4 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                    <div className="flex flex-col gap-2">
                        {[0, 1].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl px-4 py-3"
                            >
                                <div>
                                    <div className="h-4 w-44 mb-1.5 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                                    <div className="h-3 w-36 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                                </div>
                                <div className="text-right">
                                    <div className="h-5 w-10 ml-auto mb-1 rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
                                    <div className="h-3 w-16 ml-auto rounded-md animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Events page ───────────────────────────────────────────────────────────────

// same layout as EventCard on /events
export function SkeletonEventCard() {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
            <Skeleton className="h-40 rounded-none" />
            <div className="p-5 flex flex-col flex-1 gap-3">
                <div className="flex gap-1.5">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-3 w-28" />
                    <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-10 w-full rounded-lg mt-auto" />
            </div>
        </div>
    );
}

// ── Admin ─────────────────────────────────────────────────────────────────────

// the four stat cards across the top of the admin dashboard
export function SkeletonAdminStatCards() {
    return (
        <div className="grid grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex items-center gap-4"
                >
                    <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                    <div>
                        <Skeleton className="h-7 w-12 mb-1" />
                        <Skeleton className="h-3 w-28" />
                    </div>
                </div>
            ))}
        </div>
    );
}

// skeleton for a single application row
export function SkeletonApplicationRow() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-4">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-4 w-16 rounded-full" />
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-3 w-40" />
                        <Skeleton className="h-3 w-28" />
                    </div>
                </div>
                <div className="flex gap-2 shrink-0">
                    <Skeleton className="h-7 w-20 rounded-lg" />
                    <Skeleton className="h-7 w-14 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

// skeleton for a volunteer card
export function SkeletonVolunteerCard() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-32 mb-1.5" />
                    <Skeleton className="h-3 w-40" />
                </div>
                <div className="shrink-0 text-right">
                    <Skeleton className="h-6 w-10 ml-auto mb-1" />
                    <Skeleton className="h-3 w-8 ml-auto" />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-36" />
            </div>
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-6 w-full rounded-full" />
            <div className="flex gap-2 mt-auto">
                <Skeleton className="h-9 flex-1 rounded-lg" />
                <Skeleton className="h-9 flex-1 rounded-lg" />
            </div>
        </div>
    );
}

// skeleton for an event card in the admin view
export function SkeletonAdminEventCard() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <Skeleton className="h-5 w-56" />
                            <Skeleton className="h-5 w-24 rounded-full" />
                        </div>
                        <div className="flex gap-4 mb-2">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-3 w-28" />
                        </div>
                        <Skeleton className="h-4 w-full mb-1.5" />
                        <Skeleton className="h-4 w-2/3 mb-3" />
                        <Skeleton className="h-1.5 w-full rounded-full" />
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <Skeleton className="h-7 w-20 rounded-lg" />
                        <Skeleton className="h-7 w-7 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// hours log table with a real header and 3 fake rows
export function SkeletonHoursTable() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider">
                        <th className="px-5 py-3 text-left">Volunteer</th>
                        <th className="px-5 py-3 text-left">Event</th>
                        <th className="px-5 py-3 text-left">Hours</th>
                        <th className="px-5 py-3 text-left">Note</th>
                        <th className="px-5 py-3 text-left">Date</th>
                        <th className="px-5 py-3" />
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {[0, 1, 2].map((i) => (
                        <tr key={i}>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-28 mb-1" />
                                <Skeleton className="h-3 w-36" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-44" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-4 w-10" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-3 w-24" />
                            </td>
                            <td className="px-5 py-3.5">
                                <Skeleton className="h-3 w-20" />
                            </td>
                            <td className="px-5 py-3.5 text-right">
                                <Skeleton className="h-7 w-7 rounded-lg ml-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

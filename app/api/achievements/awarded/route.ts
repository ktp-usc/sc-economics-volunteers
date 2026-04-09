import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStaff } from "@/lib/auth";

/**
 * GET /api/achievements/awarded
 * Staff only — returns all UserAchievement records with achievement details.
 */
export async function GET() {
    const staff = await getAuthenticatedStaff();
    if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const awarded = await db.userAchievement.findMany({
        include: { achievement: true },
        orderBy: { awardedAt: "desc" },
    });
    return NextResponse.json(awarded);
}
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { db } from "@/lib/db";

/**
 * GET /api/me/achievements
 * Returns the logged-in user's earned achievements + all available achievements.
 */
export async function GET() {
    const { data: session } = await auth.getSession();
    if (!session?.user) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id ?? "";

    const [earned, all] = await Promise.all([
        db.userAchievement.findMany({
            where: { userId },
            include: { achievement: true },
            orderBy: { awardedAt: "desc" },
        }),
        db.achievement.findMany({ orderBy: { name: "asc" } }),
    ]);

    return NextResponse.json({ earned, all });
}
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStaff } from "@/lib/auth";

/**
 * POST /api/achievements/award
 * Staff only — award an achievement to a volunteer.
 * Body: { userId, userEmail, achievementId }
 */
export async function POST(req: NextRequest) {
    const staff = await getAuthenticatedStaff();
    if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { userId, userEmail, achievementId } = await req.json();
        if (!userId || !userEmail || !achievementId) {
            return NextResponse.json(
                { error: "userId, userEmail, and achievementId are required." },
                { status: 400 }
            );
        }

        const achievement = await db.achievement.findUnique({ where: { id: Number(achievementId) } });
        if (!achievement) return NextResponse.json({ error: "Achievement not found." }, { status: 404 });

        const award = await db.userAchievement.create({
            data: {
                userId,
                userEmail,
                achievementId: Number(achievementId),
                awardedBy: staff.email,
            },
            include: { achievement: true },
        });
        return NextResponse.json(award, { status: 201 });
    } catch (e: unknown) {
        // Prisma unique constraint = already awarded
        if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002") {
            return NextResponse.json({ error: "This volunteer already has that achievement." }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to award achievement." }, { status: 500 });
    }
}
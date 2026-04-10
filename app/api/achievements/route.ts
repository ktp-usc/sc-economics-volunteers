import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthenticatedStaff } from "@/lib/auth";

/**
 * GET /api/achievements
 * Public (authenticated) — returns all achievements.
 */
export async function GET() {
    const achievements = await db.achievement.findMany({
        orderBy: { name: "asc" },
    });
    return NextResponse.json(achievements);
}

/**
 * POST /api/achievements
 * Staff only — create a new achievement definition.
 * Body: { name, description, icon, criteria }
 */
export async function POST(req: NextRequest) {
    const staff = await getAuthenticatedStaff();
    if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { name, description, icon, criteria } = await req.json();
        if (!name || !description || !icon || !criteria) {
            return NextResponse.json({ error: "name, description, icon, and criteria are required." }, { status: 400 });
        }
        const achievement = await db.achievement.create({
            data: { name, description, icon, criteria },
        });
        return NextResponse.json(achievement, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to create achievement." }, { status: 500 });
    }
}
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

//btw we will need to swap for auth.getSession() from lib/auth/server when SCEV-25 merges
async function getUserId(): Promise<number | null> {
    const jar = await cookies();
    const raw = jar.get("userId")?.value;
    if (!raw) return null;
    const id = parseInt(raw, 10);
    return isNaN(id) ? null : id;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const userId = await getUserId();
    if (userId === null) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let user;
    try {
        user = await db.user.findUnique({ where: { id: userId } });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

    if (!user || user.role !== "volunteer") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const eventId = parseInt(id, 10);
    if (isNaN(eventId)) {
        return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    if (typeof body !== "object" || body === null) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { why, fromTime, toTime, certificate, expertise } = body as Record<string, unknown>;

    const missing: string[] = [];
    if (!why || typeof why !== "string" || !why.trim()) missing.push("why");
    if (!fromTime || typeof fromTime !== "string" || !fromTime.trim()) missing.push("fromTime");
    if (!toTime || typeof toTime !== "string" || !toTime.trim()) missing.push("toTime");
    if (certificate === undefined || certificate === null) missing.push("certificate");

    if (missing.length > 0) {
        return NextResponse.json({ error: "Missing required fields", fields: missing }, { status: 400 });
    }

    try {
        const event = await db.event.findUnique({ where: { id: eventId } });
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        const existing = await db.eventSignup.findFirst({ where: { eventId, userId } });
        if (existing) {
            return NextResponse.json({ error: "Already signed up for this event" }, { status: 409 });
        }

        const signup = await db.eventSignup.create({
            data: {
                eventId,
                userId,
                why: (why as string).trim(),
                fromTime: (fromTime as string).trim(),
                toTime: (toTime as string).trim(),
                certificate: certificate === true || certificate === "yes",
                expertise: typeof expertise === "string" && expertise.trim() ? expertise.trim() : null,
            },
        });

        return NextResponse.json({ data: signup }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

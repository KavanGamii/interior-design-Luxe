import { NextResponse } from "next/server";
import { getConfig, updateConfig } from "@/lib/db";

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json(config);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const success = await updateConfig(data);
    if (!success) throw new Error("Database update returned failure status");
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Config Update API Error:", error.message);
    return NextResponse.json({ 
      error: "Failed to update config",
      message: error.message
    }, { status: 500 });
  }
}

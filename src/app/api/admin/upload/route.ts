import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Determine content type
    const contentType = file.type || 'application/octet-stream';
    const ext = file.name.split(".").pop();
    const filename = `${uuidv4()}.${ext}`;

    // Upload to Vercel Blob
    const blob = await put(`uploads/${filename}`, file, {
      access: 'public',
      contentType: contentType,
    });

    return NextResponse.json({ 
      success: true, 
      url: blob.url 
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: "Failed to upload file",
      message: error.message 
    }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { readdir, stat, unlink } from "fs/promises";
import { join } from "path";

// Supported file extensions
const ALLOWED_EXTENSIONS = [
  ".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif", // Images
  ".mp4", ".webm", ".mov",                                  // Videos
  ".pdf"                                                    // Documents
];

async function getFilesRecursively(dir: string, baseDir: string): Promise<any[]> {
  const files = await readdir(dir);
  const result: any[] = [];

  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      if (file !== "uploads" || dir === baseDir) {
         const nested = await getFilesRecursively(filePath, baseDir);
         result.push(...nested);
      }
    } else {
      const ext = "." + file.split(".").pop()?.toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        const relativePath = filePath.replace(baseDir, "").replace(/\\/g, "/");
        
        // Determine type
        let type = "image";
        if ([".mp4", ".webm", ".mov"].includes(ext)) type = "video";
        if (ext === ".pdf") type = "pdf";

        result.push({
          name: file,
          url: relativePath,
          size: fileStat.size,
          updatedAt: fileStat.mtime,
          type
        });
      }
    }
  }

  return result;
}

export async function GET() {
  try {
    const publicDir = join(process.cwd(), "public");
    const files = await getFilesRecursively(publicDir, publicDir);
    
    // Sort by most recent
    files.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    return NextResponse.json(files);
  } catch (error) {
    console.error("Media list error:", error);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Resolve the local path from the public URL
    const publicDir = join(process.cwd(), "public");
    const filePath = join(publicDir, url);

    // Verify the path is within the public directory for security
    if (!filePath.startsWith(publicDir)) {
      return NextResponse.json({ error: "Invalid path" }, { status: 403 });
    }

    await unlink(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}

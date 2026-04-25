import { NextResponse } from "next/server";
import { 
  getLocalData, 
  getProjects, 
  getConfig, 
  getJournalPosts, 
  getSitePages,
  clientPromise 
} from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");

    // Fetch all local data
    const localData = await getLocalData();
    const { projects, journal, config, site_pages } = localData;

    // Migrate Projects
    if (projects && projects.length > 0) {
      await db.collection("projects").deleteMany({});
      const projectsToInsert = projects.map((p: any) => {
        const { _id, ...rest } = p;
        return { ...rest, createdAt: new Date() };
      });
      await db.collection("projects").insertMany(projectsToInsert);
    }

    // Migrate Journal
    if (journal && journal.length > 0) {
      await db.collection("journal").deleteMany({});
      await db.collection("journal").insertMany(journal);
    }

    // Migrate Config
    if (config) {
      await db.collection("config").deleteMany({});
      await db.collection("config").insertOne(config);
    }

    // Migrate Site Pages
    if (site_pages && site_pages.length > 0) {
      await db.collection("site_pages").deleteMany({});
      await db.collection("site_pages").insertMany(site_pages);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Data migrated successfully to cloud database.",
      details: {
        projects: projects?.length || 0,
        pages: site_pages?.length || 0,
        posts: journal?.length || 0
      }
    });
  } catch (error: any) {
    console.error("Migration error:", error);
    return NextResponse.json({ 
      error: "Migration failed", 
      message: error.message 
    }, { status: 500 });
  }
}

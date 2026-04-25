import clientPromise from "./mongodb";
import { promises as fs } from "fs";
import path from "path";
import { ObjectId } from "mongodb";

export { clientPromise };

const DB_PATH = path.join(process.cwd(), "src/data/db.json");

// Default data for the fallback
const DEFAULT_DATA = {
  projects: [],
  journal: [],
  site_pages: [],
  config: {
    id: "global",
    heroTitle: "Crafting Elevated Spaces.",
    heroSubtitle: "Luxury Interior Design Studio",
    contactEmail: "hello@luxeinteriors.com",
    contactPhone: "+44 (0) 20 7946 0123",
    contactAddress: "124 Baker Street, London, W1U 6TY",
    socials: {
      instagram: "https://instagram.com/luxe",
      pinterest: "https://pinterest.com/luxe",
      linkedin: "https://linkedin.com/company/luxe"
    },
    theme: {
      accentGold: "#c5a572",
      charcoal: "#1a1a1a",
      cream: "#fcfaf5",
      mutedBrown: "#8d775f"
    },
    privacyContent: `# Privacy Architecture

At LUXE INTERIORS, we handle your data with the same precision and intent as we do our architectural projects. Your privacy is a cornerstone of our relationship.

## 1. Information We Collect
We collect information that allows us to provide a bespoke architectural experience. This includes:
- Personal Identifiers (Name, Email, Professional Title)
- Project Specifications and Vision Documents
- Technical Engagement Data (Analytics)

## 2. Our Commitment to Discretion
We do not sell, trade, or distribute your personal or project data. Information is shared only with certified structural partners directly involved in your project's execution.

## 3. Data Integrity
Your digital assets and credentials are encrypted within our studio's private cloud infrastructure.

## 4. Contact
For inquiries regarding our privacy protocols, contact: privacy@luxeinteriors.com`,
    termsContent: `# Terms of Engagement

Engaging with LUXE INTERIORS signifies an agreement to our studio standards and architectural philosophy.

## 1. Scope of Vision
Our services are provided as bespoke architectural and interior consultations. All design intent remains the intellectual property of LUXE INTERIORS until final project delivery.

## 2. Professional Standards
We adhere to the highest international standards of design and structural integrity. Every project is a collaborative journey between client vision and studio expertise.

## 3. Intellectual Property
Visual assets, renders, and blueprints provided during the design phase are for the client's internal review only and may not be reproduced without written studio consent.

## 4. Governing Law
These terms are governed by the laws of the jurisdiction in which the studio headquarters resides.`
  }
};

export async function getLocalData() {
  try {
    const data = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (e) {
    // If file doesn't exist, return default and potentially save it
    return DEFAULT_DATA;
  }
}

async function saveLocalData(data: any) {
  const dir = path.dirname(DB_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function getProjects() {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const projects = await db.collection("projects").find({}).toArray();
    return JSON.parse(JSON.stringify(projects));
  } catch (e) {
    console.warn("MongoDB failed, using local fallback");
    const data = await getLocalData();
    return data.projects;
  }
}

export async function getFeaturedProjects() {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const projects = await db.collection("projects").find({ isFeatured: true }).toArray();
    return JSON.parse(JSON.stringify(projects));
  } catch (e) {
    const data = await getLocalData();
    return data.projects.filter((p: any) => p.isFeatured);
  }
}

export async function getProjectById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const project = await db.collection("projects").findOne({ _id: new ObjectId(id) });
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (e) {
    const data = await getLocalData();
    return data.projects.find((p: any) => p._id === id || p.id === id) || null;
  }
}

export async function getConfig() {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const config = await db.collection("config").findOne({ id: "global" });
    return config ? JSON.parse(JSON.stringify(config)) : DEFAULT_DATA.config;
  } catch (e) {
    const data = await getLocalData();
    return data.config || DEFAULT_DATA.config;
  }
}

export async function updateConfig(newConfig: any) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    await db.collection("config").updateOne({ id: "global" }, { $set: newConfig }, { upsert: true });
    return true;
  } catch (e) {
    const data = await getLocalData();
    data.config = { ...data.config, ...newConfig };
    await saveLocalData(data);
    return true;
  }
}

export async function addProject(project: any) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const result = await db.collection("projects").insertOne({ ...project, createdAt: new Date() });
    return result.insertedId;
  } catch (e) {
    const data = await getLocalData();
    const newProject = { ...project, _id: new Date().getTime().toString(), createdAt: new Date() };
    data.projects.push(newProject);
    await saveLocalData(data);
    return newProject._id;
  }
}

export async function updateProject(id: string, project: any) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const { _id, ...updateData } = project;
    await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return true;
  } catch (e) {
    const data = await getLocalData();
    const index = data.projects.findIndex((p: any) => p._id === id || p.id === id);
    if (index !== -1) {
      data.projects[index] = { ...data.projects[index], ...project };
      await saveLocalData(data);
    }
    return true;
  }
}

export async function deleteProject(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    await db.collection("projects").deleteOne({ _id: new ObjectId(id) });
    return true;
  } catch (e) {
    const data = await getLocalData();
    data.projects = data.projects.filter((p: any) => p._id !== id && p.id !== id);
    await saveLocalData(data);
    return true;
  }
}

export async function seedDatabase(projects: any[], config: any) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    await db.collection("projects").deleteMany({});
    await db.collection("projects").insertMany(projects);
    await db.collection("config").deleteMany({});
    await db.collection("config").insertOne(config);
  } catch (e) {
    await saveLocalData({ projects, config });
  }
}
export async function getJournalPosts() {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const posts = await db.collection("journal").find({}).toArray();
    return JSON.parse(JSON.stringify(posts));
  } catch (e) {
    const data = await getLocalData();
    return data.journal || [];
  }
}

export async function getJournalPostById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const post = await db.collection("journal").findOne({ id });
    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch (e) {
    const data = await getLocalData();
    return data.journal?.find((p: any) => p.id === id) || null;
  }
}
export async function getProjectBySlug(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const project = await db.collection("projects").findOne({ slug });
    return project ? JSON.parse(JSON.stringify(project)) : null;
  } catch (e) {
    const data = await getLocalData();
    return data.projects.find((p: any) => p.slug === slug) || null;
  }
}

export async function getJournalPostBySlug(slug: string) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const post = await db.collection("journal").findOne({ slug });
    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch (e) {
    const data = await getLocalData();
    return data.journal?.find((p: any) => p.slug === slug) || null;
  }
}

export async function getSitePages() {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const pages = await db.collection("site_pages").find({}).toArray();
    return JSON.parse(JSON.stringify(pages));
  } catch (e) {
    const data = await getLocalData();
    return data.site_pages || DEFAULT_DATA.site_pages || [];
  }
}

export async function getSitePageById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const page = await db.collection("site_pages").findOne({ id });
    return page ? JSON.parse(JSON.stringify(page)) : null;
  } catch (e) {
    const data = await getLocalData();
    return (data.site_pages || []).find((p: any) => p.id === id) || 
           (DEFAULT_DATA.site_pages || []).find((p: any) => p.id === id) || null;
  }
}

export async function updateSitePage(id: string, pageData: any) {
  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const { _id, ...updateData } = pageData;
    await db.collection("site_pages").updateOne({ id }, { $set: updateData }, { upsert: true });
    return true;
  } catch (e) {
    const data = await getLocalData();
    if (!data.site_pages) data.site_pages = [];
    const index = data.site_pages.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      data.site_pages[index] = { ...data.site_pages[index], ...pageData };
    } else {
      data.site_pages.push({ ...pageData, id });
    }
    await saveLocalData(data);
    return true;
  }
}

import { getProjects, getJournalPosts } from "@/lib/db";
import { PagesContent } from "./PagesContent";

export default async function AdminPagesPage() {
  const projects = await getProjects();
  const journalPosts = await getJournalPosts();

  return <PagesContent projects={projects} journalPosts={journalPosts} />;
}

import { getJournalPosts } from "@/lib/db";
import JournalContent from "./JournalContent";

export default async function JournalPage() {
  const posts = await getJournalPosts();
  
  return <JournalContent posts={posts} />;
}

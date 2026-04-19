import { getFeaturedProjects, getConfig } from "@/lib/db";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const config = await getConfig();
  
  return <HomeContent projects={projects} config={config} />;
}

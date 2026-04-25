import { getFeaturedProjects, getConfig, getPageById } from "@/lib/db";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  const projects = await getFeaturedProjects();
  const config = await getConfig();
  const pageData = await getPageById("home");
  
  return <HomeContent projects={projects} config={config} pageData={pageData} />;
}

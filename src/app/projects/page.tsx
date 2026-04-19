import { getProjects } from "@/lib/db";
import ProjectsContent from "./ProjectsContent";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsContent projects={projects} />;
}

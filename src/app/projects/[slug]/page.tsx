import { getProjectBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import ProjectDetailContent from "./ProjectDetailContent";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Luxe Interiors`,
    description: project.description,
    openGraph: {
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return notFound();
  }
  
  return <ProjectDetailContent project={project} />;
}

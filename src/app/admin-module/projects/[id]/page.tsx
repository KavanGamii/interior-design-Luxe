import { ProjectForm } from "@/components/admin/ProjectForm";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const client = await clientPromise;
    const db = client.db("luxe_interiors");
    const project = await db.collection("projects").findOne({
      _id: new ObjectId(id),
    });

    if (!project) {
      return notFound();
    }

    // Convert ObjectId to string for the client component
    const serializedProject = JSON.parse(JSON.stringify(project));

    return <ProjectForm initialData={serializedProject} isEditing={true} />;
  } catch (error) {
    return notFound();
  }
}

import { getJournalPostBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import JournalDetailContent from "./JournalDetailContent";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);

  if (!post) return { title: "Story Not Found" };

  return {
    title: `${post.title} | Luxe Journal`,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getJournalPostBySlug(slug);
  
  if (!post) {
    return notFound();
  }
  
  return <JournalDetailContent post={post} />;
}

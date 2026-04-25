import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Philosophy } from "@/components/sections/Philosophy";
import { Expertise } from "@/components/sections/Expertise";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { Statement } from "@/components/sections/Statement";
import { GrandCTA } from "@/components/sections/GrandCTA";

export default function HomeContent({ projects, config, pageData }: { projects: any[], config: any, pageData: any }) {
  const heroContent = pageData?.sections?.find((s: any) => s.type === 'hero')?.content || {};
  const philosophyContent = pageData?.sections?.find((s: any) => s.type === 'philosophy')?.content || {};

  return (
    <div className="flex flex-col">
      <Hero config={config} content={heroContent} />
      <Philosophy content={philosophyContent} />
      <Expertise />
      <HorizontalGallery />
      <FeaturedProjects projects={projects} />
      <Statement />
      <AboutPreview />
      <GrandCTA />
    </div>
  );
}

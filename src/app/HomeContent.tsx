import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Philosophy } from "@/components/sections/Philosophy";
import { Expertise } from "@/components/sections/Expertise";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { Statement } from "@/components/sections/Statement";
import { GrandCTA } from "@/components/sections/GrandCTA";

export default function HomeContent({ projects, config, pageData }: { projects: any[], config: any, pageData: any }) {
  // If no sections in DB, show default hardcoded ones
  if (!pageData?.sections || pageData.sections.length === 0) {
    return (
      <div className="flex flex-col">
        <Hero config={config} />
        <Philosophy />
        <Expertise />
        <HorizontalGallery />
        <FeaturedProjects projects={projects} />
        <Statement />
        <AboutPreview />
        <GrandCTA />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {pageData.sections.map((section: any) => {
        switch(section.type.toLowerCase()) {
          case 'hero':
          case 'intro':
            return <Hero key={section.id} config={config} content={section.content} />;
          case 'philosophy':
          case 'mission':
            return <Philosophy key={section.id} content={section.content} />;
          // Add more mappings here as you create more sections
          default:
            return null;
        }
      })}
      
      {/* Keep the hubs and global CTA at the bottom */}
      <Expertise />
      <HorizontalGallery />
      <FeaturedProjects projects={projects} />
      <Statement />
      <AboutPreview />
      <GrandCTA />
    </div>
  );
}

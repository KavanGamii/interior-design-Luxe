import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Philosophy } from "@/components/sections/Philosophy";
import { Expertise } from "@/components/sections/Expertise";
import { HorizontalGallery } from "@/components/sections/HorizontalGallery";
import { Statement } from "@/components/sections/Statement";
import { GrandCTA } from "@/components/sections/GrandCTA";

export default function HomeContent({ projects, config }: { projects: any[], config: any }) {
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

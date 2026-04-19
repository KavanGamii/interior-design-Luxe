import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/db";

const SEED_PROJECTS = [
  {
    title: "The Marble Kitchen",
    description: "A masterclass in culinary elegance, this kitchen combines book-matched Carrera marble with minimalist charcoal cabinetry to create a space that is as functional as it is beautiful.",
    category: "Interior Architecture",
    location: "London, UK",
    year: "2024",
    image: "/luxury_kitchen.png",
    details: [
      "Custom marble island",
      "Integrated Gaggenau appliances",
      "Solid ash flooring",
      "Bespoke lighting design"
    ],
    isFeatured: true
  },
  {
    title: "Serene Garden Suite",
    description: "Designed as a retreat from the city, this bedroom features floor-to-ceiling glass walls that invite nature inside, complemented by soft textiles and a muted color palette.",
    category: "Residential Design",
    location: "Zurich, CH",
    year: "2023",
    image: "/luxury_bedroom.png",
    details: [
      "Natural linen walls",
      "Oak wood paneling",
      "Bespoke king-size bed",
      "Ambient recessed lighting"
    ],
    isFeatured: true
  },
  {
    title: "The Glass Loft",
    description: "An open-plan living space that celebrates light and volume. High-end furnishings and architectural lines define this modern urban sanctuary.",
    category: "Living Spaces",
    location: "New York, USA",
    year: "2024",
    image: "/luxury_living_room_hero.png",
    details: [
      "Concrete polished floors",
      "Vintage Italian furniture",
      "Smart home integration",
      "Acoustic treatment"
    ],
    isFeatured: false
  }
];

const SEED_CONFIG = {
  id: "global",
  heroTitle: "Crafting Elevated Spaces.",
  heroSubtitle: "Luxury Interior Design Studio",
  contactEmail: "hello@luxeinteriors.com",
  contactPhone: "+44 (0) 20 7946 0123",
  contactAddress: "124 Baker Street, London, W1U 6TY",
  socials: {
    instagram: "https://instagram.com/luxe",
    pinterest: "https://pinterest.com/luxe",
    linkedin: "https://linkedin.com/company/luxe"
  }
};

export async function GET() {
  await seedDatabase(SEED_PROJECTS, SEED_CONFIG);
  return NextResponse.json({ message: "Seeding complete (Local + MongoDB)" });
}

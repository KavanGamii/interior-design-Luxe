import { metadata } from "@/app/layout";
import { ServicesContent } from "./ServicesContent";

export function generateMetadata() {
  return {
    title: "Services | Elevated Architecture & Design",
    description: "Our multidisciplinary approach bridges the gap between architecture, art, and emotion. We deliver uncompromising turnkey luxury."
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}

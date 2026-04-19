import { getConfig } from "@/lib/db";
import ContactContent from "./ContactContent";

export default async function ContactPage() {
  const config = await getConfig();
  return <ContactContent config={config} />;
}

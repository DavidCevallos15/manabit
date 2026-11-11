import type { MetadataRoute } from "next";
import { SERVICES_PATH, site } from "@/lib/site";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}${SERVICES_PATH}`, changeFrequency: "weekly", priority: 0.9 },
  ];
}

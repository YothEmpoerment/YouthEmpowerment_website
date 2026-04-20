import type { MetadataRoute } from "next";

const baseUrl = "https://youthempowerment.community";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/gallery",
    "/join",
    "/team",
    "/testimonials",
    "/what-we-do",
  ];

  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}

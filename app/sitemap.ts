import type { MetadataRoute } from "next";

const baseUrl = "https://nexusglobalexim.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/products",
    "/products/spices",
    "/products/spices/cumin-seeds",
    "/products/spices/black-pepper",
    "/products/spices/green-cardamom",
    "/products/spices/turmeric",
    "/products/spices/red-chilli",
    "/products/spices/coriander-seeds",
    "/products/spices/fennel-seeds",
    "/products/spices/fenugreek-seeds",
    "/products/spices/mustard-seeds",
    "/products/spices/paper-packaging",
    "/products/chemicals",
    "/export-process",
    "/certifications",
    "/contact",
    "/request-quote",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority:
      route === "/"
        ? 1
        : route.startsWith("/products/spices/") ||
            route === "/products/spices" ||
            route === "/products/paper-packaging" ||
            route === "/products/chemicals"
          ? 0.9
          : route === "/contact" || route === "/request-quote"
            ? 0.8
            : 0.6,
  }));
}

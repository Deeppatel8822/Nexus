"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routeMap: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  spices: "/products/spices",
  packaging: "/products/paper-packaging",
  chemicals: "/products/chemicals",
  process: "/export-process",
  certifications: "/certifications",
  quote: "/request-quote",
};

export default function LegacyNavigationBridge() {
  const router = useRouter();

  useEffect(() => {
    const legacyShow = (name: string) => {
      const path = routeMap[name];
      if (path) router.push(path);
    };

    (window as Window & { show?: (name: string) => void }).show = legacyShow;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (href !== "#") return;

      const inline = link.getAttribute("onclick") || "";
      const match = inline.match(/show\(['"]([^'"]+)['"]\)/);
      if (!match) return;

      event.preventDefault();
      legacyShow(match[1]);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      delete (window as Window & { show?: (name: string) => void }).show;
    };
  }, [router]);

  return null;
}

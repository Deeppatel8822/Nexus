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

function slugToProduct(pathname: string, form: HTMLFormElement) {
  const heading = form.querySelector("h3")?.textContent?.trim() || "";
  if (heading) {
    const match = heading.match(/^(.+?)\s+[—-]\s+Request/i);
    if (match?.[1]) return match[1].trim();
  }

  const slug = pathname.split("/").filter(Boolean).pop() || "";
  const names: Record<string, string> = {
    "cumin-seeds": "Cumin Seeds",
    "green-cardamom": "Green Cardamom",
    "black-pepper": "Black Pepper",
    turmeric: "Turmeric",
    "red-chilli": "Red Chilli",
    "coriander-seeds": "Coriander Seeds",
    "fennel-seeds": "Fennel Seeds",
    "fenugreek-seeds": "Fenugreek Seeds",
    "mustard-seeds": "Mustard Seeds",
    "paper-packaging": "Paper Packaging",
    chemicals: "Chemicals",
  };
  return names[slug] || "";
}

function prepareLegacyForm(form: HTMLFormElement, product: string) {
  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));

  const labelMap: Record<string, string> = {
    "full name": "name",
    "company name": "company",
    country: "country",
    email: "email",
    "email address": "email",
    "whatsapp / phone": "phone",
    "quantity (mt)": "quantity",
    "quantity required": "quantity",
    "destination port": "destination",
    "destination port / country": "destination",
    incoterm: "incoterm",
    "product required": "product",
    "grade required": "grade",
    "packaging preference": "packaging",
    "additional requirements": "message",
    "message / requirements": "message",
  };

  fields.forEach((field) => {
    if (field.type === "hidden" || field.name) return;
    const wrapper = field.closest(".fr");
    const label = wrapper?.querySelector("label")?.textContent?.trim().toLowerCase();
    if (label && labelMap[label]) field.name = labelMap[label];
  });

  if (product && !form.querySelector('[name="product"]')) {
    const hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.name = "product";
    hidden.value = product;
    form.appendChild(hidden);
  }

  const email = form.querySelector<HTMLInputElement>('[name="email"]');
  if (email) {
    let reply = form.querySelector<HTMLInputElement>('[name="_replyto"]');
    if (!reply) {
      reply = document.createElement("input");
      reply.type = "hidden";
      reply.name = "_replyto";
      form.appendChild(reply);
    }
    reply.value = email.value;
  }

  const subject = form.querySelector<HTMLInputElement>('[name="_subject"]');
  if (!subject) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "_subject";
    input.value = product
      ? `New ${product} Quotation Enquiry | Nexus Global Exim`
      : "New Website Enquiry | Nexus Global Exim";
    form.appendChild(input);
  }

  const template = form.querySelector<HTMLInputElement>('[name="_template"]');
  if (!template) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "_template";
    input.value = "table";
    form.appendChild(input);
  }

  const next = form.querySelector<HTMLInputElement>('[name="_next"]');
  if (!next) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "_next";
    input.value = "https://nexusglobalexim.in/thank-you";
    form.appendChild(input);
  }

  form.action = "https://formsubmit.co/info@nexusglobalexim.in";
  form.method = "POST";
}

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

    const handleSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null;
      if (!form?.matches(".fcard")) return;
      if (form.action.includes("formsubmit.co")) return;

      event.preventDefault();

      const product = slugToProduct(window.location.pathname, form);
      prepareLegacyForm(form, product);

      form.submit();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      delete (window as Window & { show?: (name: string) => void }).show;
    };
  }, [router]);

  return null;
}

"use client";

import { toPng } from "html-to-image";

/**
 * Rasterises a DOM node to a PNG blob, entirely in the browser.
 * No backend, no upload, no cost.
 */
export async function nodeToPngBlob(node: HTMLElement): Promise<Blob> {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#fff6e3",
  });
  const res = await fetch(dataUrl);
  return res.blob();
}

export function slugify(text: string): string {
  const s = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return s || "urteil";
}
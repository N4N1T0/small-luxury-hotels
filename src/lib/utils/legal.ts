import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type legalEntry = CollectionEntry<"legal">;

export async function getAllLegal() {
  const legalDocuments = await getCollection("legal");
  return legalDocuments;
}

export async function getLegalBySlug(slug: string) {
  const legalDocument = getEntry("legal", slug);
  return legalDocument;
}

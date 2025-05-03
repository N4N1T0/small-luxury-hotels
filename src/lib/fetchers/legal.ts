import { getCollection, getEntry, type CollectionEntry } from "astro:content";

/**
 * Type representing a legal document entry from the content collection
 */
export type legalEntry = CollectionEntry<"legal">;

/**
 * Retrieves all legal documents from the content collection
 * @returns {Promise<CollectionEntry<"legal">[]>} Array of legal document entries
 */
export async function getAllLegal(): Promise<CollectionEntry<"legal">[]> {
  const legalDocuments = await getCollection("legal");
  return legalDocuments;
}

/**
 * Retrieves a specific legal document by its slug
 * @param {string} slug - The unique identifier for the legal document
 * @returns {Promise<CollectionEntry<"legal"> | undefined>} The requested legal document entry or undefined if not found
 */
export async function getLegalBySlug(
  slug: string,
): Promise<CollectionEntry<"legal"> | undefined> {
  const legalDocument = getEntry("legal", slug);
  return legalDocument;
}

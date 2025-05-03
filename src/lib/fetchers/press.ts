import { getCollection, type CollectionEntry } from "astro:content";

// Tipo para las entradas de prensa
export type PressEntry = CollectionEntry<"press">;

/**
 * Obtiene todas las entradas de prensa ordenadas por fecha de publicación (más recientes primero)
 * @returns Array de entradas de prensa
 */
export const getAllPress = async (): Promise<PressEntry[]> => {
  const press = await getCollection("press");
  return press.sort((a, b) => {
    return (
      new Date(b.data.publishDate).getTime() -
      new Date(a.data.publishDate).getTime()
    );
  });
};

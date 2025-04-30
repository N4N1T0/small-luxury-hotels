import {
  getCollection,
  getEntries,
  getEntry,
  type CollectionEntry,
} from "astro:content";
import { getHotelBySlug } from "./hotels";

// Tipo para las entradas de experiencias
export type ExperienceEntry = CollectionEntry<"experiences">;

/**
 * Obtiene todas las experiencias ordenadas por fecha de publicación (más recientes primero)
 * @returns Array de entradas de experiencias
 */
export async function getAllExperiences(): Promise<ExperienceEntry[]> {
  const experiences = await getCollection("experiences");
  return experiences.sort((a, b) => {
    return (
      new Date(b.data.publishDate).valueOf() -
      new Date(a.data.publishDate).valueOf()
    );
  });
}

/**
 * Obtiene la experiencia destacada
 * @returns La experiencia destacada o undefined si no hay ninguna
 */
export async function getFeaturedExperience(): Promise<
  ExperienceEntry | undefined
> {
  const experiences = await getAllExperiences().then((res) =>
    res.filter((exp) => exp.data.featured),
  );
  return experiences[0];
}

/**
 * Obtiene una experiencia específica por su slug
 * @param slug El slug de la experiencia a buscar
 * @returns La entrada de la experiencia o undefined si no se encuentra
 */
export async function getExperienceBySlug(
  slug: string,
): Promise<ExperienceEntry | undefined> {
  const experiences = await getEntry("experiences", slug);
  return experiences;
}

/**
 * Obtiene experiencias relacionadas con la experiencia actual
 * @param currentSlug El slug de la experiencia actual
 * @param limit Número máximo de experiencias relacionadas a devolver
 * @returns Array de experiencias relacionadas
 */
export async function getRelatedExperiences(
  currentSlug: string,
  limit = 3,
): Promise<ExperienceEntry[]> {
  const currentExperience = await getExperienceBySlug(currentSlug);
  if (!currentExperience) return [];

  const allExperiences = await getAllExperiences();
  const relatedSlugs = currentExperience.data.relatedExperiences || [];

  // First try to get specifically related experiences
  const relatedExperiences = allExperiences.filter(
    (exp) => relatedSlugs.includes(exp.id) && exp.id !== currentSlug,
  );

  // If we don't have enough related experiences, add random ones
  if (relatedExperiences.length < limit) {
    const remainingCount = limit - relatedExperiences.length;
    const otherExperiences = allExperiences
      .filter((exp) => !relatedSlugs.includes(exp.id) && exp.id !== currentSlug)
      .slice(0, remainingCount);

    return [...relatedExperiences, ...otherExperiences];
  }

  return relatedExperiences.slice(0, limit);
}

/**
 * Obtiene las experiencias asociadas a un hotel específico
 * @param hotelSlug El slug del hotel
 * @returns Array de experiencias del hotel
 */
export const getExperiencesByHotel = async (
  hotelSlug: string,
): Promise<ExperienceEntry[]> => {
  const hotel = await getHotelBySlug(hotelSlug);
  if (!hotel) return [];
  return getEntries(hotel.data.experiences);
};

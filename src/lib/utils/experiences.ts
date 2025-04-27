import { getCollection, getEntries, getEntry } from "astro:content";
import { getHotelBySlug } from "./hotels";

export async function getAllExperiences() {
  const experiences = await getCollection("experiences");
  return experiences.sort((a, b) => {
    return (
      new Date(b.data.publishDate).valueOf() -
      new Date(a.data.publishDate).valueOf()
    );
  });
}

export async function getFeaturedExperiences() {
  const experiences = await getEntry("experiences", "featured");
  return experiences;
}

export async function getExperienceBySlug(slug: string) {
  const experiences = await getEntry("experiences", slug);
  return experiences;
}

export async function getRelatedExperiences(currentSlug: string, limit = 3) {
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

export const getExperiencesByHotel = async (hotelSlug: string) => {
  const hotel = await getHotelBySlug(hotelSlug);
  if (!hotel) return [];
  return getEntries(hotel.data.experiences);
};

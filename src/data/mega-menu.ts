import {
  getAllExperiences,
  getFeaturedExperience,
} from "@/lib/utils/experiences";
import { getAllHotels, getFeaturedHotel } from "@/lib/utils/hotels";
import type { CollectionEntry } from "astro:content";

type ExperienceEntry = CollectionEntry<"experiences">;
type HotelEntry = CollectionEntry<"hotels">;

export type MegaMenuItem = {
  featuredLabel: string;
  featured: () => Promise<ExperienceEntry | HotelEntry | undefined>;
  label: string;
  data: () => Promise<ExperienceEntry[] | HotelEntry[]>;
};

export const experiences: MegaMenuItem = {
  featuredLabel: "Experiencias Destacada",
  featured: async () => await getFeaturedExperience(),
  label: "Otras Experiencias",
  data: async () => await getAllExperiences().then((res) => res.slice(0, 3)),
};

export const hotels: MegaMenuItem = {
  featuredLabel: "Hoteles Destacados",
  featured: async () => await getFeaturedHotel(),
  label: "Otros Hoteles",
  data: async () => await getAllHotels().then((res) => res.slice(0, 3)),
};

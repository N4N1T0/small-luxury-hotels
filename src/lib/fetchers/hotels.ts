import { getCollection, getEntry, type CollectionEntry } from "astro:content";
import { getRoomBySlug } from "./rooms";

// Tipo para las entradas de hoteles
export type HotelEntry = CollectionEntry<"hotels">;

/**
 * Obtiene todos los hoteles ordenados por fecha de publicación (más recientes primero)
 * @returns Array de entradas de hoteles
 */
export async function getAllHotels(): Promise<HotelEntry[]> {
  const hotels = await getCollection("hotels");
  return hotels;
}

/**
 * Obtiene el hotel destacado
 * @returns El hotel destacado o undefined si no hay ninguno
 */
export async function getFeaturedHotel(): Promise<HotelEntry | undefined> {
  const hotels = await getAllHotels();
  return hotels.find((hotel) => hotel.data.featured);
}

/**
 * Obtiene un hotel específico por su slug
 * @param slug El slug del hotel a buscar
 * @returns La entrada del hotel o undefined si no se encuentra
 */
export async function getHotelBySlug(
  slug: string,
): Promise<HotelEntry | undefined> {
  const hotel = await getEntry("hotels", slug);
  return hotel;
}

/**
 * Obtiene hoteles relacionados con el hotel actual
 * @param currentSlug El slug del hotel actual
 * @param limit Número máximo de hoteles relacionados a devolver
 * @returns Array de hoteles relacionados
 */
export async function getRelatedHotels(
  currentSlug: string,
  limit = 3,
): Promise<HotelEntry[]> {
  const currentHotel = await getHotelBySlug(currentSlug);
  if (!currentHotel) return [];

  const allHotels = await getAllHotels();
  const relatedHotels = allHotels
    .filter((hotel) => hotel.id !== currentSlug)
    .slice(0, limit);

  return relatedHotels;
}

export async function getHotelByRoom(room: string) {
  const roomFound = await getRoomBySlug(room);
  if (!roomFound) return;
  const hotel = await getHotelBySlug(roomFound.data.hotel.id);
  if (!hotel) return;
  return hotel;
}

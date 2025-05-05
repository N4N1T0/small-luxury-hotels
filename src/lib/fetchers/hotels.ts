import { getCollection, getEntry, type CollectionEntry } from "astro:content";

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

/**
 * Obtiene hoteles por ubicación (ciudad)
 * @param city La ciudad a filtrar
 * @returns Array de hoteles en la ciudad especificada
 */
export async function getHotelsByLocation(city: string): Promise<HotelEntry[]> {
  const hotels = await getAllHotels();
  return hotels.filter((hotel) => hotel.data.location.city === city);
}

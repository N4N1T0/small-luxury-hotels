import {
  getCollection,
  getEntry,
  getEntries,
  type CollectionEntry,
} from "astro:content";

// Tipo para las entradas de habitaciones
export type RoomEntry = CollectionEntry<"rooms">;

/**
 * Obtiene todas las habitaciones
 * @returns Array de entradas de habitaciones
 */
export async function getAllRooms(): Promise<RoomEntry[]> {
  const rooms = await getCollection("rooms");
  return rooms;
}

/**
 * Obtiene una habitación específica por su slug
 * @param slug El slug de la habitación a buscar
 * @returns La entrada de la habitación o undefined si no se encuentra
 */
export async function getRoomBySlug(
  slug: string,
): Promise<RoomEntry | undefined> {
  const room = await getEntry("rooms", slug);
  return room;
}

/**
 * Obtiene las habitaciones asociadas a un hotel específico
 * @param hotelSlug El slug del hotel
 * @returns Array de habitaciones del hotel
 */
export async function getRoomsByHotel(hotelSlug: string): Promise<RoomEntry[]> {
  const hotel = await getEntry("hotels", hotelSlug);
  if (!hotel) return [];
  return await getEntries(hotel.data.rooms);
}

/**
 * Obtiene habitaciones relacionadas con la habitación actual
 * @param currentSlug El slug de la habitación actual
 * @param limit Número máximo de habitaciones relacionadas a devolver
 * @returns Array de habitaciones relacionadas
 */
export async function getRelatedRooms(
  currentSlug: string,
  limit = 2,
): Promise<RoomEntry[]> {
  const currentRoom = await getRoomBySlug(currentSlug);
  if (!currentRoom) return [];

  const allRooms = await getAllRooms();
  const relatedRooms = allRooms
    .filter((room) => room.id !== currentSlug)
    .slice(0, limit);

  return relatedRooms;
}

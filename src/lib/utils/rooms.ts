import { getCollection, getEntry, getEntries } from "astro:content";

export async function getAllRooms() {
  const rooms = await getCollection("rooms");
  return rooms;
}

export async function getRoomBySlug(slug: string) {
  const room = await getEntry("rooms", slug);
  return room;
}

export async function getRoomsByHotel(hotelSlug: string) {
  const hotel = await getEntry("hotels", hotelSlug);
  if (!hotel) return [];
  return await getEntries(hotel.data.rooms);
}

export async function getRelatedRooms(currentSlug: string, limit = 3) {
  const currentRoom = await getRoomBySlug(currentSlug);
  if (!currentRoom) return [];

  const allRooms = await getAllRooms();
  const relatedRooms = allRooms
    .filter((room) => room.id !== currentSlug)
    .slice(0, limit);

  return relatedRooms;
}

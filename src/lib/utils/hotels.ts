import { getCollection, getEntry } from "astro:content";

export async function getAllHotels() {
  const hotels = await getCollection("hotels");
  return hotels.sort((a, b) => {
    return (
      new Date(b.data.publishDate).valueOf() -
      new Date(a.data.publishDate).valueOf()
    );
  });
}

export async function getFeaturedHotel() {
  const hotels = await getAllHotels();
  return hotels.find((hotel) => hotel.data.featured);
}

export async function getHotelBySlug(slug: string) {
  const hotel = await getEntry("hotels", slug);
  return hotel;
}

export async function getRelatedHotels(currentSlug: string, limit = 3) {
  const currentHotel = await getHotelBySlug(currentSlug);
  if (!currentHotel) return [];

  const allHotels = await getAllHotels();
  const relatedHotels = allHotels
    .filter((hotel) => hotel.id !== currentSlug)
    .slice(0, limit);

  return relatedHotels;
}

export async function getHotelsByLocation(city: string) {
  const hotels = await getAllHotels();
  return hotels.filter((hotel) => hotel.data.location.city === city);
}

export async function getHotelsByPriceRange(
  minPrice: number,
  maxPrice: number,
) {
  const hotels = await getAllHotels();
  return hotels.filter(
    (hotel) =>
      hotel.data.priceRange.min >= minPrice &&
      hotel.data.priceRange.max <= maxPrice,
  );
}

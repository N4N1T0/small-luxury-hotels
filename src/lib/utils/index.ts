import {
  Wifi,
  Tv,
  ParkingSquare,
  ChefHat,
  WashingMachine,
  AirVent,
  Heater,
  PawPrint,
  Cigarette,
  TicketCheck,
  WavesLadder,
  Dumbbell,
  Utensils,
  Coffee,
  Vault,
  Bath,
  Star,
} from "lucide-astro";

export const eurolize = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  });
};

export const getAmenityIcon = (amenity: string) => {
  const text = amenity.toLowerCase();

  if (text.includes("wi-fi") || text.includes("wifi")) return Wifi;
  if (text.includes("tv")) return Tv;
  if (text.includes("parking") || text.includes("aparcamiento"))
    return ParkingSquare;
  if (text.includes("cocina") || text.includes("kitchen")) return ChefHat;
  if (text.includes("lavadora") || text.includes("washer"))
    return WashingMachine;
  if (text.includes("aire acondicionado") || text.includes("air"))
    return AirVent;
  if (text.includes("calefacción") || text.includes("heating")) return Heater;
  if (text.includes("mascotas") || text.includes("pets")) return PawPrint;
  if (text.includes("fumador") || text.includes("smoking")) return Cigarette;
  if (text.includes("evento") || text.includes("event")) return TicketCheck;
  if (text.includes("piscina") || text.includes("pool")) return WavesLadder;
  if (text.includes("gimnasio") || text.includes("gym")) return Dumbbell;
  if (text.includes("desayuno") || text.includes("breakfast")) return Utensils;
  if (text.includes("nespresso") || text.includes("cafetera")) return Coffee;
  if (text.includes("caja fuerte") || text.includes("safe")) return Vault;
  if (
    text.includes("bañera") ||
    text.includes("ducha") ||
    text.includes("baño")
  )
    return Bath;

  return Star;
};

import { useEffect, useRef, useState } from "preact/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CollectionEntry } from "astro:content";

export default function HotelLocations({
  hotel,
}: {
  hotel: CollectionEntry<"hotels">;
}) {
  const { location, title, shortDescription } = hotel.data;
  const mapRef = useRef<L.Map | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([
    location.coordinates.lat,
    location.coordinates.lng,
  ]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView(selectedCoords, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    } else {
      mapRef.current.setView(selectedCoords, 13);
    }
  }, [selectedCoords]);

  return (
    <section class="text-main bg-background py-8 md:py-16">
      <div className="container-full">
        <div class="mb-10 flex items-center justify-between px-8">
          <div>
            <h2 class="text-foreground mb-4 text-4xl font-semibold md:text-5xl">
              Ubicación
            </h2>
            <p class="text-foreground/80 font-hum text-lg">
              {shortDescription}
            </p>
          </div>
          <div
            class="cursor-pointer"
            onClick={() =>
              setSelectedCoords([
                location.coordinates.lat,
                location.coordinates.lng,
              ])
            }
          >
            <h3>{title}</h3>
            <p>{location.address}</p>
            <span className="font-semibold text-yellow-600">Ver Mapa</span>
          </div>
        </div>
        <div className="flex-1">
          <div id="map" style={{ width: "100%", height: "450px" }} />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "preact/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CollectionEntry } from "astro:content";
import { animateElement } from "@/lib/scripts";

export default function HotelLocations({
  hotel,
}: {
  hotel: CollectionEntry<"hotels">;
}) {
  const { location, title } = hotel.data;
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

  useEffect(() => {
    animateElement("hotel-location-info", "40px", 500);
    animateElement("hotel-location-map", "-40px", 500);
  });

  return (
    <section class="container py-16">
      <div
        class="mb-10 flex flex-col items-center justify-between md:flex-row md:px-8"
        id="hotel-location-info"
      >
        <div>
          <h2 class="text-foreground mb-4 text-4xl font-semibold md:text-5xl">
            Ubicación
          </h2>
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
      <div className="flex-1" id="hotel-location-map">
        <div id="map" style={{ width: "100%", height: "450px" }} />
      </div>
    </section>
  );
}

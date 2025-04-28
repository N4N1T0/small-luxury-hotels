import { useEffect, useRef, useState } from "preact/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { CollectionEntry } from "astro:content";

export default function Locations({
  hotels,
}: {
  hotels: CollectionEntry<"hotels">[];
}) {
  const mapRef = useRef<L.Map | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([
    hotels[0].data.location.coordinates.lat,
    hotels[0].data.location.coordinates.lng,
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
        <div class="mb-10 max-w-3xl">
          <h2 class="text-3xl font-semibold md:text-4xl">
            Descubre experiencias únicas que transformarán tu estancia en
            nuestros hoteles.
          </h2>
          <p class="mt-2 text-base md:text-lg">
            Sumérgete en actividades diseñadas para todos los gustos. Desde
            aventuras al aire libre hasta relajantes escapadas, tenemos algo
            para ti.
          </p>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1">
            <ul className="space-y-6">
              {hotels.map((hotel) => (
                <li
                  className="cursor-pointer"
                  key={hotel.id}
                  onClick={() =>
                    setSelectedCoords([
                      hotel.data.location.coordinates.lat,
                      hotel.data.location.coordinates.lng,
                    ])
                  }
                >
                  <h3>{hotel.data.title}</h3>
                  <p>{hotel.data.location.address}</p>
                  <span className="font-semibold text-yellow-600">
                    Ver Mapa
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <div id="map" style={{ width: "100%", height: "400px" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

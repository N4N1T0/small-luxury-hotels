import { useEffect, useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";
import { animateElement } from "@/lib/scripts";

export default function Locations({
  hotels,
}: {
  hotels: CollectionEntry<"hotels">[];
}) {
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>([
    hotels[0].data.location.coordinates.lat,
    hotels[0].data.location.coordinates.lng,
  ]);

  const mapUrl = `https://maps.google.com/maps?q=${selectedCoords[0]},${selectedCoords[1]}&z=15&output=embed`;

  useEffect(() => {
    animateElement("#location-header", "0", 500);
    animateElement("#locations-list", "-40px", 500);
    animateElement("#locations-map", "40px", 500);
  }, []);

  return (
    <section class="text-main bg-background py-8 md:py-16">
      <div className="container">
        <div class="mb-10 max-w-3xl" id="location-header">
          <h2 class="text-3xl font-semibold md:text-4xl">
            Encuentra nuestros hoteles exclusivos
          </h2>
          <p class="mt-2 text-base font-normal md:text-lg">
            Explora el mapa interactivo para descubrir dónde se encuentran
            nuestros hoteles boutique y sus privilegiadas ubicaciones en los
            destinos más codiciados.
          </p>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex-1" id="locations-list">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-1">
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
          <div className="flex-1 shadow-md" id="locations-map">
            <iframe
              width="100%"
              height="100%"
              src={mapUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

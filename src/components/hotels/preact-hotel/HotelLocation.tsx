import { useEffect, useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";
import { animateElement } from "@/lib/scripts";

export default function HotelLocations({
  hotel,
}: {
  hotel: CollectionEntry<"hotels">;
}) {
  const { location, title } = hotel.data;

  const [mapKey, setMapKey] = useState<number>(0);
  const [mapSrc, setMapSrc] = useState<string>("");

  useEffect(() => {
    animateElement("hotel-location-info", "40px", 500);
    animateElement("hotel-location-map", "-40px", 500);
  }, []);

  useEffect(() => {
    const { lat, lng } = location.coordinates;
    setMapSrc(`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`);
  }, [mapKey]);

  const handleMapClick = () => {
    setMapKey((prev) => prev + 1);
  };

  return (
    <section class="container py-16">
      <div
        class="mb-10 flex flex-col items-center justify-between md:flex-row md:px-8"
        id="hotel-location-info"
      >
        <div>
          <h2 class="text-main mb-4 text-4xl font-semibold md:text-5xl">
            Ubicación
          </h2>
        </div>
        <div class="cursor-pointer" onClick={handleMapClick}>
          <h3>{title}</h3>
          <p>{location.address}</p>
          <span className="font-semibold text-yellow-600">Ver Mapa</span>
        </div>
      </div>
      <div className="flex-1" id="hotel-location-map">
        {mapSrc && (
          <iframe
            key={mapKey}
            src={mapSrc}
            style={{ width: "100%", height: "450px", border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </div>
    </section>
  );
}

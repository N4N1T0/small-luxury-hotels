import { useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";
import { cn } from "@/lib/ui";

interface Props {
  hotel?: CollectionEntry<"hotels">;
  hotels?: CollectionEntry<"hotels">[];
  room?: CollectionEntry<"rooms">;
  className?: string;
}

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string;
  hotelSelector: string;
}

export default function BookingForm({ hotel, room, hotels, className }: Props) {
  // INITIAL
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // STATE
  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: today.toISOString().split("T")[0],
    checkOut: tomorrow.toISOString().split("T")[0],
    adults: 1,
    children: 0,
    roomType: room?.id || "",
    hotelSelector: hotel?.id || "",
  });

  // HANDLERS
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log("Datos de reserva:", formData);
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const value =
      target.type === "number" ? parseInt(target.value) || 0 : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  return (
    <section className={cn("bg-main pb-8", className)}>
      <div className="container" id="booking-section">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Multiple Hotels */}
          {!hotel && hotels && hotels.length > 0 && (
            <select
              id="hotelSelector"
              name="hotelSelector"
              value={formData.hotelSelector || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hotelSelector: (e.target as HTMLSelectElement).value,
                })
              }
              className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main w-full border-b-2 p-2 focus:ring-2 focus:outline-none disabled:opacity-50"
              aria-label={
                formData.hotelSelector === ""
                  ? "Selecciona un hotel"
                  : hotel
                    ? "Hotel Seleccionado por su pagina"
                    : ""
              }
              required
              title={
                formData.hotelSelector === ""
                  ? "Selecciona un hotel"
                  : hotel
                    ? "Hotel Seleccionado por su pagina"
                    : ""
              }
            >
              <option value="" disabled>
                Selecciona un hotel
              </option>
              {hotels.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.data.title}
                </option>
              ))}
            </select>
          )}

          {/* Single Hotels */}
          {!hotels && hotel && (
            <select
              id="hotelSelector"
              name="hotelSelector"
              value={formData.hotelSelector || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hotelSelector: (e.target as HTMLSelectElement).value,
                })
              }
              className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main w-full border-b-2 p-2 focus:ring-2 focus:outline-none disabled:opacity-50"
              aria-label="Selecciona un hotel"
              required
              disabled
              title="Hotel Seleccionado por su pagina"
            >
              <option key={hotel?.id} value={hotel?.id}>
                {hotel?.data.title}
              </option>
            </select>
          )}

          {/* Check In */}
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleInputChange}
            className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 w-full border-b-2 p-2 focus:ring-2 focus:outline-none"
            required
          />

          {/* Check Out */}
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleInputChange}
            className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 w-full border-b-2 p-2 focus:ring-2 focus:outline-none"
            required
          />

          {/* Multiple Hotels Room Type */}
          {!hotel && !room && hotels && (
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main w-full border-b-2 p-2 focus:ring-2 focus:outline-none disabled:opacity-50"
              required
              disabled={formData.hotelSelector === ""}
              title={
                formData.hotelSelector === ""
                  ? "Selecciona un hotel"
                  : "Selecciona un tipo de habitación de este hotel"
              }
            >
              <option value="" disabled>
                Selecciona un tipo de habitación
              </option>
              {(
                hotels?.find((h) => h.id === formData.hotelSelector)?.data
                  .rooms || []
              ).map((type) => (
                <option key={type.id} value={type.id}>
                  {type.id}
                </option>
              ))}
            </select>
          )}

          {/* Single Hotel Room Type */}
          {!hotels && !room && hotel && (
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              title={
                formData.hotelSelector === ""
                  ? "Selecciona un hotel primero"
                  : "Selecciona un tipo de habitación de este hotel"
              }
              className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main w-full border-b-2 p-2 focus:ring-2 focus:outline-none disabled:opacity-50"
              required
              disabled={formData.hotelSelector === ""}
            >
              <option value="" disabled>
                Selecciona un tipo de habitación
              </option>
              {hotel.data.rooms.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.id}
                </option>
              ))}
            </select>
          )}

          {/* Prop Room Type */}
          {!hotels && hotel && room && (
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleInputChange}
              className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main w-full border-b-2 p-2 focus:ring-2 focus:outline-none disabled:opacity-50"
              required
              disabled={formData.roomType !== ""}
            >
              <option key={room.id} value={room.id}>
                {room.data.title}
              </option>
            </select>
          )}

          <label className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main flex w-full gap-4 border-b-2 p-2 focus:ring-2 focus:outline-none">
            Adultos
            <input
              type="number"
              id="adults"
              name="adults"
              min="1"
              max="4"
              value={formData.adults}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main flex w-full gap-4 border-b-2 p-2 focus:ring-2 focus:outline-none">
            Niños
            <input
              type="number"
              id="children"
              name="children"
              min="0"
              max="4"
              value={formData.children}
              onChange={handleInputChange}
            />
          </label>
        </form>
      </div>
    </section>
  );
}

// Eliminar el botón de reserva

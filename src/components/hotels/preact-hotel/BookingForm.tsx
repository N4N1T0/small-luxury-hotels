import { useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";
import { buttonClasses } from "@/lib/ui";

interface Props {
  hotel?: CollectionEntry<"hotels">;
  room?: CollectionEntry<"rooms">;
}

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomType: string;
}

export default function BookingForm({ hotel, room }: Props) {
  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    roomType: "",
  });

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
    <section className="bg-main pb-8">
      <div className="container">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleInputChange}
            className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 w-full border-b-2 p-2 focus:ring-2 focus:outline-none"
            required
          />

          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleInputChange}
            className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 w-full border-b-2 p-2 focus:ring-2 focus:outline-none"
            required
          />

          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleInputChange}
            className="border-background focus:border-background focus:ring-background placeholder:text-background/80 text-background/80 bg-main w-full border-b-2 p-2 focus:ring-2 focus:outline-none"
            required
          >
            <option value="" disabled>
              Selecciona un tipo de habitación
            </option>
            {hotel ? (
              hotel.data.rooms.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.id}
                </option>
              ))
            ) : (
              <option value={room?.id} selected>
                {room?.id}
              </option>
            )}
          </select>

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

          <button type="submit" className={buttonClasses.outlineDark}>
            Reservar ahora
          </button>
        </form>
      </div>
    </section>
  );
}

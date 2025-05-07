import { useState } from "preact/hooks";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Here would go the actual subscription logic
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-accent-dark mt-8 rounded-lg md:mt-0 md:p-6">
      <h3 className="text-background mb-2 text-xl font-semibold">
        Suscríbete a nuestro newsletter
      </h3>
      <p className="text-background/80 mb-4 font-light">
        Recibe ofertas exclusivas y noticias sobre nuestros hoteles directamente
        en tu bandeja de entrada.
      </p>

      {subscribed ? (
        <div className="text-background rounded bg-green-600/20 p-4">
          ¡Gracias por suscribirte! Pronto recibirás nuestras novedades.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            placeholder="Tu correo electrónico"
            className="border-background placeholder:text-background/70 focus:ring-accent w-full border px-4 py-2 focus:ring focus:outline-none sm:w-auto"
            required
          />
          <button
            type="submit"
            className="border-background hover:text-secondary hover:border-secondary focus:ring-accent hover-200 text-background cursor-pointer border px-4 py-2 focus:outline-none"
          >
            Suscribirse
          </button>
        </form>
      )}
    </div>
  );
}

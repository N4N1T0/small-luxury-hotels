import { Square } from "@/assets";
import { buttonClasses } from "@/lib/ui";
import { eurolize } from "@/lib/utils";
import type { CollectionEntry } from "astro:content";

interface ExperienceCardProps {
  experience: CollectionEntry<"experiences">;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const { title, description, gallery } = experience.data;

  return (
    <article class="group flex h-full flex-col" id="experience-card">
      {gallery[0] && (
        <a
          href={`/experiencias/${experience.id}`}
          class="block min-h-[300px] overflow-hidden md:min-h-[450px]"
        >
          <img
            src={experience.data.gallery[0].url.src || Square.src}
            alt={experience.data.gallery[0].alt}
            width={500}
            height={500}
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </a>
      )}
      <div class="flex h-full flex-col justify-between space-y-4 pt-4">
        <div>
          <h3 class="text-main mb-2 text-xl font-bold">{title}</h3>
          <p class="text-foreground/70 font-light">{description}</p>
        </div>
        <p class="text-secondary text-xl font-bold">
          {eurolize(experience.data.price)}
        </p>

        {/* BUTTONS */}
        <div class="flex gap-4">
          <a
            href={`/experiencias/${experience.id}`}
            class={buttonClasses.ghost}
          >
            Ver Experiencia
          </a>
          <a
            href={`/experiencias/${experience.id}`}
            class={buttonClasses.primary}
          >
            Reservar
          </a>
        </div>
      </div>
    </article>
  );
}

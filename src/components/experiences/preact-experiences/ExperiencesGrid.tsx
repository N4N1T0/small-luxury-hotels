import ExperienceCard from "./ExperienceCard";
import { useState } from "preact/hooks";
import type { CollectionEntry } from "astro:content";
import { buttonClasses } from "@/lib/ui";

interface Props {
  experiences: CollectionEntry<"experiences">[];
}

export default function ExperiencesGrid({ experiences }: Props) {
  const [showAll, setShowAll] = useState(false);

  // Show 6 experiences initially on desktop, 4 on mobile (handled by CSS)
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 6);
  const hasMoreExperiences = experiences.length > 6;

  return (
    <section className="bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Nuestras Experiencias
          </h2>
          <p className="mt-2 text-base md:text-lg">
            Descubre las experiencias inolvidables que puedes vivir en nuestros
            hoteles boutique.
          </p>
        </div>

        {/* Desktop Grid (3 columns) */}
        <div className="hidden gap-8 md:grid md:grid-cols-3">
          {visibleExperiences.map((experience) => (
            <div key={experience.id}>
              <ExperienceCard experience={experience} />
            </div>
          ))}
        </div>

        {/* Mobile Grid (1 column, showing only 4 initially) */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {visibleExperiences
            .slice(0, showAll ? visibleExperiences.length : 4)
            .map((experience) => (
              <div key={experience.id}>
                <ExperienceCard experience={experience} />
              </div>
            ))}
        </div>

        {/* Show More Button */}
        {hasMoreExperiences && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={buttonClasses.outline}
            >
              {showAll ? "Ver Menos" : "Ver Más"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

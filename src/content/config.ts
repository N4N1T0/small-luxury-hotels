import { defineCollection, reference, z } from "astro:content";

const hotelsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    location: z.object({
      address: z.string(),
      city: z.string(),
      country: z.string(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }),
    amenities: z.array(z.string()),
    gallery: z.array(
      z.object({
        url: z.string(),
        alt: z.string(),
      }),
    ),
    featured: z.boolean(),
    rooms: z.array(reference("rooms")),
    experiences: z.array(reference("experiences")),
    priceRange: z.object({
      min: z.number(),
      max: z.number(),
      currency: z.string(),
    }),
    contactInfo: z.object({
      phone: z.string(),
      email: z.string(),
    }),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
  }),
});

const roomsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    size: z.number(),
    maxOccupancy: z.number(),
    bedType: z.string(),
    amenities: z.array(z.string()),
    images: z.array(
      z.object({
        url: z.string(),
        alt: z.string(),
      }),
    ),
    pricePerNight: z.number(),
    currency: z.string(),
    featured: z.boolean().default(false),
    availability: z.boolean().default(true),
  }),
});

const experiencesCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    price: z.number(),
    duration: z.string(),
    maxParticipants: z.number(),
    included: z.array(z.string()),
    gallery: z.array(
      z.object({
        url: z.string(),
        alt: z.string(),
      }),
    ),
    highlights: z.array(z.string()),
    relatedExperiences: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    content: z.object({
      description: z.string(),
      program: z.string().optional(),
      learnings: z.array(z.string()).optional(),
      experience: z.string(),
      amenities: z.string().optional(),
      highlights: z.string().optional(),
    }),
  }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    category: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

const legalCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
  }),
});

export const collections = {
  experiences: experiencesCollection,
  hotels: hotelsCollection,
  rooms: roomsCollection,
  blog: blogCollection,
  legal: legalCollection,
};

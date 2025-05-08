import { defineCollection, reference, z } from "astro:content";

const hotelsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
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
      services: z.array(z.string()),
      gallery: z.array(
        z.object({
          url: image(),
          alt: z.string(),
        }),
      ),
      featured: z.boolean(),
      rooms: z.array(reference("rooms")),
      experiences: z.array(reference("experiences")),
    }),
});

const roomsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      size: z.number(),
      maxOccupancy: z.number(),
      bedType: z.string(),
      amenities: z.array(z.string()),
      images: z.array(
        z.object({
          url: image(),
          alt: z.string(),
        }),
      ),
      featured: z.boolean().default(false),
      availability: z.boolean().default(true),
      hotel: reference("hotels"),
    }),
});

const experiencesCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      location: z.string(),
      price: z.number(),
      duration: z.string(),
      maxParticipants: z.number(),
      included: z.array(z.string()),
      gallery: z.array(
        z.object({
          url: image(),
          alt: z.string(),
        }),
      ),
      relatedExperiences: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
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
    description: z.string(),
    publishDate: z.string(),
    updatedDate: z.string().optional(),
  }),
});

const pressCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    source: z.object({
      name: z.string(),
      url: z.string(),
    }),
  }),
});

export const collections = {
  experiences: experiencesCollection,
  hotels: hotelsCollection,
  rooms: roomsCollection,
  blog: blogCollection,
  legal: legalCollection,
  press: pressCollection,
};

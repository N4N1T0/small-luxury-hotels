// src/utils/jsonld.ts

import { contactInfo } from "@/data/site-data";
import type { ExperienceEntry } from "../fetchers/experiences";
import type { HotelEntry } from "../fetchers/hotels";
import type { RoomEntry } from "../fetchers/rooms";
import type { BlogEntry } from "../fetchers/blog";
import type { legalEntry } from "../fetchers/legal";
import type { AboutEntry, HomeEntry } from "@/types";

// Define types
export type JsonLdType =
  | "home"
  | "hotel"
  | "hotelList"
  | "room"
  | "experience"
  | "experienceList"
  | "about"
  | "blogPost"
  | "blogList"
  | "legal";

export type JsonLdDataType =
  | ExperienceEntry
  | ExperienceEntry[]
  | HotelEntry
  | HotelEntry[]
  | RoomEntry
  | BlogEntry
  | BlogEntry[]
  | legalEntry
  | AboutEntry
  | HomeEntry;

export type JsonLdInputMap = {
  home: Parameters<typeof generateHomeJsonLd>[0];
  about: Parameters<typeof generateAboutJsonLd>[0];
  hotel: Parameters<typeof generateHotelJsonLd>[0];
  hotelList: Parameters<typeof generateHotelListJsonLd>[0];
  room: Parameters<typeof generateRoomJsonLd>[0];
  experience: Parameters<typeof generateExperienceJsonLd>[0];
  experienceList: Parameters<typeof generateExperienceListJsonLd>[0];
  blogPost: Parameters<typeof generateBlogPostJsonLd>[0];
  blogList: Parameters<typeof generateBlogListJsonLd>[0];
  legal: Parameters<typeof generateLegalJsonLd>[0];
};

export const jsonLdGenerators: {
  [K in JsonLdType]: (data: JsonLdInputMap[K]) => any;
} = {
  home: generateHomeJsonLd,
  hotel: generateHotelJsonLd,
  hotelList: generateHotelListJsonLd,
  room: generateRoomJsonLd,
  experience: generateExperienceJsonLd,
  experienceList: generateExperienceListJsonLd,
  about: generateAboutJsonLd,
  blogPost: generateBlogPostJsonLd,
  blogList: generateBlogListJsonLd,
  legal: generateLegalJsonLd,
};

export function getJsonLd<T extends JsonLdType>(
  type: T,
  data: JsonLdInputMap[T],
) {
  return jsonLdGenerators[type](data);
}

// 1. Home
export function generateHomeJsonLd(data: HomeEntry) {
  const { title } = data;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: title,
    url: "https://small-luxury-hotels.com",
  };
}

// 2. Individual Hotel
export function generateHotelJsonLd(hotel: HotelEntry) {
  const { title, description, gallery, location } = hotel.data;
  const url = `https://small-luxury-hotels.com/hoteles/${hotel.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: title,
    description: description,
    image: gallery[0].url.src,
    url: url,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.city,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
  };
}

// 3. Hotel List
export function generateHotelListJsonLd(hotels: HotelEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lista de Hoteles",
    url: "",
    itemListElement: hotels.map((hotel, index) => {
      const { title, gallery } = hotel.data;
      const url = `https://small-luxury-hotels.com/hoteles/${hotel.id}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        url: url,
        name: title,
        ...(gallery && { image: gallery[0].url.src }),
      };
    }),
  };
}

// 4. Room
export function generateRoomJsonLd(room: RoomEntry) {
  const { title, description, maxOccupancy, bedType } = room.data;
  return {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: title,
    description: description,
    bed: {
      "@type": "BedDetails",
      typeOfBed: bedType,
    },
    occupancy: {
      "@type": "QuantitativeValue",
      value: maxOccupancy,
    },
  };
}

// 5. Individual Experience
export function generateExperienceJsonLd(experience: ExperienceEntry) {
  const { title, description, gallery } = experience.data;
  const url = `https://small-luxury-hotels.com/experiencias/${experience.id}`;

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: title,
    description: description,
    image: gallery[0].url.src,
    url: url,
    touristType: "All",
  };
}

// 6. Experience List
export function generateExperienceListJsonLd(experiences: ExperienceEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lista de Experiencias",
    url: "https://small-luxury-hotels.com/experiencias",
    itemListElement: experiences.map((experience, index) => {
      const { title, gallery } = experience.data;
      const url = `https://small-luxury-hotels.com/experiencias/${experience.id}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        url: url,
        name: title,
        ...(gallery && { image: gallery[0].url.src }),
      };
    }),
  };
}

// 7. About Us
export function generateAboutJsonLd(data: AboutEntry) {
  const { title } = data;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: title,
    url: "https://small-luxury-hotels.com/nosotros",
    logo: "https://small-luxury-hotels.com/favicon.ico",
    sameAs: contactInfo.social.networks.map((social) => social.url),
  };
}

// 8. Individual Blog Post
export function generateBlogPostJsonLd(blog: BlogEntry) {
  const { title, image, author, publishDate, updatedDate } = blog.data;
  const url = `https://small-luxury-hotels.com/blog/${blog.id}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    image: image.url,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: publishDate,
    dateModified: updatedDate,
    mainEntityOfPage: url,
  };
}

// 9. Blog List
export function generateBlogListJsonLd(blogs: BlogEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lista de Blog",
    url: "https://small-luxury-hotels.com/blog",
    itemListElement: blogs.map((blog, index) => {
      const { title, image } = blog.data;
      const url = `https://small-luxury-hotels.com/blog/${blog.id}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        url: url,
        name: title,
        ...(image && { image: image }),
      };
    }),
  };
}

// 10. Legal Page
export function generateLegalJsonLd(legal: legalEntry) {
  const { title, description } = legal.data;
  const url = `https://small-luxury-hotels.com/legal/${legal.id}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    url: url,
    description: description,
  };
}

interface Blog {
  title: string;
  description: string;
  img: string;
  link: string;
  category: string;
}

export const blogData: Blog[] = [
  {
    title: "Exploring the Hidden Gems of the City",
    description:
      "Join us as we uncover the lesser-known attractions that offer unique experiences.",
    img: "https://placehold.co/300x200",
    link: "/blog/hidden-gems",
    category: "categoría",
  },
  {
    title: "A Culinary Journey Through Local Cuisine",
    description:
      "Discover the flavors and dishes that define our region’s culinary heritage.",
    img: "https://placehold.co/300x200",
    link: "/blog/culinary-journey",
    category: "categoría",
  },
  {
    title: "The Art of Relaxation: Top Spa Retreats",
    description:
      "Find out where to unwind and rejuvenate with our guide to the best spa retreats.",
    img: "https://placehold.co/300x200",
    link: "/blog/spa-retreats",
    category: "categoría",
  },
];

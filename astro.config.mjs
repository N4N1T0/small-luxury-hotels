import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";

import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";

import playformCompress from "@playform/compress";

export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    preact(),
    sitemap(),
    robotsTxt(),
    playformCompress(),
  ],
});
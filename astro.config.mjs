import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon({
      include: {
        bi: ["chevron-left"],
        carbon: ["home", "media-library", "search", "time"],
        ion: ["logo-vercel"],
        mdi: ["github", "heart", "play"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
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

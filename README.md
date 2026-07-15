# Spotify clone with Astro View Transitions [![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

A Spotify-inspired interface using Astro's [client router and View Transitions](https://docs.astro.build/en/guides/view-transitions/) for fluid navigation. The example also uses Tailwind CSS and Svelte.

## Local development

Node.js 22.12 or newer and [Bun](https://bun.sh/) are required.

```sh
bun install
bun run dev
```

Run the migration checks before submitting changes:

```sh
bun run check
bun run build
bun run format:check
```

## Deploy

You can deploy the example using [Vercel Template](https://vercel.com/templates/astro/view-transitions) or see a [live demo](https://spotify-astro-transitions.vercel.app/)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Figorm84%2Fspotify-astro-transitions)

#### Video

https://github.com/igorm84/spotify-astro-transitions/assets/16727448/1e34f079-1f17-4ff1-9285-1dc406f0c631

### About

View Transitions animate between DOM states. Learn more in these links:

- Astro Documentation: https://docs.astro.build/en/guides/view-transitions/
- MDN Documentation: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API

### Known issues

This project intentionally configures Astro's client router with `fallback="none"`. Browsers without the View Transition API still navigate, but use full-page navigation without animation. See [MDN's current compatibility data](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition#browser_compatibility).

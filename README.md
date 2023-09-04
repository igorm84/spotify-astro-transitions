# Spotify clone with View Transitions from Astro 3.0

Clone of Spotify with Astro View Transitions integration for fluid navigation + tailwindcss and svelte
- See a live preview at https://spotify-astro-transitions.vercel.app/
> **Warning**
> Currently [View Transitions](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) is an experimental feature, so may not work properly (specially in firefox and some mobile browsers)

![Screenshot 2023-09-03 185250](https://github.com/igorm84/spotify-astro-transitions/assets/16727448/6cfdd5f6-d3d0-44ae-8798-ad608699fadf)



### About

View Transition is a **experimental** mechanism to transition between DOM states, learn more in these links:

- Astro Documentation: https://docs.astro.build/en/guides/view-transitions/
- MDN Documentation: https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API

### Known issues
#### Firefox
Currently Firefox is rendering a strange behavior, I'll be looking for fixes for that
#### Mobile browsers
Some mobile browsers aren't playing the animation/transition and/or giving strange behavior when touching the cards (need to touch twice to navigate)

# Vicky & Yashi — Wedding Storybook

React 19, TypeScript, Vite, Tailwind v4, Framer Motion and TanStack Router (the Lovable platform router). No backend or account needed.

## Pages

- `/` — invitation chooser.
- `/bride` — Yashi weds Vicky Ji; bride's family only.
- `/groom` — Vicky weds Yashi; groom's family and firm only.
- `/links` — enter a name, preview or copy both personalized links.

`?name=Rahul%20Sharma` opens directly into the personalized invitation and remembers the name locally. Without a URL name, the envelope gate appears, with a remembered name prefilled. “Not you?” clears it and reopens the gate. Names are never sent to a backend.

## Edit text and family names

All invitation copy, wedding values, captions, dates, metadata and image slots are in `src/data/config.ts`. Edit names and group assignments in `src/data/families.ts`. Relations and pending entries are not displayed. Empty groups automatically disappear. Happy Heart entries support an optional `message` shown in italic. All hashtag appearances and calendar descriptions use `HASHTAGS`.

Venue, address, dress code, bios and tagline are editable sample copy, not confirmed wedding information.

## Replace illustrations and photographs

The invitation currently uses generated storybook artwork and sample painted album images. Replace these files with your own using the same names:

| File in `public/images`                 | Recommended image                                                   |
| --------------------------------------- | ------------------------------------------------------------------- |
| `hero.jpg`                              | Landscape palace/background, with clear space near top centre       |
| `bride.png`, `groom.png`                | Individual painted portraits, ideally transparent                   |
| `couple.png`                            | Transparent full-length couple illustration                         |
| `finale.jpg`                            | Wide sunset scene                                                   |
| `map.jpg`                               | Illustrated map plate; absent by default, a decorative map is shown |
| `events/haldi.png`                      | Yellow outfits, marigold jewellery, carnival props                  |
| `events/sangeet.png`                    | Magenta sequin lehenga and navy bandhgala, dancing                  |
| `events/baarat.png`                     | Ivory-gold outfits, safa/kalgi, dhol or ghodi                       |
| `events/shaadi.png`                     | Red Rajasthani/Marwadi poshak and ivory sherwani, red/orange safa   |
| `gallery/1.jpg` through `gallery/8.jpg` | Your album photos                                                   |
| `og-cover.jpg`                          | 1200×630 social sharing cover                                       |

Add more album photos by extending `GALLERY` in config. Use compressed JPG backgrounds and transparent PNG illustrations. Avoid huge original camera files for phone performance.

## Google Maps

The supplied short link is used by both directions buttons. It cannot be embedded. Open your venue in Google Maps → Share → Embed a map → Copy HTML, then copy only the iframe's `src` URL into `MAP_EMBED_URL` in config. Until this is configured, a clearly labelled venue-pin placeholder appears; the directions link remains active. The decorative car map is not a real geographic map.

Google Maps live rendering must be checked on the deployed site once you supply the embed URL.

## Sharing cover

Replace `public/images/og-cover.jpg`. `META.ogImage` holds its slot. Relative or placeholder image URLs are deliberately not emitted as Open Graph image tags; hosting supplies the preview. Once deployed, add an absolute HTTPS URL for the actual visible invitation cover to the side-specific `invitationHead()` metadata as both `og:image` and `twitter:image`. Text metadata, theme-color, and titles are already side-specific. Publish again after changing sharing metadata.

## Interactions and accessibility

The scratch canvas supports mouse, pen and touch with Pointer Events and captures the pointer. Only the canvas blocks touch scrolling. At roughly 55% it reveals automatically; a text reveal control also supports keyboard and non-scratching access. Calendar downloads contain two events, one for each day, with accurate IST times encoded as UTC. Wishes rise from the button; hashtags and links copy with feedback. Gallery photos open in an overlay (Escape closes, arrows change photos).

Reduced-motion settings disable continuous movement and scratch petals. Lantern movement pauses outside the viewport. Animation uses transforms and opacity; scratch drawing uses canvas. Final iOS Safari/Android Chrome device validation and 60fps profiling are recommended on real devices.

## Development

`npm install` then `npm run dev`. Test with `npm test`. Build for deployment with `npm run build`.

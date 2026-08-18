# tesla-referral

Static one-page site for my Tesla referral code, in four languages.
No framework, no build step, no external requests — plain HTML, CSS and one small JS file.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | English page (also the `x-default` for search engines) |
| `nl.html`, `fr.html`, `de.html` | Dutch, French and German versions |
| `style.css` | Shared dark, mobile-first stylesheet |
| `referral.js` | Referral code/link constants + copy-to-clipboard |
| `img/*.svg` | Illustrations (hand-written SVG, a few hundred bytes each) |
| `img/og.png` | Social sharing preview, generated from `tools/og-image.html` |
| `sitemap.xml`, `robots.txt` | Indexing |

## Changing the referral code

Edit the two constants at the top of `referral.js`:

```js
const REFERRAL_CODE = "tim588947";
const REFERRAL_URL  = "https://ts.la/tim588947";
```

Every code and link in the page body updates from those. Three things do **not**,
because search engines and social networks read them as static text:

1. The `<title>` and `<meta name="description">` of each of the four pages.
2. The `og:image:alt` / `twitter:image:alt` tags.
3. `img/og.png` — regenerate it from `tools/og-image.html` (command is in that file).

A search-and-replace of the old code across the four HTML files covers 1 and 2.

## Replacing the illustrations with your own photos

The three cards under "what owning one actually looks like" use local SVG files.
To use real photos instead, drop them in `img/` and change the `src` in each
`<li class="feature">` block (all four language files):

```html
<img src="img/my-photo.jpg" alt="..." width="200" height="140" loading="lazy" decoding="async">
```

Keep them local — the site makes no external requests, which is why it loads instantly.
Resize to roughly 800px wide before committing so the page stays light.

## Publishing

GitHub Pages, from the repository root. The canonical URLs, `sitemap.xml` and
`robots.txt` all assume `https://timdg01.github.io/`. If you publish from this
project repo instead of a `TimDG01.github.io` user repo, the real base URL is
`https://timdg01.github.io/tesla-referral/` and those URLs need updating.

After publishing, submit the sitemap in Google Search Console. Metadata alone does
not get a page ranked for a competitive term like "Tesla referral code" — indexing
plus links pointing at the page do the actual work.

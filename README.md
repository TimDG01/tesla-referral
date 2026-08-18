# tesla-referral

Static one-page site for my Tesla referral code, in four languages.
No framework, no build step, no external requests — plain HTML, CSS and one small JS file.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | English page (also the `x-default` for search engines) |
| `nl.html`, `fr.html`, `de.html` | Dutch, French and German versions |
| `style.css` | Shared dark, mobile-first stylesheet |
| `referral.js` | Referral code/link constants, copy-to-clipboard, remembers the language choice |
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

## Which language a visitor gets

English is the default: `index.html` is what everyone lands on, and it is the
`x-default` for search engines. A small inline script in its `<head>` — and only
there — sends visitors on to `nl.html`, `fr.html` or `de.html` when their browser
asks for Dutch, French or German. Any other browser language stays on English.

The redirect never overrules a person:

- Picking a language in the language bar stores that choice (`preferred-lang` in
  `localStorage`), and a stored choice always wins over the browser language.
- `?lang=en` on the entry page forces English and remembers it; `?lang=nl|fr|de`
  forces that version. Handy when you want to share a link in a specific language.
- With JavaScript off, or in a browser that blocks storage, nothing redirects and
  everyone sees English with the language bar on top.

The three translated pages carry no redirect at all, so a direct link to
`nl.html` always opens Dutch, whatever the browser says.

To switch the automatic behaviour off entirely, delete that inline `<script>`
block from `index.html`. English then stays put for everyone, and the language
bar keeps working.

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

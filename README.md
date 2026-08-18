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

GitHub Pages, served from this repository: Settings -> Pages -> Source
"Deploy from a branch", branch `main`, folder `/ (root)`. The site then lives at
`https://timdg01.github.io/tesla-referral/`, which is what the canonical tags,
the hreflang cluster, `sitemap.xml` and `robots.txt` all point at. Every link
inside the pages is relative, so moving the site to another base URL only means
updating those absolute URLs.

Note that on a project page, `robots.txt` is inert: crawlers only read it at the
host root (`https://timdg01.github.io/robots.txt`), which this repo does not
control. It is kept here because it becomes valid the moment the site moves to a
root domain, and because nothing on the site needs blocking anyway. Submit
`sitemap.xml` directly in Search Console instead of relying on the `Sitemap:`
line in it.

### Getting indexed

Everything a search engine reads is already in the files: unique titles and
descriptions per language, a reciprocal hreflang cluster with `x-default`,
canonical tags, `FAQPage` + `WebPage` structured data with an author and a
`dateModified`, a sitemap, alt text on every image and a page that needs no
external request to render. What no markup can do is make Google aware the site
exists, or make it outrank established pages. That part is manual:

1. **Search Console** (https://search.google.com/search-console) - add the
   property `https://timdg01.github.io/tesla-referral/` as a URL prefix. Verify
   with the HTML-tag method: Google gives a `<meta name="google-site-verification"
   content="...">` line, which goes in the `<head>` of `index.html`.
2. **Submit the sitemap** under Sitemaps: `sitemap.xml`.
3. **Request indexing** for all four URLs via URL Inspection. Without this a new
   site can sit unnoticed for weeks.
4. **Bing Webmaster Tools** does the same job for Bing, and takes one import
   from Search Console.
5. **Links pointing at the page** are what actually moves a competitive term:
   an EV forum signature, a Reddit or Tweakers post, a local Tesla owners group.
   Ten relevant links beat any amount of meta-tag tuning.
6. **Keep the date honest.** `DATE_ISO` / the visible "last updated" line and
   `<lastmod>` in the sitemap should move when the content really changes.

Realistic expectation: the generic term "tesla referral code" is dominated by
large aggregator sites and is not winnable with a one-page site. What this site
can realistically rank for are the long-tail queries it answers precisely -
things like "tesla referral code belgie", "code parrainage tesla belgique",
"referral code toevoegen na bestelling".

After publishing, submit the sitemap in Google Search Console. Metadata alone does
not get a page ranked for a competitive term like "Tesla referral code" — indexing
plus links pointing at the page do the actual work.

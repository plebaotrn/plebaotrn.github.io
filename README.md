# Personal Site

Personal portfolio of Pham Le Bao Tran. Built with [Hugo](https://gohugo.io/) and hand written CSS and JavaScript, with three.js, GSAP and Lenis for motion.

Live site: https://plebaotrn.github.io/

## What is on the home page

1. **Loader and sound gate.** A counter from 0 to 100, then a 3D particle orb where the visitor chooses to enter with or without ambient sound. The choice is remembered for the tab, so coming back from another page of the site (the Back button, or a link home) skips both screens. The Back button also returns to where the visitor left off, and sound comes back on their first tap if they chose it.
2. **Scroll story.** Five chapters whose words light up as you scroll, over one particle field that morphs: a 3D bunny (drag to spin, hover to droop its ears), a portrait sketch, an interface that splits into layers and gets tested, a bug that becomes a check mark, and a camera aperture.
3. **Project lens.** A curved, draggable gallery with sound. Clicking a project dives into the image, then opens the project's own page.
4. **About.** Focus areas, a terminal, and a 3D skills map you can turn.
5. **Writing.** Latest articles from `content/writing`.
6. **Contact.** A small bunny that waves and follows the pointer.

Everything respects `prefers-reduced-motion`, and the page still reads without WebGL or JavaScript.

## Other pages

- **/projects/** lists every project as an index (hovering a row shows a floating preview) or as a grid, with a filter by project type. The layout choice is remembered.
- **/projects/&lt;slug&gt;/** is a case study for one project, built from its entry in `data/projects.yaml`: overview, what I did, process, outcome, screenshots, stack, a link to the related article and the next project.
- **/writing/** shows the latest article as a featured card, then the rest grouped by year, with a topic filter and search.
- **/writing/&lt;article&gt;/** has a reading progress bar, a card linking to its project, a copy link button and older and newer articles.

These pages read fine without JavaScript; the script only adds the filters, search, preview and progress bar.

## Run it locally

Requires **Hugo extended 0.152.2 or newer**.

```bash
hugo server        # http://localhost:1313, reloads on save
hugo server -D     # also shows drafts
hugo --gc --minify # production build into ./public
```

## Where things live

| Path | What it holds |
| --- | --- |
| `hugo.toml` | Site title, email, social links, availability line |
| `data/story.yaml` | The five story chapters |
| `data/projects.yaml` | Projects, in display order, for the home gallery, `/projects/` and one page per project |
| `data/skills.yaml` | Areas, skills and links for the skills map |
| `content/projects/` | Title, kicker and intro of `/projects/`; `_content.gotmpl` builds the project pages from the yaml |
| `content/writing/` | Title, kicker and intro of `/writing/`, and the articles in Markdown |
| `archetypes/writing.md` | Template for `hugo new content writing/<name>.md` |
| `assets/images/` | Profile photo, project screenshots and gallery images (converted to WebP by Hugo) |
| `assets/css/main.css`, `assets/js/main.js` | Styles and motion for the home page |
| `assets/css/pages.css`, `assets/js/pages.js` | Styles and behaviour for Projects, Writing and 404 |
| `layouts/` | Hugo templates; `layouts/_partials/home/` has one file per home section |
| `layouts/projects/`, `layouts/writing/` | List and single page templates for each section |
| `layouts/_markup/render-image.html` | Markdown images become a `<figure>` with the title as caption |
| `layouts/_shortcodes/phones.html` | A row of phone screenshots inside an article |
| `static/vendor/` | Self hosted three.js r128, GSAP 3.12.5 with ScrollTrigger, Lenis 1.1.13 |

## Adding content

**A project.** Put a screenshot in `assets/images/projects/` and add an entry to `data/projects.yaml`. `slug` sets the page address (`/projects/<slug>/`). The words before "project" in `type` (Client, University, Team) become a filter on `/projects/`. Optional fields:

- `process` and `outcome` add their own sections to the case study.
- `gallery` is a list of `src` and `caption` pairs shown under Screens. When every image is portrait they sit side by side like phones.
- `post` points to a related article, for example `/writing/building-hsrc-bilingual-ux`.

**An article.** Run `hugo new content writing/<name>.md`, fill in `title`, `tag` and `summary`, and set `draft: false` when it is ready. Each `tag` becomes a filter on `/writing/`. To link an article to a project, either set `post` on the project or add `project: <slug>` to the article's front matter. Images can live in `assets/images/` and are referenced as `![alt](images/projects/x.png "caption")`.

## Deploy

Pushing to `main` runs `.github/workflows/hugo.yml`, which builds the site and publishes it to GitHub Pages. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

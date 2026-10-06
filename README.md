# Pham Le Bao Tran · Portfolio

Personal portfolio of Pham Le Bao Tran, Software Development student at Swinburne University of Technology. Built with [Hugo](https://gohugo.io/) and hand written CSS and JavaScript, with three.js, GSAP and Lenis for motion.

Live site: https://plebaotrn.github.io/

## What is on the page

1. **Loader and sound gate.** A counter from 0 to 100, then a 3D particle orb where the visitor chooses to enter with or without ambient sound.
2. **Scroll story.** Five chapters whose words light up as you scroll, over one particle field that morphs: a 3D bunny (drag to spin, hover to droop its ears), a portrait sketch, an interface that splits into layers and gets tested, a bug that becomes a check mark, and a camera aperture.
3. **Project lens.** A curved, draggable gallery with sound. Clicking a project dives into its detail view.
4. **About.** Focus areas, a terminal, and a 3D skills map you can turn.
5. **Writing.** Latest articles from `content/writing`.
6. **Contact.** A small bunny that waves and follows the pointer.

Everything respects `prefers-reduced-motion`, and the page still reads without WebGL or JavaScript.

## Run it locally

Requires **Hugo extended 0.152.2 or newer**.

```bash
hugo server        # http://localhost:1313, reloads on save
hugo --gc --minify # production build into ./public
```

## Where things live

| Path | What it holds |
| --- | --- |
| `hugo.toml` | Site title, email, social links, availability line |
| `data/story.yaml` | The five story chapters |
| `data/projects.yaml` | Projects for the gallery and detail view |
| `data/skills.yaml` | Areas, skills and links for the skills map |
| `content/writing/` | Articles in Markdown |
| `assets/images/` | Profile photo and project screenshots (resized to WebP by Hugo) |
| `assets/css/main.css` | All styles |
| `assets/js/main.js` | All motion code for the home page |
| `layouts/` | Hugo templates; `layouts/_partials/home/` has one file per home section |
| `static/vendor/` | Self hosted three.js r128, GSAP 3.12.5 with ScrollTrigger, Lenis 1.1.13 |

## Deploy

Pushing to `main` runs `.github/workflows/hugo.yml`, which builds the site and publishes it to GitHub Pages. In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.



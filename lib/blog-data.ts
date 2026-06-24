export interface BlogPost {
  id: number
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  image: string
  likes: number
  comments: number
  content: string[]
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "designing-cobunny-figma-to-vue-3",
    title: "Designing CoBunny: from Figma to Vue 3",
    description:
      "A short devlog about designing the booking flow for CoBunny — what I learned from user feedback, why I reduced the booking steps, and how Figma-first development changed my workflow.",
    date: "December 2025",
    readTime: "5 min read",
    category: "UX / Design",
    image: "/creative-design-workspace-colorful-gradient.jpg",
    likes: 0,
    comments: 0,
    tags: ["UX", "Design", "Figma", "Vue 3"],
    content: [
      "CoBunny started as a university project — a co-working space booking platform built with Vue 3 and Supabase. What I didn't expect was how much the design process would shape the final product, and how much I'd learn from three short user interviews before writing a single line of code.",
      "I interviewed three uni students about how they currently find and book study or co-working spaces. The common thread: they didn't mind paying, but they hated complexity. Every existing tool had too many steps, confusing availability calendars, and no way to see their past bookings without digging through confirmation emails. That feedback became the brief.",
      "From there I mapped the full user journey — discover, compare, book, manage — and used it to decide exactly which screens I needed. Before opening VS Code, I designed the full flow in Figma: low-fidelity wireframes first to test the structure, then a hi-fi pass once the layout felt right. This order mattered: by the time I started coding, every component already had a defined purpose.",
      "The original booking flow had five steps. After showing the Figma prototype to a friend, it became clear that steps three and four were redundant — the user was being asked to confirm information they'd already entered. I collapsed them, and the flow went from five steps to three. That's the kind of change that's trivial to make in Figma and painful to refactor mid-implementation.",
      "The final result was a mobile-first interface with real-time availability and persistent booking history. Users I showed it to called it 'straightforward' — which, given how cluttered the alternatives were, felt like exactly the right outcome.",
    ],
  },
  {
    id: 2,
    slug: "building-hsrc-bilingual-ux",
    title: "Building HSRC: designing for two languages and two audiences",
    description:
      "Notes on designing a bilingual website for a Vietnamese research organisation — how I handled bilingual UX, brand translation, and building a 3D interactive section with Three.js.",
    date: "May 2026",
    readTime: "6 min read",
    category: "Design / Case Study",
    image: "/modern-web-design-colorful-gradient.jpg",
    likes: 0,
    comments: 0,
    tags: ["Design", "Case Study", "UX", "Three.js", "Bilingual"],
    content: [
      "HSRC — the Human Sciences Research Centre — is a Vietnamese organisation working on something they call Wholebeing Science: an interdisciplinary approach to human flourishing that sits between psychology, philosophy, and education. When they approached me to design and build their website, the first challenge was figuring out who the site was actually for.",
      "After talking with the HSRC team, two distinct audiences emerged: Vietnamese academics and researchers who already knew the organisation, and international partners — institutions, collaborators, and potential funders — who were encountering it for the first time. These two groups had very different mental models and different goals. The Vietnamese audience wanted depth; the international audience needed context. A single page structure couldn't serve both equally.",
      "I designed two parallel navigation structures in Figma before building anything. The bilingual toggle isn't just a text swap — in several sections the Vietnamese and English versions present information in a different order because the cultural starting point is different. This meant every component had to be designed twice, with both languages reviewed against the brand voice before implementation.",
      "The brand itself was a translation challenge. HSRC's visual identity is grounded in SPIRE — their core research framework — which has a specific symbolic geometry. I worked with the team to extract a set of design tokens: colours, type scales, and spacing values that felt true to the brand without being derivative. The result is a site that looks designed for HSRC, not just built on top of their logo.",
      "The most technically interesting part was the interactive 3D SPIRE model — built with Three.js and React Three Fiber. The model needed to be explanatory (it had to communicate the framework's structure) and engaging (it's the centrepiece of the homepage). Getting the lighting and camera controls to feel natural on both desktop and mobile took several iterations. The Three.js abstraction in React Three Fiber made it possible to keep the component code readable alongside the rest of the Next.js codebase.",
    ],
  },
  {
    id: 3,
    slug: "smooth-animations-in-web-development",
    title: "Smooth Animations in Web Development",
    description:
      "Master the art of creating delightful micro-interactions and animations that enhance user engagement.",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Development",
    image: "/animation-motion-design-colorful.jpg",
    likes: 56,
    comments: 15,
    tags: ["Animation", "CSS", "JavaScript", "UX"],
    content: [
      "Animation is one of the most powerful tools in a web developer's toolkit — and one of the most misused. Done right, animations guide attention, provide feedback, and make interfaces feel alive and responsive. Done wrong, they distract, annoy, and slow down the user experience.",
      "The golden rule of web animation is 'less is more'. A subtle 200ms fade-in on page load, a gentle scale effect on hover, a smooth color transition on a button — these micro-interactions add up to an experience that feels polished and professional without ever demanding the user's conscious attention.",
      "CSS transitions are your first tool. They're GPU-accelerated, performant, and require minimal code. Transitioning the transform and opacity properties is especially efficient since these can be handled by the compositor thread without triggering layout or paint operations. This is the secret to silky 60fps animations.",
      "For more complex sequences, CSS animations with @keyframes give you full control over multi-step effects. Libraries like Framer Motion (React) and GSAP take this further, offering spring physics, scroll-linked animations, and entrance/exit choreography that would be painfully complex to hand-code.",
      "Always respect the prefers-reduced-motion media query. Some users experience motion sickness or have vestibular disorders that make animations harmful. Wrapping your CSS animations in a media query check ensures your site is inclusive and accessible to all visitors.",
    ],
  },
  {
    id: 4,
    slug: "building-responsive-layouts",
    title: "Building Responsive Layouts",
    description: "A comprehensive guide to creating layouts that work perfectly across all devices and screen sizes.",
    date: "March 8, 2024",
    readTime: "7 min read",
    category: "Development",
    image: "/responsive-design-mobile-desktop.jpg",
    likes: 45,
    comments: 10,
    tags: ["Responsive", "CSS Grid", "Flexbox", "Mobile-First"],
    content: [
      "Responsive design is no longer optional — it's the baseline expectation. With over 60% of web traffic now coming from mobile devices, a site that doesn't adapt to different screen sizes is a site that's failing more than half its visitors before they even read a single word.",
      "The mobile-first approach flips the traditional design process on its head. Instead of designing for desktop and then scaling down, you start with the smallest screen and progressively enhance the layout for larger viewports. This forces you to prioritize content and strip away anything non-essential — constraints that actually improve the final design.",
      "CSS Grid and Flexbox are your two primary layout tools. Flexbox excels at one-dimensional layouts — rows or columns of items that need to align and distribute space. Grid shines for two-dimensional layouts where you need precise control over both axes. Modern responsive layouts often combine both: Grid for the overall page structure, Flexbox for individual components.",
      "Tailwind CSS's responsive prefixes make this workflow incredibly efficient. Prefixing any utility with sm:, md:, lg:, or xl: applies it only at that breakpoint and above. A simple grid class becomes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 — a fully responsive three-column grid in a single class string.",
      "Test early and often on real devices. Browser developer tools are invaluable for quick checks, but they don't perfectly simulate touch interactions, actual pixel densities, or the performance of lower-end hardware. Using services like BrowserStack or maintaining a small collection of test devices reveals issues that simulators miss.",
    ],
  },
  {
    id: 5,
    slug: "dark-mode-best-practices",
    title: "Dark Mode Best Practices",
    description: "Implementing dark mode the right way with proper color contrast and accessibility considerations.",
    date: "March 5, 2024",
    readTime: "5 min read",
    category: "Design",
    image: "/dark-mode-interface-design.jpg",
    likes: 51,
    comments: 9,
    tags: ["Dark Mode", "Accessibility", "CSS Variables", "Design Systems"],
    content: [
      "Dark mode has become a must-have feature for modern applications. Beyond its aesthetic appeal, dark mode reduces eye strain in low-light environments, extends battery life on OLED displays, and is a genuine accessibility preference for many users. Implementing it well, however, requires more care than simply inverting colors.",
      "The most common mistake is treating dark mode as a pure color inversion. Dark backgrounds should use dark grays (like #1a1a2e or #252525) rather than pure black, which creates harsh contrast that's actually harder to read. Similarly, text in dark mode should be off-white (#fafafa or #e5e7eb) rather than pure white for the same reason.",
      "CSS custom properties (variables) are the cleanest architecture for theming. Define your entire color palette as variables on :root for light mode, then override them in a [data-theme='dark'] selector or via the prefers-color-scheme media query. Every component automatically inherits the correct colors without a single conditional style.",
      "Shadows behave differently in dark mode. Elevation and depth — which light mode communicates with drop shadows — become almost invisible against dark backgrounds. Instead, use lighter background fills to indicate elevation: a card that's slightly lighter than the page background sits visually 'above' it even without a shadow.",
      "Give users control. While prefers-color-scheme detects the OS-level preference, always provide a manual toggle so users can override it on your site specifically. Store this preference in localStorage so it persists across sessions. The next-themes library handles all of this elegantly with a few lines of setup.",
    ],
  },
  {
    id: 6,
    slug: "typography-in-modern-design",
    title: "Typography in Modern Design",
    description: "Understanding how to choose and use fonts effectively to create hierarchy and improve readability.",
    date: "March 1, 2024",
    readTime: "4 min read",
    category: "Design",
    image: "/typography-fonts-design.jpg",
    likes: 33,
    comments: 6,
    tags: ["Typography", "Fonts", "Design", "Readability"],
    content: [
      "Typography is the silent workhorse of design. When it's done well, users don't notice it at all — they simply read comfortably and absorb information effortlessly. When it's done poorly, it creates friction at every step: text that's too small, line lengths that are too long, or fonts that don't match the brand personality all erode the user's trust.",
      "Font pairing is an art, but there are reliable formulas to start with. Pairing a serif heading font with a sans-serif body font creates a classic, elegant feel (think editorial and news sites). Two sans-serif fonts at different weights — one geometric, one humanist — feels modern and clean, which suits tech products well. The most important rule: don't pair two fonts that are too similar, as they'll compete without adding contrast.",
      "Line height (leading) and line length (measure) dramatically affect readability. Body text reads best at a line height of 1.5–1.7× the font size. Lines should contain 60–75 characters for optimal reading speed — significantly wider and the eye struggles to track back to the start of the next line; too narrow and the constant line breaks disrupt reading flow.",
      "Type scale creates visual hierarchy. Rather than choosing font sizes arbitrarily, use a modular scale — a consistent ratio applied to a base size. The 1.250 (Major Third) and 1.333 (Perfect Fourth) scales are popular choices that produce harmonious heading sizes from h1 down to body text. Tools like Typescale.com make this straightforward.",
    ],
  },
]

export function getBlogPost(id: string | number): BlogPost | undefined {
  const numId = typeof id === "string" ? parseInt(id, 10) : id
  return blogPosts.find((post) => post.id === numId)
}

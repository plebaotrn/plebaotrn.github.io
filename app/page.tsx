import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Mail, Linkedin, ExternalLink, Users, User, MapPin, Code2 } from "lucide-react"
import { featuredProjects } from "@/lib/projects-data"
import { blogPosts } from "@/lib/blog-data"
import { ScrollReveal } from "@/components/scroll-reveal"

const skills = [
  { label: "JavaScript", color: "skill-yellow" },
  { label: "TypeScript", color: "skill-blue" },
  { label: "React", color: "skill-cyan" },
  { label: "Next.js", color: "skill-purple" },
  { label: "Vue 3", color: "skill-green" },
  { label: "Tailwind CSS", color: "skill-teal" },
  { label: "Kotlin", color: "skill-orange" },
  { label: "C#", color: "skill-pink" },
  { label: "SQL", color: "skill-red" },
  { label: "Supabase", color: "skill-emerald" },
  { label: "Git", color: "skill-amber" },
  { label: "Figma", color: "skill-violet" },
]

export default function HomePage() {
  const latestPosts = blogPosts.slice(0, 2)

  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-5xl w-full px-6 pt-20 pb-20 overflow-hidden">
        {/* Decorative blobs */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />

        <div className="relative flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-16">

          {/* Text */}
          <div className="flex flex-col gap-6 flex-1 section-fade">

            <div className="flex flex-col gap-2">
              <p className="text-sm font-mono text-primary tracking-wide">Hi, I'm</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] whitespace-nowrap">
                Pham Le Bao Tran
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-lg text-muted-foreground font-light">Software Developer</p>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                <p className="text-lg font-light hero-role-cycle">
                  <span className="role-1">Web Dev</span>
                  <span className="role-2">UX Designer</span>
                  <span className="role-3">Builder</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 text-primary/70" />
              <span>Footscray, VIC · Ho Chi Minh City, VN</span>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Specialising in web application development and UI/UX design.
              Currently studying Computer Science at Swinburne University.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Button
                asChild
                size="sm"
                className="hero-btn-primary rounded-full px-6 shadow-lg"
              >
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full px-6 hero-btn-outline">
                <Link href="/about">About Me</Link>
              </Button>
            </div>

            <div className="flex items-center gap-5 pt-1">
              {[
                { href: "https://github.com/plebaotrn", icon: <Github className="h-5 w-5" />, label: "GitHub", cls: "social-github" },
                { href: "https://www.linkedin.com/in/le-bao-tran-pham-016987325/", icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", cls: "social-linkedin" },
                { href: "mailto:phamtran2082005@gmail.com", icon: <Mail className="h-5 w-5" />, label: "Email", cls: "social-email" },
              ].map(({ href, icon, label, cls }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`social-icon ${cls}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex-shrink-0 section-fade" style={{ animationDelay: "150ms" }}>
            <div className="avatar-wrap">
              {/* Decorative offset layers */}
              <div className="avatar-deco-1" />
              <div className="avatar-deco-2" />
              {/* Photo */}
              <div className="relative h-72 w-56 sm:h-80 sm:w-64 rounded-2xl overflow-hidden avatar-photo">
                <Image
                  src="/profile.jpg"
                  alt="Pham Le Bao Tran"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="avatar-badge avatar-badge-1"><Code2 className="h-4 w-4" /></div>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
        <div className="mt-16 flex justify-center">
          <div className="scroll-dot" />
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/30 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-5">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tech Stack</p>
          </ScrollReveal>
          <ScrollReveal className="stagger-children flex flex-wrap gap-2">
            {skills.map(({ label, color }) => (
              <span
                key={label}
                className={`skill-pill ${color} px-3 py-1.5 text-xs font-mono rounded-full border cursor-default select-none`}
              >
                {label}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 py-16 flex flex-col gap-8">
        <ScrollReveal className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Featured Projects</h2>
          <Link
            href="/projects"
            className="link-underline text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200"
          >
            All projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 100}>
              <div className="project-card group flex flex-col rounded-2xl border border-border bg-card overflow-hidden h-full">
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 project-color-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/90 text-gray-800">
                      {project.category}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full flex items-center gap-1
                      ${project.team ? "bg-indigo-500/90 text-white" : "bg-emerald-500/90 text-white"}`}>
                      {project.team
                        ? <><Users className="h-2.5 w-2.5" />Team</>
                        : <><User className="h-2.5 w-2.5" />Solo</>}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 p-4 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{project.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-auto pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag-pill px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-full border border-border">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-full border border-border">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="px-4 pb-4 flex items-center gap-3 border-t border-border/50 pt-3 mt-1">
                  <a
                    href={project.githubUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Github className="h-3.5 w-3.5" /> Code
                  </a>
                  <Link
                    href="/projects"
                    className="ml-auto flex items-center gap-1 text-xs text-primary link-underline"
                  >
                    Details <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Blog teaser ───────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col gap-8">
          <ScrollReveal className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground">From the Blog</h2>
            <Link
              href="/blog"
              className="link-underline text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              All posts <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col divide-y divide-border border border-border rounded-2xl overflow-hidden bg-card shadow-sm">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="blog-row group p-5 transition-colors duration-200 flex items-start justify-between gap-4"
                >
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-xs font-mono text-primary">{post.category}</span>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{post.description}</p>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-all flex-shrink-0 mt-1 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-200" />
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 py-16">
        <ScrollReveal>
          <div className="cta-card rounded-3xl p-10 text-center flex flex-col items-center gap-5 relative overflow-hidden">
            <div className="cta-blob-1" />
            <div className="cta-blob-2" />
            <div className="relative h-12 w-12 rounded-2xl cta-icon-bg flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-300">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="relative text-2xl font-bold tracking-tight text-foreground">Let's work together</h2>
            <p className="relative text-muted-foreground max-w-sm text-sm leading-relaxed">
              Open to internship opportunities, university collaborations, and interesting projects.
            </p>
            <div className="relative flex flex-wrap items-center justify-center gap-3 mt-1">
              <Button
                asChild
                className="hero-btn-primary rounded-full px-7 shadow-lg"
              >
                <a href="mailto:phamtran2082005@gmail.com">
                  <Mail className="mr-2 h-4 w-4" /> Get in touch
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-7 hero-btn-outline">
                <a href="https://www.linkedin.com/in/le-bao-tran-pham-016987325/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  )
}

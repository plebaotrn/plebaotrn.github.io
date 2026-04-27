import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Mail, Linkedin, ExternalLink, Users, User } from "lucide-react"
import { featuredProjects } from "@/lib/projects-data"
import { blogPosts } from "@/lib/blog-data"

const skillGroups = [
  { label: "JS / TS", mono: true },
  { label: "React", mono: true },
  { label: "Next.js", mono: true },
  { label: "Vue 3", mono: true },
  { label: "Tailwind CSS", mono: true },
  { label: "Kotlin", mono: true },
  { label: "C# / SQL", mono: true },
  { label: "Supabase", mono: true },
  { label: "Git / AWS", mono: true },
  { label: "Figma", mono: false },
  { label: "UI/UX Design", mono: false },
]

export default function HomePage() {
  const latestPosts = blogPosts.slice(0, 2)

  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 pt-20 pb-16">
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-16">

          {/* Text */}
          <div className="flex flex-col gap-5 flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-mono text-primary">Hi, I'm</p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Pham Le Bao Tran
              </h1>
              <p className="text-xl text-muted-foreground font-light">Software Developer</p>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed max-w-md">
              Aspiring Software Developer specialising in web application development and UI/UX design.
              Currently studying at Swinburne University — Vietnam Campus.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <Button asChild size="sm" className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity rounded-full px-5">
                <Link href="/projects">
                  View Projects <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="rounded-full px-5">
                <Link href="/about">About Me</Link>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <a href="https://github.com/plebaotrn" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/le-bao-tran-pham-016987325/" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:phamtran2082005@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="flex-shrink-0 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-full overflow-hidden ring-4 ring-border shadow-xl">
              <Image
                src="/profile.jpg"
                alt="Pham Le Bao Tran"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {skillGroups.map((s) => (
              <span
                key={s.label}
                className={`px-3 py-1.5 text-xs rounded-full border border-border bg-background text-foreground ${s.mono ? "font-mono" : ""}`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 py-16 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1">
            All projects <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-40 w-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/90 text-foreground">
                    {project.category}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full flex items-center gap-1
                    ${project.team ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {project.team
                      ? <><Users className="h-2.5 w-2.5" /> Team</>
                      : <><User className="h-2.5 w-2.5" /> Solo</>}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 p-4 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
                  <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{project.period}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto pt-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-full border border-border">
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

              <div className="px-4 pb-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Github className="h-3.5 w-3.5" /> View on GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Blog teaser ───────────────────────────────────────── */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground">From the Blog</h2>
            <Link href="/blog" className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1">
              All posts <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden bg-card">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group p-5 hover:bg-muted/40 transition-colors duration-200 flex items-start justify-between gap-4"
              >
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-xs font-mono text-primary">{post.category}</span>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{post.description}</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 py-16">
        <div className="rounded-2xl border border-border bg-card p-10 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Let's work together</h2>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            I'm open to internship opportunities, university collaborations, and interesting projects.
          </p>
          <Button asChild className="gradient-bg text-primary-foreground hover:opacity-90 transition-opacity rounded-full px-6 mt-2">
            <a href="mailto:phamtran2082005@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Get in touch
            </a>
          </Button>
        </div>
      </section>

    </div>
  )
}

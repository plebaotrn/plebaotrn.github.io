import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Users, User } from "lucide-react"
import { projects } from "@/lib/projects-data"

export const metadata = {
  title: "Projects | Pham Le Bao Tran",
  description: "A showcase of projects built by Pham Le Bao Tran — full-stack web apps, mobile apps, and more.",
}

const statusStyles: Record<string, string> = {
  completed: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
  "in-progress": "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800",
  archived: "text-muted-foreground bg-muted border-border",
}
const statusLabels: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  archived: "Archived",
}

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <div className="flex flex-col">

      {/* Header */}
      <section className="mx-auto max-w-5xl w-full px-6 pt-20 pb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Projects</h1>
        <p className="mt-3 text-base text-muted-foreground max-w-xl leading-relaxed">
          A collection of things I've built — from full-stack web apps and mobile applications to
          frontend experiments. Team projects built during university; solo projects are my own.
        </p>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-5xl w-full px-6 pb-16 flex flex-col gap-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Featured</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/90 text-gray-800">
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

              {/* Body */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{project.title}</h3>
                    <p className="text-xs text-muted-foreground">{project.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{project.period}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded border ${statusStyles[project.status]}`}>
                      {statusLabels[project.status]}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>

                <div>
                  <p className="text-[10px] font-semibold text-foreground mb-1.5">Role: <span className="font-normal text-muted-foreground">{project.role}</span></p>
                  <ul className="flex flex-col gap-1">
                    {project.bullets.map((b, i) => (
                      <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-1.5">
                        <span className="text-primary flex-shrink-0 mt-1 text-[10px]">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1 mt-auto pt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-full border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-5 pb-4 flex items-center gap-3">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
                {project.demoUrl && project.demoUrl !== "#" && (
                  <Link href={project.demoUrl}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other */}
      <div className="border-t border-border bg-muted/40">
        <section className="mx-auto max-w-5xl w-full px-6 py-12 flex flex-col gap-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Other Work</h2>

          <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden bg-card">
            {others.map((project) => (
              <div key={project.id} className="group p-5 hover:bg-muted/40 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{project.title}</span>
                      <span className="text-xs text-muted-foreground">— {project.subtitle}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded border ${statusStyles[project.status]}`}>
                        {statusLabels[project.status]}
                      </span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full flex items-center gap-1
                        ${project.team ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"}`}>
                        {project.team ? <><Users className="h-2.5 w-2.5" />Team</> : <><User className="h-2.5 w-2.5" />Solo</>}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground rounded-full border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-muted-foreground">{project.period}</span>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors">
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}

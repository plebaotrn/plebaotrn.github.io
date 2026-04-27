import Image from "next/image"
import { MapPin, Mail, Github, Linkedin, GraduationCap, Briefcase, Award } from "lucide-react"

export const metadata = {
  title: "About | Pham Le Bao Tran",
  description: "Software Developer. Swinburne University — Vietnam Campus. Bachelor of Computer Science.",
}

const skillGroups = [
  { label: "Languages", items: ["JavaScript", "TypeScript", "C#", "Kotlin", "HTML", "CSS", "SQL"] },
  { label: "Frameworks", items: ["Vue 3", "React", "Next.js", "Tailwind CSS", "Bootstrap 5"] },
  { label: "Tools & Platforms", items: ["Git", "AWS", "Supabase", "VS Code", "Android Studio", "Vite"] },
  { label: "Design", items: ["Figma", "Canva", "Adobe Premiere"] },
  { label: "Methods", items: ["OOP", "UI/UX Design", "Unit Testing", "Agile"] },
]

const experience = [
  {
    role: "Software Trainee",
    org: "SkillSpar",
    period: "2024 – 2025",
    bullets: [
      "Developed and maintained frontend features using professional coding standards.",
      "Participated in planning, development, and review stages across the full software lifecycle.",
    ],
  },
  {
    role: "Participant",
    org: "RMIT GenAI Hackathon 2025",
    period: "Oct 2025",
    bullets: [
      "Competed at RMIT Vietnam Campus, building innovative GenAI-powered solutions under time constraints.",
    ],
  },
  {
    role: "Media Designer",
    org: "Chromatique Club",
    period: "2024 – 2025",
    bullets: [
      "Produced visual content for social media campaigns ensuring brand consistency.",
      "Managed post-production for video editing and graphic design deliverables.",
    ],
  },
  {
    role: "Media Designer",
    org: "YACP Journey Project",
    period: "2022",
    bullets: [
      "Delivered creative design assets under tight deadlines in a cross-functional team.",
    ],
  },
]

const certifications = [
  { name: "Cisco CCNA", detail: "Intro to Networks & Switching, Routing, Wireless Essentials" },
  { name: "Microsoft Office Specialist (MOS)", detail: "Excel 2016 & Word 2016" },
]

const languages = [
  { name: "English", level: "Proficient" },
  { name: "Vietnamese", level: "Native" },
  { name: "Japanese", level: "Beginner" },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 pt-20 pb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="relative h-32 w-32 rounded-full overflow-hidden ring-4 ring-border shadow-lg">
              <Image
                src="/profile.jpg"
                alt="Pham Le Bao Tran"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-3 text-center sm:text-left">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Pham Le Bao Tran</h1>
              <p className="text-lg text-muted-foreground mt-1">Software Developer</p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> Footscray, VIC 3011, Australia
              </span>
              <a href="mailto:phamtran2082005@gmail.com" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" /> phamtran2082005@gmail.com
              </a>
            </div>

            <div className="flex justify-center sm:justify-start gap-3">
              <a href="https://github.com/plebaotrn" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/le-bao-tran-pham-016987325/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 max-w-2xl">
          <p className="text-base text-muted-foreground leading-relaxed">
            Aspiring Software Developer specialising in web application development and UI/UX design,
            with hands-on experience delivering full-stack and frontend projects. Eager to contribute
            technical skills and creative problem-solving to a dynamic team in the Australian tech industry.
          </p>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* ── Skills ──────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 py-12 flex flex-col gap-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-foreground">{group.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="px-2.5 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-full border border-border">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-border bg-muted/40">

        {/* ── Education ───────────────────────────────────── */}
        <section className="mx-auto max-w-5xl w-full px-6 py-12 flex flex-col gap-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Education</h2>
          <div className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card shadow-sm">
            <GraduationCap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <p className="text-sm font-semibold text-foreground">Swinburne University of Technology</p>
                <p className="text-xs text-muted-foreground font-mono">May 2024 – 2027</p>
              </div>
              <p className="text-sm text-muted-foreground">Bachelor of Computer Science — Software Development</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Started at Melbourne Hawthorn Campus · Transferred to Vietnam Campus, Feb 2026
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* ── Experience ──────────────────────────────────── */}
      <section className="mx-auto max-w-5xl w-full px-6 py-12 flex flex-col gap-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Experience</h2>
        <div className="flex flex-col gap-4">
          {experience.map((exp) => (
            <div key={`${exp.org}-${exp.period}`} className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
              <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <span className="text-sm font-semibold text-foreground">{exp.role}</span>
                    <span className="text-sm text-muted-foreground"> · {exp.org}</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{exp.period}</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary mt-1.5 flex-shrink-0 text-xs">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-border bg-muted/40">

        {/* ── Certifications & Languages ──────────────────── */}
        <section className="mx-auto max-w-5xl w-full px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Certifications</h2>
              <div className="flex flex-col gap-3">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card shadow-sm">
                    <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{cert.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Languages</h2>
              <div className="flex flex-col gap-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm">
                    <p className="text-sm font-semibold text-foreground">{lang.name}</p>
                    <span className="text-xs font-mono text-muted-foreground">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

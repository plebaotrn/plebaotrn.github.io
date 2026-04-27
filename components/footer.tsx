import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-semibold text-foreground">Pham Le Bao Tran</p>
            <p className="text-xs text-muted-foreground font-mono">Software Developer · Melbourne, AU</p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/plebaotrn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/le-bao-tran-pham-016987325/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:phamtran2082005@gmail.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pham Le Bao Tran. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}

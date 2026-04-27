import { PenLine, Mail, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"

export const metadata = {
  title: "Blog | Pham Le Bao Tran",
  description: "Blog posts coming soon — devlogs, tutorials, and thoughts on web development.",
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-[80vh]">

      {/* Header */}
      <section className="mx-auto max-w-5xl w-full px-6 pt-20 pb-6 section-fade">
        <div className="flex items-center gap-2 mb-3">
          <Rss className="h-5 w-5 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Blog</h1>
        </div>
        <p className="text-base text-muted-foreground">
          Devlogs, tutorials, and thoughts on web development and design.
        </p>
      </section>

      {/* Coming Soon */}
      <div className="flex flex-1 items-center justify-center px-6 py-20">
        <ScrollReveal>
          <div className="flex flex-col items-center text-center gap-6 max-w-md">
            {/* Animated icon */}
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl border-2 border-dashed border-border flex items-center justify-center bg-muted/40">
                <PenLine className="h-9 w-9 text-muted-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full gradient-bg animate-pulse" />
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-bold text-foreground">Coming Soon</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I'm working on my first posts — devlogs about projects I've built,
                tutorials on tools I use, and lessons from university and internships.
                <br /><br />
                Check back soon!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Button
                asChild
                className="gradient-bg text-primary-foreground hover:opacity-90 rounded-full px-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200"
              >
                <a href="mailto:phamtran2082005@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Get notified by email
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>

    </div>
  )
}

import { PenLine, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Blog | Pham Le Bao Tran",
  description: "Blog posts coming soon.",
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-[70vh]">
      <section className="mx-auto max-w-5xl w-full px-6 pt-20 pb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Devlogs, tutorials, and thoughts on web development and design.
        </p>
      </section>

      {/* Coming Soon */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="flex flex-col items-center text-center gap-5 max-w-sm">
          <div className="h-16 w-16 rounded-full bg-muted border border-border flex items-center justify-center">
            <PenLine className="h-7 w-7 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground">Coming Soon</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I'm working on my first posts — devlogs about projects, tutorials, and things I learn along the way.
              Check back soon!
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-full px-5 mt-2">
            <a href="mailto:phamtran2082005@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Get notified by email
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

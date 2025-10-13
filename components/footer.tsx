import Link from "next/link"
import { Github, Twitter, Linkedin, Mail, Heart, Sparkles } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-full gradient-bg p-0.5 hover:scale-110 transition-transform duration-300">
                <Image
                  src="/anime-girl-avatar-rabbit-chan-yuriko-cute-profile.jpg"
                  alt="Rabbit Chan"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold gradient-text">Rabbit Chan</h3>
                <p className="text-xs text-muted-foreground">@plebaotrn • Yuriko</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A modern blog platform with beautiful gradients and smooth animations. Built with{" "}
              <Heart className="inline h-3 w-3 text-red-500 fill-current" /> and passion.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-secondary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rabbit Chan (plebaotrn). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

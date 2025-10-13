import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Sparkles, Heart, Pen, BookOpen, Star } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="relative h-24 w-24 rounded-full gradient-bg p-1 hover:scale-110 transition-transform duration-300">
                <Image
                  src="/anime-girl-avatar-rabbit-chan-yuriko-cute.jpg"
                  alt="Rabbit Chan"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
                  <Star className="h-4 w-4 text-primary-foreground fill-current" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="gradient-text text-balance">Welcome to Rabbit Chan's Blog</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Hi! I'm <span className="font-semibold gradient-text">plebaotrn</span>, also known as{" "}
              <span className="font-semibold gradient-text">Yuriko</span>. Discover my stories, thoughts, and creative
              journey through design and development.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <Button
                asChild
                size="lg"
                className="gradient-bg text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300 group"
              >
                <Link href="/blog">
                  Start Reading
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover:scale-105 hover:border-primary transition-all duration-300 bg-transparent"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text mb-4">Why Choose My Blog?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the perfect blend of aesthetics and functionality
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 gradient-border">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-bg text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">
                  Beautiful Design
                </CardTitle>
                <CardDescription>Stunning gradient themes with smooth light/dark mode transitions</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 gradient-border">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-bg text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                  <Pen className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">
                  Creative Content
                </CardTitle>
                <CardDescription>Original stories and insights from my creative journey</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 gradient-border">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-bg text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">Made with Love</CardTitle>
                <CardDescription>Every post crafted with passion and attention to detail</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text mb-4">Featured Content</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore my latest creative works and projects
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/creative-design-workspace-colorful-gradient.jpg"
                  alt="Design Work"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 gradient-bg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold gradient-text">Design</span>
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">
                  Creative Design Projects
                </CardTitle>
                <CardDescription>Exploring the intersection of art and technology</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src="/coding-development-programming-colorful.jpg"
                  alt="Development Work"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 gradient-bg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold gradient-text">Development</span>
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">
                  Web Development Journey
                </CardTitle>
                <CardDescription>Building beautiful and functional web experiences</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Card className="gradient-bg text-primary-foreground overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 group-hover:to-black/30 transition-all duration-500" />
            <CardContent className="relative p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Join our community of writers and readers today
              </p>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="hover:scale-105 hover:shadow-lg transition-all duration-300 group/btn"
              >
                <Link href="/blog">
                  Explore Blog Posts
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

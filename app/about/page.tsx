import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Rocket, Users, Sparkles, Star, Coffee } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="relative">
                <div className="h-32 w-32 rounded-full gradient-bg p-1 hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/anime-girl-avatar-rabbit-chan-yuriko-cute-profile.jpg"
                    alt="Rabbit Chan - Yuriko"
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full gradient-bg flex items-center justify-center animate-bounce">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="gradient-text text-balance">About Rabbit Chan</span>
            </h1>
            <div className="flex flex-col items-center gap-2 mb-6">
              <p className="text-xl font-semibold gradient-text">plebaotrn • Yuriko</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Coffee className="h-4 w-4" />
                <span>Designer & Developer</span>
              </div>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              I'm building the future of blogging with beautiful design, smooth animations, and an exceptional user
              experience. Welcome to my creative space!
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">My Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                I believe that content deserves to be presented beautifully. My mission is to create a platform where I
                can share my stories and you can enjoy them in a visually stunning environment.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I combine modern design principles with cutting-edge technology to deliver an experience that's both
                aesthetically pleasing and highly functional.
              </p>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right duration-1000">
              <div className="aspect-square rounded-2xl overflow-hidden relative group">
                <Image
                  src="/creative-workspace-desk-setup-colorful-aesthetic.jpg"
                  alt="Creative Workspace"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 gradient-bg opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 bg-background/80 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary-foreground fill-current" />
                    </div>
                    <div>
                      <div className="font-bold gradient-text">100+ Projects</div>
                      <div className="text-sm text-muted-foreground">Created with passion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full gradient-bg text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                  <Palette className="h-8 w-8" />
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">Design First</CardTitle>
                <CardDescription>Beautiful aesthetics in every pixel</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full gradient-bg text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                  <Code className="h-8 w-8" />
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">Clean Code</CardTitle>
                <CardDescription>Built with modern best practices</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full gradient-bg text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">User Focused</CardTitle>
                <CardDescription>Designed for the best experience</CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full gradient-bg text-primary-foreground group-hover:rotate-12 transition-transform duration-300">
                  <Rocket className="h-8 w-8" />
                </div>
                <CardTitle className="group-hover:gradient-text transition-all duration-300">Innovation</CardTitle>
                <CardDescription>Always pushing boundaries</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text mb-4">Built with Passion</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              BlogSpace is crafted by a team of designers and developers who are passionate about creating exceptional
              digital experiences. We believe in the power of good design to make content more engaging and accessible.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

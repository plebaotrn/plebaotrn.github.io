import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Modern Web Design",
    description:
      "Learn the fundamentals of creating beautiful, responsive websites with modern design principles and best practices.",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Design",
    image: "/modern-web-design-colorful-gradient.jpg",
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    title: "The Power of Gradient Themes",
    description:
      "Discover how gradient color schemes can transform your user interface and create stunning visual experiences.",
    date: "March 12, 2024",
    readTime: "4 min read",
    category: "UI/UX",
    image: "/gradient-colors-abstract-design.jpg",
    likes: 38,
    comments: 12,
  },
  {
    id: 3,
    title: "Smooth Animations in Web Development",
    description:
      "Master the art of creating delightful micro-interactions and animations that enhance user engagement.",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Development",
    image: "/animation-motion-design-colorful.jpg",
    likes: 56,
    comments: 15,
  },
  {
    id: 4,
    title: "Building Responsive Layouts",
    description: "A comprehensive guide to creating layouts that work perfectly across all devices and screen sizes.",
    date: "March 8, 2024",
    readTime: "7 min read",
    category: "Development",
    image: "/responsive-design-mobile-desktop.jpg",
    likes: 45,
    comments: 10,
  },
  {
    id: 5,
    title: "Dark Mode Best Practices",
    description: "Implementing dark mode the right way with proper color contrast and accessibility considerations.",
    date: "March 5, 2024",
    readTime: "5 min read",
    category: "Design",
    image: "/dark-mode-interface-design.jpg",
    likes: 51,
    comments: 9,
  },
  {
    id: 6,
    title: "Typography in Modern Design",
    description: "Understanding how to choose and use fonts effectively to create hierarchy and improve readability.",
    date: "March 1, 2024",
    readTime: "4 min read",
    category: "Design",
    image: "/typography-fonts-design.jpg",
    likes: 33,
    comments: 6,
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <span className="gradient-text text-balance">Our Blog</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Insights, tutorials, and stories about design, development, and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group hover:scale-105 hover:shadow-xl transition-all duration-300 gradient-border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 gradient-bg opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full gradient-bg text-primary-foreground">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:gradient-text transition-all duration-300 text-balance">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative h-8 w-8 rounded-full gradient-bg p-0.5">
                      <Image
                        src="/anime-girl-avatar-rabbit-chan-yuriko.jpg"
                        alt="Rabbit Chan"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Rabbit Chan</span>
                      <span className="text-xs text-muted-foreground">@plebaotrn</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-primary transition-colors duration-300 cursor-pointer">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full group/btn hover:gradient-bg hover:text-primary-foreground transition-all duration-300"
                  >
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <Card className="gradient-bg text-primary-foreground overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20 group-hover:to-black/30 transition-all duration-500" />
            <CardContent className="relative p-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-balance">Stay Updated</h2>
              <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Subscribe to our newsletter for the latest articles and updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-background text-foreground border-2 border-transparent focus:border-secondary focus:outline-none transition-all duration-300"
                />
                <Button
                  size="lg"
                  variant="secondary"
                  className="hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

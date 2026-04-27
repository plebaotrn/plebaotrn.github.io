export interface Project {
  id: number
  title: string
  subtitle: string
  description: string
  role: string
  team: boolean
  bullets: string[]
  tags: string[]
  category: string
  githubUrl: string
  demoUrl?: string
  image: string
  status: "completed" | "in-progress" | "archived"
  period: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "CoBunny",
    subtitle: "Co-working Space Booking Platform",
    description:
      "A full-stack co-working space booking platform with complete CRUD operations and persistent cloud data storage.",
    role: "Full-stack Developer",
    team: true,
    bullets: [
      "Architected the booking flow end-to-end, from UI design to backend integration",
      "Designed responsive UI screens in Figma before implementation",
      "Integrated real-time Supabase backend for persistent cloud storage",
    ],
    tags: ["Vue 3", "Bootstrap 5", "Vite", "Supabase"],
    category: "Full Stack",
    githubUrl: "https://github.com/plebaotrn",
    image: "/creative-design-workspace-colorful-gradient.jpg",
    status: "completed",
    period: "Nov – Dec 2025",
    featured: true,
  },
  {
    id: 2,
    title: "Happier",
    subtitle: "Habit Tracker Mobile App",
    description:
      "An Android mobile application for building positive daily routines, tracking habit streaks, and visualising personal progress over time.",
    role: "Mobile Developer",
    team: false,
    bullets: [
      "Designed all UI screens with a focus on clarity and ease of daily use",
      "Implemented local SQLite database for offline-first habit tracking",
      "Applied LiveData with ViewModel for reactive, lifecycle-aware state management",
    ],
    tags: ["Kotlin", "Android Studio", "SQLite", "LiveData"],
    category: "Mobile",
    githubUrl: "https://github.com/plebaotrn",
    image: "/responsive-design-mobile-desktop.jpg",
    status: "completed",
    period: "Nov – Dec 2025",
    featured: true,
  },
  {
    id: 3,
    title: "TradePro",
    subtitle: "Blockchain Trading Platform",
    description:
      "A prototype blockchain asset trading platform with a data analytics dashboard.",
    role: "Frontend Developer",
    team: true,
    bullets: [
      "Led UI/UX design across all pages, establishing the visual language for the product",
      "Built search, filter, and sorting system for asset listings",
      "Defined the frontend component architecture for the team",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Solidity", "Hardhat"],
    category: "Web3 / Frontend",
    githubUrl: "https://github.com/plebaotrn",
    image: "/coding-development-programming-colorful.jpg",
    status: "completed",
    period: "Jan – Mar 2025",
    featured: true,
  },
  {
    id: 4,
    title: "MConnect",
    subtitle: "Professional Networking Platform",
    description:
      "A fully functional professional social networking platform with user profiles, dynamic search, and authentication.",
    role: "Frontend Developer",
    team: true,
    bullets: [
      "Designed and implemented the full UI/UX from scratch",
      "Built a dynamic search and filter system for user profiles",
      "Coded the complete login and authentication flow",
    ],
    tags: ["Vanilla JavaScript", "HTML", "CSS"],
    category: "Frontend",
    githubUrl: "https://github.com/plebaotrn",
    image: "/modern-web-design-colorful-gradient.jpg",
    status: "completed",
    period: "May – Jul 2025",
    featured: false,
  },
  {
    id: 5,
    title: "Rabbit Chan Blog",
    subtitle: "Personal Project Blog",
    description:
      "This site — a personal project blog built with Next.js 15 and Tailwind CSS to showcase projects and share devlogs.",
    role: "Full-stack Developer",
    team: false,
    bullets: [
      "Designed and built end-to-end with Next.js App Router and TypeScript",
      "Implemented dark/light mode theming with custom CSS design tokens",
      "Deployed on Vercel with static generation for fast page loads",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    category: "Full Stack",
    githubUrl: "https://github.com/plebaotrn/rabbitchan",
    demoUrl: "/",
    image: "/gradient-colors-abstract-design.jpg",
    status: "in-progress",
    period: "2024 – Present",
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

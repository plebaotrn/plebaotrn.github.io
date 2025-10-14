# Blog Website

A modern, responsive blog website featuring a stunning blue-pink gradient theme with light/dark mode support and smooth animations throughout.

## Author

**plebaotrn** (Rabbit Chan / Yuriko)

A creative developer passionate about beautiful web experiences and modern design.

## Features

### Design & Theme
- Beautiful blue-pink gradient theme that works seamlessly in both light and dark modes
- Smooth theme transitions with persistent user preferences
- Fully responsive design optimized for mobile and desktop
- Custom logo and branding throughout

### Pages
- **Home**: Hero section with featured content and latest blog posts
- **About**: Personal introduction and background information
- **Blog**: Collection of blog posts with thumbnails and metadata

### Animations & Interactions
- Smooth hover effects on all interactive elements
- Click animations with scale and color transitions
- Gradient button effects with animated backgrounds
- Card hover animations with subtle lift and shadow effects
- Smooth page transitions and scroll animations

### Technical Features
- Built with Next.js 15 and React 19
- TypeScript for type safety
- Tailwind CSS v4 for styling
- Server-side rendering for optimal performance
- SEO-friendly structure

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or download the project files

2. Install dependencies using the shadcn CLI:
\`\`\`bash
npx shadcn@latest init
\`\`\`

Or create a new project:
\`\`\`bash
npx create-next-app@latest my-blog --example "https://github.com/yourusername/blog"
\`\`\`

3. Install required dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Running the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

\`\`\`bash
npm run build
npm start
# or
yarn build
yarn start
\`\`\`

## Customization

### Changing Colors

Edit the design tokens in `app/globals.css`:

\`\`\`css
@theme inline {
  --color-primary: /* your primary color */;
  --color-secondary: /* your secondary color */;
  /* ... other tokens */
}
\`\`\`

### Adding Blog Posts

Edit the `blogPosts` array in `app/blog/page.tsx` to add or modify blog posts.

### Modifying Content

- **Home page**: Edit `app/page.tsx`
- **About page**: Edit `app/about/page.tsx`
- **Blog page**: Edit `app/blog/page.tsx`
- **Header/Navigation**: Edit `components/header.tsx`
- **Footer**: Edit `components/footer.tsx`

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy your blog is using Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

Or use the Vercel CLI:

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Digital Ocean App Platform

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contact

Created by **plebaotrn** (Rabbit Chan / Yuriko)

- GitHub: [@plebaotrn](https://github.com/plebaotrn)


---

Built with ❤️ using Next.js and Tailwind CSS

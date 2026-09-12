# ROAMI

A cinematic travel experience website showcasing Mostar, Bosnia and Herzegovina through immersive storytelling and scroll-driven animations.

## 🌟 Overview

ROAMI is a Next.js-powered web application that brings the historic city of Mostar to life through:
- **Cinematic scroll experiences** with GSAP-powered animations
- **Interactive place highlights** including the Old Bridge (Stari Most), Neretva River, and UNESCO Old City
- **Immersive storytelling** with parallax effects and ambient video backgrounds
- **Trip planning features** to help visitors explore Mostar

## 🚀 Features

- **Cinematic Home Page**: Multi-layered parallax scroll experience with ambient videos
- **Place Details**: Dynamic pages for each landmark with different hero styles (boomerang, fade, glass)
- **Interactive Elements**: 
  - Places carousel with smooth navigation
  - Testimonials section
  - Trip planning interface
  - Contact form
- **Responsive Design**: Fully optimized for all device sizes
- **Performance Optimized**: Video posters, lazy loading, and optimized assets

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.3.5](https://nextjs.org/) (React 19.2.8)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: 
  - [Framer Motion 13.2.0](https://www.framer.com/motion/)
  - [GSAP 3.15.0](https://greensock.com/gsap/)
- **UI Components**: 
  - Custom components with shadcn/ui patterns
  - Radix UI primitives
- **Package Manager**: [Bun 1.3.14](https://bun.sh/)
- **Language**: TypeScript 5
- **Testing**: Bun test with happy-dom

## 📁 Project Structure

```
ROAMI/
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Home page with cinematic experience
│   ├── places/[slug]/       # Dynamic place detail pages
│   ├── plan/                # Trip planning page
│   └── styles/              # Page-specific CSS modules
├── components/
│   ├── animations/          # Scroll-driven animation controllers
│   ├── layout/              # Site header and footer
│   ├── sections/            # Page sections (home, places, plan)
│   └── ui/                  # Reusable UI components
├── data/                    # Static data and content
│   ├── highlights.ts        # Place information and hero configurations
│   ├── navigation.ts        # Site navigation structure
│   ├── scene.ts            # Cinematic scene assets
│   ├── sights.ts           # Slider content
│   └── testimonials.ts     # User testimonials
├── hooks/                   # Custom React hooks
│   ├── use-cinema-scroll.ts
│   └── use-hero-scroll-exit.ts
├── lib/                     # Utility functions
│   ├── cinema-math.ts      # Scroll animation calculations
│   ├── sight-slider.ts     # Slider logic
│   └── utils.ts            # General utilities (cn, etc.)
├── public/
│   ├── fonts/              # Custom fonts (Ogg Text)
│   └── videos/             # Video assets and posters
└── types/                  # TypeScript type definitions
```

## 🏃 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.3.14 or higher
- Node.js 20+ (for compatibility)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ROAMI
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run typecheck    # Type check without emitting files
bun run test         # Run tests with Bun
```

## 🎨 Key Components

### Cinematic Home Experience
The home page features a scroll-driven cinematic experience with:
- Layered parallax backgrounds
- Interactive sight slider
- Story panels that reveal on scroll
- Dynamic scene composition

### Place Hero Variants
Three distinct hero styles for place pages:
- **Boomerang**: Video that plays forward then reverse on scroll
- **Fade**: Elegant fade-in with split headlines
- **Glass**: Glassmorphic design with email capture

### Animation System
- Custom GSAP ScrollTrigger implementations
- Framer Motion for UI transitions
- Performance-optimized video playback
- Scroll-exit effects for hero sections

## 🌐 Deployment

The project is configured for deployment on Vercel (see `vercel.json`):

```bash
bun run build
# Deploy to Vercel or your preferred hosting platform
```

## 📝 Content Management

Place content is managed through structured TypeScript data in `/data/highlights.ts`:

```typescript
export interface Highlight {
  slug: string;
  name: string;
  tagline: string;
  body: string[];
  facts: HighlightFact[];
  hero: BoomerangHeroContent | FadeHeroContent | GlassHeroContent;
}
```

To add new places:
1. Add entry to `highlights` array in `/data/highlights.ts`
2. Add video assets to `/public/videos/`
3. Dynamic routes automatically generate pages

## 🎯 Performance Considerations

- Video assets use CloudFront CDN
- Poster images for video preload
- Lazy loading for non-critical assets
- Optimized font loading with `font-display: swap`
- Turbopack enabled for faster builds

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Historic content and imagery of Mostar, Bosnia and Herzegovina
- UNESCO World Heritage Site designation for Old Bridge Area
- Local stories and testimonials from travelers

---

**Built with ❤️ for travelers exploring Mostar**

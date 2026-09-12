# ROAMI Architecture Documentation

> **Deep dive into the technical architecture, design patterns, and system architecture of ROAMI.**

## Table of Contents
- [System Overview](#system-overview)
- [Architecture Patterns](#architecture-patterns)
- [Frontend Architecture](#frontend-architecture)
- [Animation Engine](#animation-engine)
- [State Management](#state-management)
- [Rendering Strategy](#rendering-strategy)
- [Performance Architecture](#performance-architecture)
- [Data Architecture](#data-architecture)
- [API Integration](#api-integration)
- [Security Architecture](#security-architecture)

---

## System Overview

ROAMI is built as a **Jamstack application** using **Next.js 16** with **React 19** and **TypeScript 5**, employing a **hybrid rendering strategy** combining Server-Side Rendering (SSR), Static Site Generation (SSG), and Client-Side Rendering (CSR).

### High-Level System Diagram

```
┌────────────────────────────────────────────────────────────────────┐
│                          USER BROWSER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  DOM Layer   │←→│ React Runtime│←→│ GSAP Animation Engine    │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
                              ↕
┌────────────────────────────────────────────────────────────────────┐
│                        NEXT.JS SERVER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ App Router   │→ │ RSC Renderer │→ │ HTML + Hydration Script  │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
                              ↕
┌────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL SERVICES                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │  GROQ API    │  │  CloudFront  │  │  Vercel Edge Network     │ │
│  │  (AI Models) │  │  (CDN/Video) │  │  (Deployment)            │ │
│  └──────────────┘  └──────────────┘  └──────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## Architecture Patterns

### 1. Component-Based Architecture

ROAMI follows **Atomic Design principles** with a hierarchical component structure:

```
Atoms (UI Components)
    ↓
Molecules (Composed UI)
    ↓
Organisms (Sections)
    ↓
Templates (Pages)
    ↓
Pages (Routes)
```

**Example:**
```
Button (Atom)
    ↓
Input + Button = SearchBox (Molecule)
    ↓
SearchBox + Navigation = Header (Organism)
    ↓
Header + Content + Footer = PageTemplate (Template)
    ↓
Home Page (Page)
```

### 2. Separation of Concerns

```
┌─────────────────────────────────────────────┐
│           Presentation Layer                 │
│   (React Components, JSX, Styling)          │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│          Business Logic Layer                │
│   (Custom Hooks, Utility Functions)         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│            Data Layer                        │
│   (Static Data, API Calls, Type Defs)       │
└─────────────────────────────────────────────┘
```

### 3. Server/Client Boundary

```typescript
// Server Component (Default in App Router)
// app/page.tsx
import { highlights } from "@/data/highlights";

export default function HomePage() {
  // Runs on server, no hydration needed
  return <PlacesCarousel places={highlights} />;
}

// Client Component (Explicit "use client")
// components/sections/home/places-carousel.tsx
"use client";
import { useState } from "react";

export function PlacesCarousel({ places }) {
  const [active, setActive] = useState(0);
  // Runs on client, requires hydration
  return <InteractiveCarousel />;
}
```

---

## Frontend Architecture

### Component Hierarchy

```
app/page.tsx (Server Component)
    │
    ├─ CinematicHome (Client Component)
    │    ├─ SiteHeader (Client Component)
    │    ├─ SceneImage (Server Component)
    │    ├─ SightsSlider (Client Component)
    │    ├─ StoryPanels (Client Component)
    │    └─ CinemaController (Client Component)
    │         └─ useCinemaScroll (Custom Hook)
    │              ├─ GSAP ScrollTrigger
    │              ├─ RAF (RequestAnimationFrame)
    │              └─ CSS Custom Properties
    │
    ├─ PlacesCarousel (Client Component)
    │    └─ AppleCardsCarousel (UI Component)
    │
    ├─ ShowcaseGrid (Server Component)
    │    └─ LayoutGrid (UI Component)
    │
    ├─ TestimonialsSection (Server Component)
    │    └─ AnimatedTestimonials (Client Component)
    │
    ├─ GetInTouch (Server Component)
    │
    └─ SiteFooter (Server Component)
```

### File Organization Strategy

```
components/
├── animations/        # Animation orchestrators (client-side)
│   └── Purpose: Manage GSAP timelines, RAF loops
├── layout/           # Structural components (server/client hybrid)
│   └── Purpose: Headers, footers, navigation
├── sections/         # Page-specific sections (server/client hybrid)
│   └── Purpose: Cohesive page segments
└── ui/               # Reusable UI primitives (mostly client)
    └── Purpose: Buttons, inputs, cards, etc.
```

---

## Animation Engine

### GSAP ScrollTrigger Architecture

```
User Scrolls
    ↓
Scroll Event (Passive Listener)
    ↓
RequestAnimationFrame (RAF)
    ↓
Calculate Scroll Progress (0 to 1)
    ↓
Interpolate Values (lerp)
    ↓
Update CSS Custom Properties
    ↓
Browser Paint (GPU Accelerated)
```

### Custom Scroll Hook Implementation

```typescript
// hooks/use-cinema-scroll.ts

export function useCinemaScroll() {
  useEffect(() => {
    // 1. Get DOM references
    const section = document.querySelector('.cinema-scroll');
    
    // 2. Initialize state
    let targetScroll = 0;
    let smoothScroll = 0;
    let rafPending = false;
    
    // 3. Calculate scroll distance
    const getScrollDistance = () => {
      return clamp(
        -section.getBoundingClientRect().top,
        0,
        section.offsetHeight - window.innerHeight
      );
    };
    
    // 4. Update loop (RAF)
    function update() {
      rafPending = false;
      targetScroll = getScrollDistance();
      
      // Smooth interpolation
      smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
      
      // Calculate frame
      const frame = getCinemaFrame(smoothScroll, vh, mouseX, mouseY);
      
      // Apply CSS properties
      for (const [key, value] of Object.entries(frame.variables)) {
        root.style.setProperty(key, String(value));
      }
      
      // Continue loop if needed
      if (Math.abs(smoothScroll - targetScroll) > 0.08) {
        requestTick();
      }
    }
    
    // 5. Request next frame
    function requestTick() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(update);
    }
    
    // 6. Bind events
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // 7. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      // Restore CSS properties
    };
  }, []);
}
```

### Animation Frame Calculation

```typescript
// lib/cinema-math.ts

interface CinemaFrame {
  // Sky layer (slowest)
  skyY: number;
  skyOpacity: number;
  
  // Bridge layer
  bridgeScale: number;
  bridgeY: number;
  
  // Parallax multipliers
  parallaxX: number;
  parallaxY: number;
  
  // Panel states
  panel2Opacity: number;
  panel3Opacity: number;
  
  // All CSS custom properties
  variables: Record<string, string | number>;
}

export function getCinemaFrame(
  scroll: number,
  vh: number,
  mouseX: number,
  mouseY: number
): CinemaFrame {
  // Normalize scroll (0 to 1 across section)
  const progress = scroll / (vh * 5); // 5vh tall section
  
  // Calculate each layer's position
  const skyY = easeOut(progress) * -50; // Moves slower
  const bridgeY = easeInOut(progress) * -100; // Moves faster
  
  // Mouse parallax (subtle 3D effect)
  const parallaxX = mouseX * 20; // -10 to +10
  const parallaxY = mouseY * 10; // -5 to +5
  
  // Return all variables
  return {
    skyY,
    bridgeY,
    parallaxX,
    parallaxY,
    variables: {
      '--sky-y': `${skyY}px`,
      '--bridge-y': `${bridgeY}px`,
      '--parallax-x': `${parallaxX}px`,
      '--parallax-y': `${parallaxY}px`,
      // ... more properties
    },
  };
}
```

---

## State Management

### State Architecture

ROAMI uses **React's built-in state management** without external libraries:

```
┌─────────────────────────────────────────────┐
│         Component Local State                │
│    (useState, useReducer)                   │
│    ├─ UI state (open/closed, active index) │
│    └─ Form state (inputs, validation)      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Custom Hooks (Shared Logic)          │
│    (useCinemaScroll, useHeroScrollExit)     │
│    ├─ Animation state                       │
│    └─ Scroll position                       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│         Browser APIs (Global State)          │
│    (URL, LocalStorage, SessionStorage)      │
│    ├─ Navigation state (router)            │
│    └─ Preferences (theme, motion)          │
└─────────────────────────────────────────────┘
```

### State Flow Example: Carousel

```typescript
// Parent passes initial data
<PlacesCarousel places={highlights} />

// Child manages internal state
function PlacesCarousel({ places }) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % places.length);
  };
  
  return (
    <AppleCardsCarousel
      items={places}
      active={activeIndex}
      onNext={handleNext}
    />
  );
}
```

---

## Rendering Strategy

### Hybrid Rendering Model

```
┌─────────────────────────────────────────────────────────────┐
│                  REQUEST LIFECYCLE                           │
└─────────────────────────────────────────────────────────────┘

1. User requests /places/old-bridge
        ↓
2. Next.js Server receives request
        ↓
3. App Router matches route: app/places/[slug]/page.tsx
        ↓
4. Server Component executes (RSC)
   - Fetches data from /data/highlights.ts
   - Renders React tree to RSC payload
        ↓
5. Next.js generates HTML
   - Includes inlined CSS (Tailwind)
   - Includes hydration instructions
        ↓
6. Response sent to browser
   - Status: 200 OK
   - Content-Type: text/html
        ↓
7. Browser receives HTML
   - Parses and displays (FCP - First Contentful Paint)
        ↓
8. JavaScript bundle loads
   - React runtime
   - Client component code
        ↓
9. React hydrates
   - Attaches event listeners
   - Initializes client state
        ↓
10. Client components activate
    - GSAP ScrollTrigger binds
    - Video players initialize
    - Interactive elements work
        ↓
11. Application fully interactive (TTI - Time to Interactive)
```

### Component Rendering Strategy

| Component | Rendering | Why |
|-----------|-----------|-----|
| `app/page.tsx` | Server (RSC) | Static content, SEO |
| `SiteHeader` | Client | Navigation, interactivity |
| `CinematicHome` | Client | Scroll animations (GSAP) |
| `ShowcaseGrid` | Server | Static grid, no interaction |
| `PlacesCarousel` | Client | User interaction (drag, click) |
| `SiteFooter` | Server | Static content, SEO |

---

## Performance Architecture

### Performance Budget

```
Target Metrics:
├─ LCP (Largest Contentful Paint): < 2.5s
├─ FID (First Input Delay): < 100ms
├─ CLS (Cumulative Layout Shift): < 0.1
├─ TTFB (Time to First Byte): < 600ms
└─ TTI (Time to Interactive): < 3.5s
```

### Optimization Strategies

#### 1. Code Splitting

```typescript
// Automatic code splitting per route
app/
├─ page.tsx           → home.js
├─ places/[slug]/     → places-[slug].js
└─ plan/              → plan.js

// Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('./chart'), {
  loading: () => <Skeleton />,
  ssr: false, // Don't render on server
});
```

#### 2. Asset Optimization

```
Videos:
├─ Hosted on CloudFront CDN
├─ Poster images for instant visual
├─ Lazy loading for below-fold
└─ Preload for above-fold

Fonts:
├─ WOFF2 format (best compression)
├─ font-display: swap (prevent FOIT)
├─ Preload critical fonts
└─ Subset to used characters

Images:
├─ Next.js Image component
├─ Automatic format selection (WebP, AVIF)
├─ Responsive sizing
└─ Lazy loading by default
```

#### 3. Rendering Performance

```
CSS Custom Properties:
✅ GPU-accelerated (transform, opacity)
✅ No layout recalculation
✅ Smooth 60fps animations

RequestAnimationFrame:
✅ Synchronized with browser paint
✅ No forced synchronous layouts
✅ Efficient batch updates
```

---

## Data Architecture

### Static Data Structure

```typescript
// data/highlights.ts

export interface Highlight {
  slug: string;              // URL identifier
  name: string;              // Display name
  tagline: string;           // Short description
  body: string[];            // Content paragraphs
  facts: HighlightFact[];    // Key-value facts
  hero: HeroContent;         // Hero configuration
}

// Type-safe hero variants
export type HeroContent =
  | BoomerangHeroContent
  | FadeHeroContent
  | GlassHeroContent;

// Export as const for type inference
export const highlights: Highlight[] = [
  { /* ... */ }
] as const;
```

### Data Flow

```
Static Data (TS files)
    ↓
Type-safe exports
    ↓
Imported by Server Components
    ↓
Props passed to Client Components
    ↓
Rendered to DOM
```

---

## API Integration

### GROQ API Architecture

```
User submits trip plan
    ↓
Client-side form validation
    ↓
POST request to Next.js API route
    ↓
/app/api/plan/route.ts
    ├─ Validate input
    ├─ Construct AI prompt
    └─ Call GROQ API
        ↓
GROQ API (External)
    ├─ Process with LLM
    └─ Return itinerary
        ↓
API route formats response
    ↓
Send to client
    ↓
Display in UI
```

### API Route Example

```typescript
// app/api/plan/route.ts

export async function POST(request: Request) {
  try {
    // 1. Parse request
    const { destination, days, interests } = await request.json();
    
    // 2. Validate input
    if (!destination || days < 1) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }
    
    // 3. Call GROQ API
    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{
          role: 'user',
          content: `Create a ${days}-day itinerary for ${destination} focused on ${interests}`,
        }],
      }),
    });
    
    // 4. Parse response
    const data = await response.json();
    const itinerary = data.choices[0].message.content;
    
    // 5. Return formatted result
    return Response.json({ itinerary });
  } catch (error) {
    return Response.json({ error: 'Failed to generate plan' }, { status: 500 });
  }
}
```

---

## Security Architecture

### Security Layers

```
┌────────────────────────────────────────────┐
│         1. Environment Variables            │
│   ├─ Server-side only (not exposed)       │
│   ├─ GROQ_API_KEY                          │
│   └─ OPENROUTER_API_KEY                    │
└────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────┐
│         2. API Routes (Middleware)          │
│   ├─ Input validation                      │
│   ├─ Rate limiting                         │
│   └─ CORS headers                          │
└────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────┐
│         3. Client-Side Validation           │
│   ├─ Form validation                       │
│   ├─ XSS prevention (React escaping)      │
│   └─ CSRF token (Next.js built-in)        │
└────────────────────────────────────────────┘
```

### Best Practices

- ✅ API keys in environment variables (never hardcoded)
- ✅ Server-side API calls (API keys never sent to client)
- ✅ Input validation (server + client)
- ✅ HTTPS only (enforced by Vercel)
- ✅ Content Security Policy (CSP headers)
- ✅ No sensitive data in client bundle

---

## Deployment Architecture

### Vercel Edge Network

```
User Request
    ↓
Vercel Edge (Nearest Location)
    ├─ Cache Check (Static Assets)
    │   ├─ Hit: Return from Edge Cache
    │   └─ Miss: Continue
    ↓
Vercel Serverless Function (Dynamic)
    ├─ Execute Server Component
    ├─ Fetch Data
    └─ Generate HTML
    ↓
Response
    ├─ Cache if possible
    └─ Return to user
```

### Build Process

```bash
# Local build
bun run build

# Next.js build steps:
1. Compile TypeScript → JavaScript
2. Bundle client components
3. Generate static pages
4. Optimize images
5. Create .next directory

# Vercel deployment:
1. Push to Git
2. Webhook triggers build
3. Vercel runs: bun install && bun run build
4. Deploy to Edge Network
5. Assign domain
```

---

## Conclusion

ROAMI's architecture is designed for:
- **Performance**: Fast loading, smooth animations
- **Scalability**: Easy to add new places and features
- **Maintainability**: Clear separation of concerns
- **Developer Experience**: Type-safe, modern tooling

For questions or contributions, see [CONTRIBUTING.md](./CONTRIBUTING.md).

# ROAMI 🌍

> A cinematic travel experience website showcasing Mostar, Bosnia and Herzegovina through immersive storytelling and scroll-driven animations.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.3.14-f472b6)](https://bun.sh/)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#️-tech-stack)
- [System Layers](#-system-layers)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Configuration](#-environment-configuration)
- [Development Workflow](#-development-workflow)
- [Key Components](#-key-components)
- [Animation System](#-animation-system)
- [Data Flow](#-data-flow)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [Contributing](#-contributing)

## 🌟 Overview

ROAMI is a Next.js-powered web application that brings the historic city of Mostar to life through:
- **Cinematic scroll experiences** with GSAP-powered animations
- **Interactive place highlights** including the Old Bridge (Stari Most), Neretva River, and UNESCO Old City
- **Immersive storytelling** with parallax effects and ambient video backgrounds
- **AI-powered trip planning** features to help visitors explore Mostar

## 🚀 Features

### 🎬 Cinematic Experiences
- **Multi-layered Parallax Scrolling**: Advanced scroll-driven animations with GSAP ScrollTrigger
- **Ambient Video Backgrounds**: CloudFront-hosted videos with optimized loading
- **Mouse Parallax Effects**: Subtle 3D depth with mouse movement tracking
- **Arrival Sequence**: Scroll-driven plane descent, airport resolution, and door opening animation

### 🏛️ Place Showcase
- **Dynamic Place Pages**: Three hero variants (Boomerang, Fade, Glass)
- **Interactive Carousels**: Apple-style card carousel with smooth transitions
- **UNESCO Heritage Content**: Detailed information about historical landmarks

### 🗺️ Trip Planning
- **AI-Powered Route Planning**: Integration with GROQ API for intelligent itinerary generation
- **Interactive Composer**: Build custom trips with visual feedback
- **Email Route Delivery**: Send planned routes directly to users

### 🎨 UI/UX
- **Responsive Design**: Mobile-first, fully adaptive layouts
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **Glass Morphism**: Modern glassmorphic UI components
- **Animated Testimonials**: Smooth testimonial carousel with auto-play

## 🏗️ Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Browser   │  │  Next.js SSR │  │  React Hydration │  │
│  │   Render    │→ │   (Server)   │→ │    (Client)      │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Components │  │   Sections   │  │    Animations    │  │
│  │  (UI/Layout)│  │(Home/Places) │  │  (GSAP/Framer)   │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Hooks     │  │     Lib      │  │      Types       │  │
│  │ (Business   │  │  (Utilities) │  │  (TypeScript)    │  │
│  │   Logic)    │  │              │  │                  │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Static     │  │   External   │  │      CDN         │  │
│  │   Data      │  │     APIs     │  │   (CloudFront)   │  │
│  │ (highlights)│  │   (GROQ AI)  │  │    (Videos)      │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow Diagram

```
User Request → Next.js Router → App Router (page.tsx)
                                      ↓
                                Server Component (RSC)
                                      ↓
                          Fetch Data (Static/API)
                                      ↓
                              Render HTML + CSS
                                      ↓
                          Send to Client Browser
                                      ↓
                              Hydrate React
                                      ↓
                          Client Components Active
                                      ↓
                    GSAP Animations + Event Listeners
                                      ↓
                          Interactive Experience
```

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 16.3.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.8](https://reactjs.org/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component patterns
- **[class-variance-authority](https://cva.style/)** - Component variant management

### Animation Libraries
- **[GSAP 3.15.0](https://greensock.com/gsap/)** - Professional-grade scroll animations
- **[Framer Motion 13.2.0](https://www.framer.com/motion/)** - React animation library

### Development Tools
- **[Bun 1.3.14](https://bun.sh/)** - Fast JavaScript runtime & package manager
- **[ESLint 9](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

### External Services
- **[GROQ API](https://console.groq.com/)** - AI-powered trip planning
- **[OpenRouter API](https://openrouter.ai/)** - Alternative AI model routing
- **[CloudFront CDN](https://aws.amazon.com/cloudfront/)** - Video asset delivery

### Testing
- **[Bun Test](https://bun.sh/docs/cli/test)** - Built-in test runner
- **[happy-dom](https://github.com/capricorn86/happy-dom)** - DOM environment for testing

## 🔄 System Layers

### 1️⃣ **Presentation Layer** (UI Components)
```
components/
├── ui/                          # Atomic UI components
│   ├── button.tsx              # Reusable button with variants
│   ├── input.tsx               # Form input components
│   ├── gooey-input.tsx         # Animated input with gooey effect
│   ├── animated-testimonials.tsx  # Auto-playing testimonial slider
│   ├── apple-cards-carousel.tsx   # Apple-style card carousel
│   ├── layout-grid.tsx         # Responsive grid layout
│   └── moving-border.tsx       # Animated border effect
├── layout/                      # Layout components
│   ├── site-header.tsx         # Navigation header
│   └── site-footer.tsx         # Site footer
└── sections/                    # Page-specific sections
    ├── home/                    # Home page sections
    ├── places/                  # Place detail sections
    └── plan/                    # Trip planning sections
```

**Responsibilities:**
- Render UI elements
- Handle user interactions
- Display data from parent components
- Implement accessibility features (ARIA, keyboard nav)

### 2️⃣ **Animation Layer** (Motion & Scroll Control)
```
components/animations/
├── cinema-controller.tsx       # GSAP scroll orchestrator
├── ambient-video.tsx          # Background video player
└── scroll-exit-stage.tsx      # Hero exit animations

hooks/
├── use-cinema-scroll.ts       # Custom scroll animation hook
└── use-hero-scroll-exit.ts    # Hero section exit hook

lib/
├── cinema-math.ts             # Scroll math calculations
└── sight-slider.ts            # Carousel logic
```

**Responsibilities:**
- Orchestrate GSAP ScrollTrigger timelines
- Calculate scroll progress and interpolation
- Manage CSS custom properties for animations
- Handle reduced motion preferences
- Coordinate parallax effects

### 3️⃣ **Application Layer** (Business Logic)
```
app/
├── page.tsx                    # Home page (Server Component)
├── layout.tsx                  # Root layout & metadata
├── places/[slug]/page.tsx     # Dynamic place routes
└── plan/page.tsx              # Trip planning page

data/
├── highlights.ts               # Place content & configurations
├── navigation.ts               # Site navigation structure
├── scene.ts                   # Cinematic scene assets
├── sights.ts                  # Carousel content
├── testimonials.ts            # User testimonials
└── route-journey.ts           # Journey animation assets
```

**Responsibilities:**
- Route handling (Next.js App Router)
- Server-side rendering (RSC)
- Data fetching and caching
- SEO metadata generation
- Static data management

### 4️⃣ **Integration Layer** (External Services)
```
API Integrations:
├── GROQ API                    # AI trip planning
├── OpenRouter API              # Alternative AI routing
└── CloudFront CDN             # Video asset delivery

Environment Variables:
├── GROQ_API_KEY               # GROQ authentication
└── OPENROUTER_API_KEY         # OpenRouter authentication
```

**Responsibilities:**
- AI model communication
- CDN asset fetching
- API authentication
- Error handling & retries

### 5️⃣ **Infrastructure Layer** (Build & Deploy)
```
Configuration Files:
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript settings
├── tailwind.config.js         # Tailwind CSS config
├── postcss.config.mjs         # PostCSS plugins
├── vercel.json                # Deployment config
├── eslint.config.mjs          # Linting rules
└── package.json               # Dependencies & scripts
```

**Responsibilities:**
- Build optimization (Turbopack)
- Type checking
- Code linting
- Deployment configuration
- Dependency management

## 📁 Project Structure

```
ROAMI/
├── .git/                       # Git version control
├── .next/                      # Next.js build output
├── .env                        # Environment variables (DO NOT COMMIT)
├── .gitignore                  # Git ignore patterns
│
├── app/                        # Next.js App Router (Routes)
│   ├── layout.tsx             # Root layout with metadata
│   ├── page.tsx               # Home page (/)
│   ├── globals.css            # Global styles & CSS variables
│   ├── places/                # Place routes
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic place pages (/places/old-bridge)
│   ├── plan/
│   │   └── page.tsx           # Trip planning (/plan)
│   └── styles/                # Page-specific CSS
│       ├── cinema.css         # Cinematic scroll styles
│       ├── home-sections.css  # Home section styles
│       ├── places.css         # Place page styles
│       ├── plan.css           # Planning page styles
│       └── scroll-exit.css    # Exit animation styles
│
├── components/                 # React Components
│   ├── animations/            # Animation controllers
│   │   ├── ambient-video.tsx  # Video background handler
│   │   ├── cinema-controller.tsx  # GSAP orchestrator
│   │   └── scroll-exit-stage.tsx  # Exit animations
│   ├── layout/                # Layout components
│   │   ├── site-header.tsx    # Navigation header
│   │   └── site-footer.tsx    # Footer with links
│   ├── sections/              # Page sections
│   │   ├── home/              # Home page sections
│   │   │   ├── cinematic-home.tsx      # Main scroll experience
│   │   │   ├── get-in-touch.tsx        # Contact section
│   │   │   ├── old-town-notes.tsx      # Notes section
│   │   │   ├── places-carousel.tsx     # Places showcase
│   │   │   ├── scene-image.tsx         # Optimized images
│   │   │   ├── showcase-grid.tsx       # Feature grid
│   │   │   ├── sights-slider.tsx       # Interactive slider
│   │   │   ├── story-panels.tsx        # Scroll-triggered panels
│   │   │   └── testimonials-section.tsx # User testimonials
│   │   ├── places/            # Place page sections
│   │   │   ├── boomerang-hero.tsx      # Boomerang video hero
│   │   │   ├── email-route-form.tsx    # Route email form
│   │   │   ├── fade-hero.tsx           # Fade-in hero
│   │   │   ├── glass-hero.tsx          # Glassmorphic hero
│   │   │   └── place-hero.tsx          # Universal hero wrapper
│   │   └── plan/              # Planning page sections
│   │       ├── plan-composer.tsx       # Trip builder
│   │       └── plan-hero.tsx           # Planning hero
│   └── ui/                    # Reusable UI components
│       ├── animated-testimonials.tsx   # Testimonial carousel
│       ├── apple-cards-carousel.tsx    # Card carousel
│       ├── button.tsx                  # Button component
│       ├── gooey-input.tsx             # Animated input
│       ├── input.tsx                   # Standard input
│       ├── label.tsx                   # Form label
│       ├── layout-grid.tsx             # Grid component
│       └── moving-border.tsx           # Animated border
│
├── data/                       # Static Data (TypeScript)
│   ├── highlights.ts          # Place information & hero configs
│   ├── navigation.ts          # Navigation menu structure
│   ├── scene.ts              # Cinematic scene assets
│   ├── sights.ts             # Slider content
│   └── testimonials.ts       # User testimonial data
│
├── hooks/                      # Custom React Hooks
│   ├── use-cinema-scroll.ts   # GSAP scroll orchestration
│   └── use-hero-scroll-exit.ts # Hero exit animations
│
├── lib/                        # Utility Functions
│   ├── cinema-math.ts         # Scroll interpolation & calculations
│   ├── sight-slider.ts        # Carousel positioning logic
│   └── utils.ts               # General utilities (cn, clsx)
│
├── public/                     # Static Assets
│   ├── fonts/                 # Web fonts
│   │   └── OggText-Medium.woff2
│   └── videos/                # Video files & posters
│       ├── old-bridge-boomerang.mp4
│       ├── old-bridge-poster.jpg
│       └── neretva-river-poster.jpg
│
├── scripts/                    # Build & utility scripts
├── tests/                      # Test files
├── types/                      # TypeScript type definitions
│
├── node_modules/               # Dependencies (auto-generated)
├── bun.lock                   # Bun lockfile
├── package.json               # Project dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── next.config.ts             # Next.js configuration
├── postcss.config.mjs         # PostCSS configuration
├── eslint.config.mjs          # ESLint rules
├── vercel.json                # Vercel deployment config
├── components.json            # shadcn/ui configuration
└── README.md                  # This file
```

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Bun](https://bun.sh/) 1.3.14+** (Recommended) or **Node.js 20+**
- **Git** for version control
- A code editor (VS Code recommended)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Install Bun

**On Windows (PowerShell):**
```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

**On macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Verify installation:**
```bash
bun --version
# Expected output: 1.3.14 or higher
```

### Step 2: Clone the Repository

```bash
# Clone via HTTPS
git clone https://github.com/your-username/ROAMI.git

# OR clone via SSH
git clone git@github.com:your-username/ROAMI.git

# Navigate to project directory
cd ROAMI
```

### Step 3: Install Dependencies

```bash
# Install all dependencies with Bun (fast!)
bun install

# This will install:
# - Next.js & React
# - Tailwind CSS
# - GSAP & Framer Motion
# - All other dependencies listed in package.json
```

**Expected output:**
```
bun install v1.3.14
 + 1,234 packages installed [2.5s]
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Copy the example (if exists) or create new
cp .env.example .env

# OR create manually
touch .env
```

Add your API keys (see [Environment Configuration](#-environment-configuration)):

```env
# AI Trip Planning (Required for /plan page)
GROQ_API_KEY=your_groq_api_key_here

# Alternative AI Router (Optional)
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### Step 5: Run Development Server

```bash
# Start the development server
bun run dev
```

**Expected output:**
```
  ▲ Next.js 16.3.5
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 1.2s
```

### Step 6: Open in Browser

Navigate to **http://localhost:3000**

You should see the ROAMI cinematic home page! 🎉

### Available Scripts

```bash
# Development
bun run dev          # Start dev server (hot reload enabled)

# Building
bun run build        # Create production build
bun run start        # Start production server (run after build)

# Code Quality
bun run lint         # Run ESLint (check for code issues)
bun run typecheck    # TypeScript type checking

# Testing
bun run test         # Run test suite with Bun
```

## 🔐 Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root:

```env
# ===========================================
# ROAMI Environment Configuration
# ===========================================

# ----- AI Services -----
# GROQ API for AI-powered trip planning
# Get your key: https://console.groq.com/keys
GROQ_API_KEY=gsk_your_groq_api_key_here

# OpenRouter API (Alternative AI provider)
# Get your key: https://openrouter.ai/keys
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_key_here

# ----- Optional: Model Selection -----
# Specify AI model to use (optional)
# Default: mixtral-8x7b-32768
AI_MODEL=inclusionai/ling-3.0-flash-vl:free
```

### Getting API Keys

#### GROQ API Key
1. Visit [https://console.groq.com/keys](https://console.groq.com/keys)
2. Create an account or sign in
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)
5. Paste into `.env` file

#### OpenRouter API Key (Optional)
1. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up or log in
3. Generate a new API key
4. Copy the key (starts with `sk-or-v1-`)
5. Paste into `.env` file

### Security Notes

⚠️ **IMPORTANT:**
- **NEVER commit `.env` to Git** (already in `.gitignore`)
- **DO NOT share your API keys publicly**
- **Rotate keys if accidentally exposed**
- Use different keys for development and production

### Environment Variable Validation

The app will warn you if required environment variables are missing:

```bash
# Check if variables are loaded
bun run dev

# Expected: Server starts without environment errors
```

## 💻 Development Workflow

### End-to-End Development Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    1. REQUIREMENT & PLANNING                     │
│  • Define feature requirements                                   │
│  • Review existing data structures                               │
│  • Plan component hierarchy                                      │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    2. DATA LAYER UPDATES                         │
│  • Update /data/*.ts files (highlights, navigation, etc.)        │
│  • Define TypeScript interfaces                                  │
│  • Add static content and configurations                         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    3. COMPONENT DEVELOPMENT                      │
│  • Create new components in /components/sections/                │
│  • Build reusable UI in /components/ui/                         │
│  • Implement accessibility (ARIA, keyboard nav)                  │
│  • Style with Tailwind CSS                                       │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    4. ANIMATION IMPLEMENTATION                   │
│  • Create custom hooks in /hooks/                               │
│  • Add GSAP timelines & ScrollTriggers                          │
│  • Implement Framer Motion animations                           │
│  • Test reduced motion preferences                              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    5. ROUTING & PAGES                           │
│  • Create/update pages in /app/                                 │
│  • Configure metadata for SEO                                   │
│  • Integrate components into pages                              │
│  • Test dynamic routes                                          │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    6. TESTING & QA                              │
│  • Write unit tests (Bun test)                                  │
│  • Test responsive design (mobile/tablet/desktop)               │
│  • Verify accessibility (WCAG compliance)                       │
│  • Performance testing (Lighthouse)                             │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    7. CODE REVIEW & LINT                        │
│  • Run: bun run lint                                            │
│  • Run: bun run typecheck                                       │
│  • Fix ESLint warnings/errors                                   │
│  • Review code for best practices                               │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    8. BUILD & DEPLOY                            │
│  • Run: bun run build                                           │
│  • Test production build locally                                │
│  • Deploy to Vercel/hosting                                     │
│  • Monitor for errors                                           │
└─────────────────────────────────────────────────────────────────┘
```

### Development Best Practices

#### 1. Component Creation
```bash
# Create a new section component
/components/sections/home/new-section.tsx

# Follow naming conventions:
# - PascalCase for components (NewSection)
# - kebab-case for files (new-section.tsx)
# - Use descriptive names
```

#### 2. State Management
```typescript
// Use React hooks for local state
import { useState, useEffect } from "react";

// For complex scroll states, use custom hooks
import { useCinemaScroll } from "@/hooks/use-cinema-scroll";
```

#### 3. Styling Guidelines
```typescript
// Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-slate-900">

// For dynamic styles, use cn() utility
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className // Allow className override
)}>
```

#### 4. Animation Guidelines
```typescript
// GSAP for scroll-driven animations
gsap.to(element, {
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
  y: -100,
});

// Framer Motion for UI transitions
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
```

#### 5. Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-animation

# Make changes and commit
git add .
git commit -m "feat: add new parallax animation"

# Push to remote
git push origin feature/new-animation

# Create pull request on GitHub
```

## 🎨 Key Components

### 1. Cinematic Home Experience (`/components/sections/home/cinematic-home.tsx`)

The centerpiece of ROAMI - a scroll-driven cinematic journey:

**Features:**
- **Layered Parallax**: 7 layers moving at different speeds
- **Mouse Parallax**: Subtle 3D depth with cursor tracking
- **Scroll Chapters**: 
  - `#cinema` - Initial hero with ROAMI title
  - `#bridge` - Old Bridge story panel
  - `#bazaar` - Bazaar exploration panel
  - `#routes` - Arrival sequence (plane → airport → doors)
- **Smart Performance**: Respects `prefers-reduced-motion`

**Technical Implementation:**
```typescript
// GSAP ScrollTrigger with custom math
const frame = getCinemaFrame(smoothScroll, windowHeight, mouseX, mouseY);

// CSS custom properties updated via RAF
root.style.setProperty('--sky-y', frame.skyY);
root.style.setProperty('--bridge-scale', frame.bridgeScale);
```

### 2. Place Hero Variants

Three distinct hero styles for showcasing places:

#### **A. Boomerang Hero** (`/components/sections/places/boomerang-hero.tsx`)
- Video plays forward on scroll down
- Reverses on scroll up
- Creates a "boomerang" effect
- Used for: Old Bridge

```typescript
interface BoomerangHeroContent {
  variant: "boomerang";
  video: string;
  poster: string;
  headlineLead: string;
  headlineAccent: [string, string];
  intro: string;
  // ...
}
```

#### **B. Fade Hero** (`/components/sections/places/fade-hero.tsx`)
- Elegant fade-in animation
- Split headline with muted accent
- Minimal design
- Used for: Neretva River

```typescript
interface FadeHeroContent {
  variant: "fade";
  headline: { text: string; muted?: boolean }[];
  description: string;
  // ...
}
```

#### **C. Glass Hero** (`/components/sections/places/glass-hero.tsx`)
- Glassmorphic design
- Email capture form
- Stats & testimonials
- Used for: UNESCO Old City

```typescript
interface GlassHeroContent {
  variant: "glass";
  headline: string;
  emailPlaceholder: string;
  emailCta: string;
  stat: { value: string; label: string };
  testimonial: { /* ... */ };
}
```

### 3. Animation System

#### **GSAP ScrollTrigger** (`/hooks/use-cinema-scroll.ts`)
```typescript
// Smooth scroll interpolation
smoothScroll = lerp(smoothScroll, targetScroll, 0.14);

// Mouse parallax
mouseX = lerp(mouseX, targetMouseX, 0.12);
mouseY = lerp(mouseY, targetMouseY, 0.12);

// Frame calculation
const frame = getCinemaFrame(smoothScroll, vh, mouseX, mouseY);

// Apply to CSS custom properties
root.style.setProperty('--var-name', value);
```

#### **Framer Motion** (UI Transitions)
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

#### **Exit Animations** (`/hooks/use-hero-scroll-exit.ts`)
```typescript
// Hero exits upward as user scrolls
gsap.to(hero, {
  yPercent: -100,
  ease: "none",
  scrollTrigger: {
    trigger: hero,
    start: "bottom bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

### 4. UI Components Library

#### **Animated Testimonials** (`/components/ui/animated-testimonials.tsx`)
- Auto-playing carousel
- Smooth transitions
- Pause on hover
- Keyboard navigation

#### **Apple Cards Carousel** (`/components/ui/apple-cards-carousel.tsx`)
- iOS-style card stack
- Momentum scrolling
- Touch/drag support
- Snap-to-center

#### **Gooey Input** (`/components/ui/gooey-input.tsx`)
- Animated focus state
- Gooey morphing effect
- Accessibility-first

## 📊 Data Flow

### Data Flow Architecture

```
Static Data (TS files)
        ↓
   /data/*.ts
        ↓
   TypeScript Interfaces
        ↓
   Server Components (RSC)
        ↓
   Props → Client Components
        ↓
   Render to DOM
        ↓
   GSAP/Framer Animations
        ↓
   User Interactions
```

### Example: Place Page Data Flow

```typescript
// 1. Define data
// /data/highlights.ts
export const highlights: Highlight[] = [
  {
    slug: "old-bridge",
    name: "Old Bridge",
    hero: { variant: "boomerang", /* ... */ },
    body: ["Historical content..."],
    facts: [/* ... */],
  }
];

// 2. Server Component fetches data
// /app/places/[slug]/page.tsx
export default function PlacePage({ params }: { params: { slug: string } }) {
  const place = highlights.find(h => h.slug === params.slug);
  return <PlaceHero hero={place.hero} />;
}

// 3. Client Component renders
// /components/sections/places/place-hero.tsx
"use client";
export function PlaceHero({ hero }: { hero: HeroContent }) {
  if (hero.variant === "boomerang") return <BoomerangHero {...hero} />;
  // ...
}

// 4. Animations activate
// After hydration, GSAP ScrollTrigger binds
```

## 📝 Content Management

### Adding New Places

**Step 1:** Add data to `/data/highlights.ts`

```typescript
export const highlights: Highlight[] = [
  // ... existing places
  {
    slug: "kravice-waterfalls",
    name: "Kravice Waterfalls",
    tagline: "Cascading pools in the Herzegovina countryside.",
    hero: {
      variant: "fade",
      video: "https://cdn.example.com/kravice-video.mp4",
      poster: "/videos/kravice-poster.jpg",
      headline: [
        { text: "Nature's " },
        { text: "hidden gem", muted: true },
      ],
      description: "Twenty kilometers from Mostar...",
    },
    body: [
      "Full historical context...",
      "Visiting information...",
    ],
    facts: [
      { label: "Height", value: "25 meters" },
      { label: "Width", value: "120 meters" },
    ],
  },
];
```

**Step 2:** Add video assets to `/public/videos/`

```
/public/videos/
  kravice-video.mp4          # Hero video (or use CDN URL)
  kravice-poster.jpg         # Video poster image
```

**Step 3:** Route is automatically generated!

Navigate to: `http://localhost:3000/places/kravice-waterfalls`

### Updating Navigation

Edit `/data/navigation.ts`:

```typescript
export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "Places", href: "/#places" },
  { label: "Kravice", href: "/places/kravice-waterfalls" }, // New!
  { label: "Plan", href: "/plan" },
];
```

## 🌐 Deployment

### Deploying to Vercel (Recommended)

**Method 1: Git Integration (Automatic)**

1. Push code to GitHub/GitLab/Bitbucket
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables:
   - `GROQ_API_KEY`
   - `OPENROUTER_API_KEY` (optional)
6. Click "Deploy"

**Method 2: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Build Configuration

The project uses `vercel.json` for deployment config:

```json
{
  "framework": "nextjs",
  "buildCommand": "bun run build",
  "installCommand": "bun install"
}
```

### Environment Variables in Vercel

1. Go to Project Settings
2. Click "Environment Variables"
3. Add:
   - **Name:** `GROQ_API_KEY`
   - **Value:** `gsk_your_key_here`
   - **Environments:** Production, Preview, Development
4. Redeploy to apply changes

### Manual Deployment (Other Platforms)

```bash
# Build the project
bun run build

# Output directory: .next/
# Start production server
bun run start

# Or export static site (if applicable)
# Note: Some features require server-side rendering
```

## ⚡ Performance

### Performance Optimizations

#### 1. **Video Optimization**
```typescript
// CloudFront CDN for fast delivery
const cloudfront = "https://d8j0ntlcm91z4.cloudfront.net/...";

// Poster images for instant visual
<video poster="/videos/poster.jpg" />

// Lazy loading for below-fold videos
<video loading="lazy" />
```

#### 2. **Image Optimization**
```typescript
// Next.js Image component
import Image from "next/image";

<Image
  src="/image.jpg"
  width={800}
  height={600}
  alt="Description"
  loading="lazy" // or "eager" for above-fold
/>
```

#### 3. **Font Optimization**
```css
/* globals.css */
@font-face {
  font-family: 'Ogg Text';
  src: url('/fonts/OggText-Medium.woff2') format('woff2');
  font-display: swap; /* Prevent FOIT */
  font-weight: 500;
}
```

#### 4. **Code Splitting**
```typescript
// Client components are automatically split
"use client";

// Dynamic imports for heavy components
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./heavy"), {
  loading: () => <LoadingSpinner />,
});
```

#### 5. **Scroll Performance**
```typescript
// RequestAnimationFrame for smooth updates
function update() {
  // ... calculations
  frameId = requestAnimationFrame(update);
}

// CSS custom properties (faster than inline styles)
root.style.setProperty('--y', value);

// Passive event listeners
window.addEventListener('scroll', handler, { passive: true });
```

### Performance Metrics

**Target Lighthouse Scores:**
- Performance: 90+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

**Key Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Monitoring Performance

```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse http://localhost:3000 --view

# Check bundle size
bun run build
# Look for "Route (app)" size information
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run specific test file
bun test path/to/test.test.ts

# Run with coverage
bun test --coverage
```

### Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── components/         # Component tests
│   ├── hooks/              # Hook tests
│   └── lib/                # Utility tests
├── integration/            # Integration tests
└── e2e/                    # End-to-end tests (if applicable)
```

### Example Test

```typescript
// tests/unit/lib/cinema-math.test.ts
import { describe, test, expect } from "bun:test";
import { lerp, clamp } from "@/lib/cinema-math";

describe("Cinema Math Utilities", () => {
  test("lerp interpolates correctly", () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 1)).toBe(100);
  });

  test("clamp restricts values to range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(150, 0, 100)).toBe(100);
  });
});
```

## 🐛 Troubleshooting

### Common Issues

#### Issue: Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules bun.lock
bun install
```

#### Issue: TypeScript errors
```bash
# Regenerate type definitions
bun run typecheck

# Check tsconfig.json paths
```

#### Issue: Environment variables not loading
```bash
# Verify .env file exists
ls -la | grep .env

# Restart dev server
bun run dev
```

#### Issue: Animations not working
```bash
# Check browser console for errors
# Verify GSAP is installed
bun list | grep gsap

# Test with reduced motion disabled
# (Browser DevTools > Rendering > Emulate CSS prefers-reduced-motion)
```

#### Issue: Videos not loading
```bash
# Check CloudFront URLs in data/highlights.ts
# Verify video files in /public/videos/
# Check browser network tab for 404s
```

### Debug Mode

Enable verbose logging:

```typescript
// Add to next.config.ts temporarily
const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

### Tutorials & Learning
- [Next.js App Router Course](https://nextjs.org/learn)
- [GSAP ScrollTrigger Demos](https://greensock.com/st-demos/)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)

### Tools
- [Vercel Dashboard](https://vercel.com/dashboard)
- [GROQ Console](https://console.groq.com/)
- [Bun Documentation](https://bun.sh/docs)

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Contribution Workflow

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/your-username/ROAMI.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   # OR
   git checkout -b fix/bug-description
   ```

3. **Make your changes**
   - Follow code style guidelines
   - Add tests for new features
   - Update documentation

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new parallax section"
   git commit -m "fix: resolve scroll position bug"
   git commit -m "docs: update installation guide"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description
   - Link related issues
   - Add screenshots for UI changes

### Code Style Guidelines

- Use **TypeScript** for all new code
- Follow **ESLint** rules (`bun run lint`)
- Use **Tailwind CSS** for styling
- Write **semantic HTML**
- Add **JSDoc comments** for complex functions
- Use **conventional commits**

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 📄 License

This project is **private and proprietary**.

© 2024 ROAMI. All rights reserved.

## 🙏 Acknowledgments

- **UNESCO World Heritage Site** - Old Bridge Area of the Old City of Mostar
- **Historic content and imagery** - Mostar, Bosnia and Herzegovina
- **Local communities** - Stories and cultural insights
- **Travelers** - Testimonials and feedback
- **Open Source Community** - For the amazing tools and libraries

## 📞 Support & Contact

- **Documentation Issues**: Open an issue on GitHub
- **Feature Requests**: Use GitHub Discussions
- **Security Issues**: Email security@roami.example (replace with actual)
- **General Inquiries**: contact@roami.example (replace with actual)

## 🗺️ Roadmap

### Current Version: v0.1.0

**Upcoming Features:**
- [ ] Multi-language support (Bosnian, Turkish, German)
- [ ] Interactive map with place markers
- [ ] User accounts & saved itineraries
- [ ] Real-time weather integration
- [ ] Mobile app (React Native)
- [ ] Offline mode with service workers
- [ ] Virtual tours with 360° photos
- [ ] Integration with local tour guides

### Version History

**v0.1.0** (Current)
- ✅ Cinematic scroll experience
- ✅ Three place pages with dynamic heroes
- ✅ AI-powered trip planning
- ✅ Responsive design
- ✅ Accessibility features

---

<div align="center">

**Built with ❤️ for travelers exploring Mostar**

🌍 [Visit ROAMI](https://roami.example) • 📖 [Documentation](https://docs.roami.example) • 💬 [Community](https://github.com/roami/community)

[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

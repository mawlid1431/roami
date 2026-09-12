# ROAMI Quick Start Guide

> **Get up and running with ROAMI in 5 minutes!** ⚡

## 🚀 Fast Installation

### 1. Install Bun (if not installed)

**Windows (PowerShell):**
```powershell
powershell -c "irm bun.sh/install.ps1|iex"
```

**macOS/Linux:**
```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-username/ROAMI.git
cd ROAMI

# Install dependencies (fast with Bun!)
bun install
```

### 3. Set Up Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your API keys:
# - GROQ_API_KEY=your_key_here
# Get key: https://console.groq.com/keys
```

### 4. Run Development Server

```bash
bun run dev
```

Open **http://localhost:3000** 🎉

## ✅ Verify Installation

You should see:
- ✅ Cinematic home page with parallax scrolling
- ✅ Smooth animations (try scrolling!)
- ✅ Interactive place carousel
- ✅ No console errors

## 🎨 Make Your First Change

### Add a New Place

1. **Edit** `data/highlights.ts`:

```typescript
export const highlights: Highlight[] = [
  // ... existing places
  {
    slug: "new-place",
    name: "New Place Name",
    tagline: "Short description",
    hero: {
      variant: "fade",
      video: "https://example.com/video.mp4",
      poster: "/videos/poster.jpg",
      headline: [{ text: "Welcome to " }, { text: "New Place", muted: true }],
      description: "Description here...",
    },
    body: ["Paragraph 1", "Paragraph 2"],
    facts: [
      { label: "Fact 1", value: "Value 1" },
    ],
  },
];
```

2. **Save** the file (hot reload will update the page)

3. **Visit** http://localhost:3000/places/new-place

## 🛠️ Common Commands

```bash
# Development
bun run dev         # Start dev server

# Build
bun run build       # Production build
bun run start       # Start production server

# Code Quality
bun run lint        # Check code style
bun run typecheck   # Check TypeScript types

# Testing
bun test            # Run tests
```

## 📁 Key Files to Know

```
ROAMI/
├── app/
│   ├── page.tsx                    # Home page
│   └── places/[slug]/page.tsx      # Place pages
├── components/
│   ├── sections/                   # Page sections
│   └── ui/                         # Reusable components
├── data/
│   └── highlights.ts               # Place content (EDIT THIS!)
├── .env                            # Your API keys (secret!)
└── README.md                       # Full documentation
```

## 🔥 Hot Tips

1. **Hot Reload**: Save any file → page updates instantly
2. **Type Safety**: TypeScript will catch errors as you type
3. **Tailwind CSS**: Use utility classes like `flex`, `p-4`, `bg-slate-900`
4. **Animations**: Check `hooks/use-cinema-scroll.ts` for scroll magic

## 🆘 Troubleshooting

### Port 3000 Already in Use?
```bash
# Use a different port
bun run dev -- -p 3001
```

### Dependencies Not Installing?
```bash
# Clear cache and reinstall
rm -rf node_modules bun.lock
bun install
```

### TypeScript Errors?
```bash
# Check for type issues
bun run typecheck
```

### Videos Not Loading?
- Check CloudFront URLs in `data/highlights.ts`
- Verify video files exist in `/public/videos/`
- Open browser DevTools → Network tab → look for 404s

## 📚 Next Steps

1. **Read the full README**: [README.md](./README.md)
2. **Understand the architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
3. **Contribute**: [CONTRIBUTING.md](./CONTRIBUTING.md)
4. **Explore the code**: Start with `app/page.tsx`

## 🎯 Learning Path

**Beginner:**
1. Modify text in `data/highlights.ts`
2. Change colors in `app/globals.css`
3. Add new navigation links in `data/navigation.ts`

**Intermediate:**
1. Create a new UI component in `components/ui/`
2. Add a new section to home page
3. Customize scroll animations

**Advanced:**
1. Build a new hero variant
2. Integrate a new API
3. Optimize animation performance

## ❓ Questions?

- **Documentation**: See [README.md](./README.md)
- **Issues**: Check [GitHub Issues](https://github.com/roami/roami/issues)
- **Community**: Join [Discussions](https://github.com/roami/roami/discussions)

---

**Happy building!** 🚀

Made with ❤️ by the ROAMI community

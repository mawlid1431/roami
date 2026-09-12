# Contributing to ROAMI

Thank you for your interest in contributing to ROAMI! This project was created by [Mowlid Haibe](https://github.com/mawlid1431) and is open to community contributions.

**Repository**: [https://github.com/mawlid1431/ROAMI](https://github.com/mawlid1431/ROAMI)

We welcome contributions from developers of all skill levels. This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## 🤝 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment, discrimination, or trolling
- Publishing others' private information
- Inappropriate or unprofessional conduct

## 🚀 Getting Started

### Prerequisites

1. **Fork the repository** on GitHub: [https://github.com/mawlid1431/ROAMI](https://github.com/mawlid1431/ROAMI)
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ROAMI.git
   cd ROAMI
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/mawlid1431/ROAMI.git
   ```
4. **Install dependencies**:
   ```bash
   bun install
   ```
5. **Create a branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Sync with Upstream

Keep your fork up to date:

```bash
# Fetch upstream changes
git fetch upstream

# Merge into your local main
git checkout main
git merge upstream/main

# Push to your fork
git push origin main
```

## 💻 Development Workflow

### 1. Choose an Issue

- Browse [open issues](https://github.com/roami/roami/issues)
- Look for `good first issue` or `help wanted` labels
- Comment on the issue to claim it

### 2. Create a Branch

Use descriptive branch names:

```bash
# Feature
git checkout -b feature/add-map-integration

# Bug fix
git checkout -b fix/carousel-scroll-bug

# Documentation
git checkout -b docs/update-installation-guide
```

### 3. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 4. Test Your Changes

```bash
# Run linter
bun run lint

# Run type checker
bun run typecheck

# Run tests
bun test

# Start dev server and test manually
bun run dev
```

### 5. Commit Changes

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat: add map integration for places"
```

### 6. Push to Your Fork

```bash
git push origin feature/add-map-integration
```

### 7. Create Pull Request

- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill out the PR template
- Wait for review

## 📝 Coding Standards

### TypeScript

```typescript
// ✅ DO: Use explicit types
interface PlaceCardProps {
  name: string;
  tagline: string;
  imageUrl: string;
}

// ❌ DON'T: Use 'any'
function processData(data: any) { }

// ✅ DO: Use proper types
function processData(data: Highlight[]) { }
```

### React Components

```typescript
// ✅ DO: Use functional components
export function PlaceCard({ name, tagline }: PlaceCardProps) {
  return <div>{name}</div>;
}

// ✅ DO: Use proper prop types
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// ✅ DO: Export interfaces
export interface PlaceCardProps {
  // ...
}
```

### File Organization

```typescript
// Component file structure:
// 1. Imports
import { useState } from "react";
import { cn } from "@/lib/utils";

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export function Component({ prop }: ComponentProps) {
  // 3a. Hooks
  const [state, setState] = useState(0);
  
  // 3b. Functions
  const handleClick = () => { };
  
  // 3c. Render
  return <div />;
}

// 4. Sub-components (if small)
function SubComponent() { }
```

### Styling

```typescript
// ✅ DO: Use Tailwind utilities
<div className="flex items-center gap-4 p-6 bg-slate-900">

// ✅ DO: Use cn() for dynamic classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>

// ❌ DON'T: Use inline styles (unless necessary)
<div style={{ color: 'red' }}>

// ✅ DO: Use CSS variables for dynamic values
<div style={{ "--value": progress } as React.CSSProperties}>
```

### Naming Conventions

```typescript
// Components: PascalCase
export function PlaceCard() { }

// Files: kebab-case
// place-card.tsx

// Hooks: camelCase with 'use' prefix
export function useCinemaScroll() { }

// Constants: UPPER_SNAKE_CASE
const MAX_SLIDES = 10;

// Variables/Functions: camelCase
const activeIndex = 0;
function handleClick() { }
```

## 📦 Commit Guidelines

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, no logic change)
- **refactor**: Code refactoring (no feature/fix)
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Maintenance tasks (dependencies, config)
- **ci**: CI/CD changes
- **revert**: Revert previous commit

### Examples

```bash
# Feature
feat(places): add interactive map for place details

# Bug fix
fix(carousel): resolve infinite scroll issue on mobile

# Documentation
docs(readme): update installation instructions

# Refactor
refactor(hooks): simplify useCinemaScroll logic

# Performance
perf(images): optimize image loading with lazy loading

# Breaking change
feat(api)!: change trip planning API response format

BREAKING CHANGE: Response now returns `itinerary` instead of `plan`
```

### Scope

Common scopes:
- `places` - Place pages/components
- `home` - Home page
- `plan` - Trip planning
- `ui` - UI components
- `hooks` - Custom hooks
- `api` - API routes
- `deps` - Dependencies
- `config` - Configuration files

## 🔍 Pull Request Process

### PR Checklist

Before submitting, ensure:

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console warnings/errors
- [ ] Tests pass (`bun test`)
- [ ] Lint passes (`bun run lint`)
- [ ] Type check passes (`bun run typecheck`)
- [ ] Manually tested in browser
- [ ] Responsive design verified (mobile/tablet/desktop)
- [ ] Accessibility tested (keyboard nav, screen reader)

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Screenshots (if applicable)
[Add screenshots here]

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks**: CI runs linter, tests, build
2. **Code Review**: Maintainer reviews code
3. **Feedback**: Address review comments
4. **Approval**: Maintainer approves PR
5. **Merge**: Maintainer merges to main

### After Merge

Your contribution will be:
- Included in next release
- Credited in release notes
- Celebrated in community updates 🎉

## 🧪 Testing Guidelines

### Writing Tests

```typescript
// tests/unit/lib/cinema-math.test.ts
import { describe, test, expect } from "bun:test";
import { lerp, clamp, easeInOut } from "@/lib/cinema-math";

describe("cinema-math utilities", () => {
  describe("lerp", () => {
    test("interpolates between two values", () => {
      expect(lerp(0, 100, 0.5)).toBe(50);
    });
    
    test("returns start value when t=0", () => {
      expect(lerp(0, 100, 0)).toBe(0);
    });
    
    test("returns end value when t=1", () => {
      expect(lerp(0, 100, 1)).toBe(100);
    });
  });
  
  describe("clamp", () => {
    test("restricts value to range", () => {
      expect(clamp(50, 0, 100)).toBe(50);
      expect(clamp(-10, 0, 100)).toBe(0);
      expect(clamp(150, 0, 100)).toBe(100);
    });
  });
});
```

### Component Testing

```typescript
// tests/unit/components/ui/button.test.tsx
import { describe, test, expect } from "bun:test";
import { render } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button component", () => {
  test("renders with children", () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText("Click me")).toBeDefined();
  });
  
  test("applies variant classes", () => {
    const { container } = render(<Button variant="primary">Click</Button>);
    expect(container.firstChild.classList.contains("bg-primary")).toBe(true);
  });
});
```

### Manual Testing

For each change, test:

1. **Desktop** (Chrome, Firefox, Safari, Edge)
2. **Mobile** (iOS Safari, Android Chrome)
3. **Tablet** (iPad, Android tablet)
4. **Accessibility**:
   - Keyboard navigation (Tab, Enter, Esc)
   - Screen reader (NVDA, VoiceOver)
   - High contrast mode
   - Reduced motion preference

## 📚 Documentation

### Code Comments

```typescript
// ✅ DO: Explain why, not what
// Smooth interpolation prevents jank on low-end devices
smoothScroll = lerp(smoothScroll, targetScroll, 0.14);

// ❌ DON'T: State the obvious
// Set smooth scroll to lerp
smoothScroll = lerp(smoothScroll, targetScroll, 0.14);

// ✅ DO: Document complex functions
/**
 * Calculates the cinematic frame state based on scroll position.
 * 
 * @param scroll - Current scroll distance in pixels
 * @param vh - Viewport height in pixels
 * @param mouseX - Mouse X position normalized to -0.5 to 0.5
 * @param mouseY - Mouse Y position normalized to -0.5 to 0.5
 * @returns Frame object with CSS custom property values
 */
export function getCinemaFrame(
  scroll: number,
  vh: number,
  mouseX: number,
  mouseY: number
): CinemaFrame {
  // ...
}
```

### README Updates

When adding features, update:

- [ ] README.md - High-level overview
- [ ] ARCHITECTURE.md - Technical details
- [ ] API documentation (if applicable)
- [ ] Inline code comments

## ❓ Questions?

- **General questions**: Open a [Discussion](https://github.com/mawlid1431/ROAMI/discussions)
- **Bug reports**: Open an [Issue](https://github.com/mawlid1431/ROAMI/issues)
- **Connect with creator**: [@mawlid1431](https://github.com/mawlid1431) on GitHub
- **Security issues**: Report via GitHub Security tab (DO NOT open public issue)

## 🎉 Thank You!

Your contributions make ROAMI better for everyone. We appreciate your time and effort!

Special thanks to [Mowlid Haibe](https://github.com/mawlid1431) for creating and maintaining this project.

### Show Your Support

If you contribute or find this project helpful:
- ⭐ Star the repository
- 👤 Follow [@mawlid1431](https://github.com/mawlid1431)
- 📢 Share your contributions
- 💬 Help others in discussions

---

**Happy Coding!** 🚀

Created with ❤️ by [Mowlid Haibe](https://github.com/mawlid1431) | Licensed under [MIT](./LICENSE)

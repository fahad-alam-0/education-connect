<!-- GSD:project-start source:PROJECT.md -->
## Project

**EduConnect**

EduConnect is a responsive career guidance and college admission platform for students in India and abroad. It provides centralized college listings, admission/career guidance, a personalized student dashboard, scholarships, entrance exams info, and a blog — all working across mobile and desktop browsers.

**Core Value:** Students can discover, compare, and track college admissions in one place — eliminating the confusion of scattered information and missed deadlines.

### Constraints

- **Tech Stack**: Next.js + React + Tailwind CSS + shadcn/ui — per BRD decision
- **Platform**: Responsive web (mobile + desktop), runs in Chrome
- **Approach**: Frontend working model first, mock/static data acceptable
- **Team**: 3 BCA students
- **Quality**: Production-grade UI, professional look and feel
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Verdict on the Proposed Stack
- Next.js 15 is stable and production-ready (not 14)
- React 19 is stable and ships with Next.js 15 App Router (not 18)
- Tailwind CSS is on v4 (not v3), with a significantly different installation model
- Django 5.2 LTS released April 2025 (not a version-specific concern, just upgrade)
## Recommended Stack
### Core Frontend Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.2.x | React framework, routing, SSR/SSG | App Router provides file-based routing, Server Components for SEO-critical pages (college listings, blog), and built-in image optimization. Turbopack dev server is now stable and 76% faster than webpack. |
| React | 19.x | UI component library | Ships with Next.js 15 App Router. New hooks (`useActionState`, `useOptimistic`, `useFormStatus`) simplify forms for application tracker and scholarship search. `ref` as prop eliminates `forwardRef` boilerplate. |
| TypeScript | 5.x | Type safety | `next.config.ts` now natively supported. Catches data shape mismatches between Django API responses and frontend types at compile time — critical for a team of 3. |
### Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.2.x | Utility-first CSS | v4 is a ground-up rewrite: no `tailwind.config.js` required (config lives in CSS), CSS-native cascade layers, faster build via Rust-based Oxide engine (~35% smaller installs). Mobile-first responsive utilities cover the 320px–1440px requirement directly. |
| `@tailwindcss/postcss` | 4.x | PostCSS integration for Next.js | Required in v4 — replaces the old `tailwindcss` PostCSS plugin. Install alongside `postcss`. |
### Component Library
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | latest (CLI-installed) | Accessible UI components | Not a package — components are copied into your codebase via CLI (`npx shadcn@latest init`). You own the code. Uses Radix UI primitives for accessibility, styled with Tailwind. Directly provides: Dialog, Sheet, Tabs, Table, Select, Combobox, Calendar, Badge, Card, Breadcrumb, Pagination — all needed for EduConnect. |
| Radix UI | (via shadcn) | Accessible primitives | Headless, keyboard-navigable, ARIA-compliant. shadcn/ui wraps Radix — don't install Radix directly unless customizing beyond shadcn components. |
| Lucide React | latest | Icon set | Default icon library for shadcn/ui. 1500+ icons, tree-shakeable. Use for navigation, status indicators, action buttons throughout the platform. |
- `Button`, `Input`, `Label`, `Textarea`, `Select` — Forms throughout
- `Card` — College listing cards, scholarship cards
- `Tabs` — College detail page (Overview/Courses/Fees/Admissions)
- `Table` — Comparison tool, scholarship database
- `Dialog`, `Sheet` — Filters panel, booking modals
- `Calendar` — Deadline calendar in student dashboard
- `Badge` — College tags, exam status indicators
- `Combobox` — Global search autocomplete
- `Pagination` — College listings, blog
- `Avatar`, `DropdownMenu` — User profile/nav
- `Skeleton` — Loading states
- `Toast` (Sonner) — Notification feedback
### State Management
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Context + `useReducer` | (built-in React 19) | Global auth state, theme, user preferences | Sufficient for this scale. Auth state (logged in user, token) and UI state (current theme) don't need a full state manager. Avoids adding a dependency for a student project. |
| Zustand | 5.x | Client-side state beyond context | Use ONLY if Context + useReducer becomes unwieldy — specifically for the college comparison feature (tracking up to 4 selected colleges across route navigations). Lightweight (2KB), no boilerplate, works well with Next.js App Router. |
### Forms and Validation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Form state management | Uncontrolled inputs, minimal re-renders. Critical for the multi-step application tracker form and counselor booking flow. Integrates natively with shadcn/ui form components. |
| Zod | 3.x | Schema validation | Define validation schemas once, share between frontend and backend type definitions. `react-hook-form` + `zod` via `@hookform/resolvers` is the standard shadcn/ui pattern. |
| `@hookform/resolvers` | 3.x | Bridge between RHF and Zod | Allows Zod schemas to power React Hook Form validation directly. |
### Data Fetching (Frontend)
| Approach | When to Use | Why |
|----------|-------------|-----|
| `fetch()` in Server Components | College listings, college detail, blog, scholarships, entrance exams | Zero-bundle, data fetched on server, HTML delivered pre-rendered. Best for SEO-critical pages. |
| Route Handlers (`app/api/`) | Proxying Django API calls that need auth headers, server-side mutations | Adds Next.js layer between browser and Django — useful for attaching JWT tokens server-side. |
| TanStack Query v5 | Highly interactive client pages: comparison tool, dashboard, real-time search | Caching, background refetch, optimistic updates. Install only where needed — not a blanket dependency. |
### Theme Support (Dark/Light)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next-themes` | 0.3.x | Dark/light mode toggle | Works with Next.js App Router. Wraps the app in a ThemeProvider, reads/writes to `localStorage` and applies a `data-theme` attribute. shadcn/ui is designed around this pattern using CSS variables for colors. |
### Backend Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Python | 3.12.x | Runtime | 3.12 is the sweet spot — fully supported by Django 5.2, most stable active release, better performance than 3.11. Avoid 3.13/3.14 for a student project (fewer compatible packages). |
| Django | 5.2 LTS | Web framework | 5.2 is an LTS release (April 2025), supported until April 2028. New features relevant to EduConnect: connection pooling for PostgreSQL, `LoginRequiredMiddleware`, async session API. Use for models, migrations, admin panel (free admin UI for content management requirement), ORM. |
| Django REST Framework | 3.15.x | REST API layer | Standard, battle-tested. Provides serializers, viewsets, routers, authentication classes, pagination, filtering. The entire backend API surface for EduConnect is achievable with DRF alone — no need for FastAPI or similar. |
### Backend Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `djangorestframework-simplejwt` | 5.x | JWT authentication | Provides access/refresh token endpoints. Use for stateless auth between Next.js frontend and Django backend. Configure token lifetimes: access 15min, refresh 7 days. |
| `django-cors-headers` | 4.x | CORS handling | Required for Next.js dev server (localhost:3000) to call Django API (localhost:8000). Add `corsheaders.middleware.CorsMiddleware` before `CommonMiddleware`. |
| `django-filter` | 24.x | Query filtering | Powers `?country=usa&type=private&fees_max=50000` on college listings. Works natively with DRF's `FilterBackend`. |
| `drf-spectacular` | 0.27.x | OpenAPI schema generation | Generates `/api/schema/`, `/api/docs/` (Swagger UI). Essential for a team of 3 — frontend devs can explore the API without asking backend devs. |
| `Pillow` | 10.x | Image processing | Required for `ImageField` on college logos, counselor profile photos. |
| `psycopg2-binary` | 2.9.x | PostgreSQL adapter | The standard PostgreSQL driver for Python/Django. Use `-binary` variant for easier installation (no C compiler needed). Switch to `psycopg2` (non-binary) in production for performance. |
| `python-decouple` or `django-environ` | latest | Environment variable management | Keeps secrets (DB password, JWT secret, API keys) out of code. Use `.env` file locally, actual env vars in production. |
| `whitenoise` | 6.x | Static file serving | Serves Next.js build output or Django admin static files without a separate Nginx step. Useful for simple self-hosted deployments. |
### Database
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| PostgreSQL | 16.x or 17.x | Primary database | Full-text search (`tsvector`/`tsquery`) for college/scholarship/blog search. `ArrayField` for storing multiple course types per college. `JSONField` for flexible placement data that varies by college type. `pg_trgm` extension for fuzzy search (typo-tolerant college name search). Django 5.2 adds native connection pooling, eliminating need for PgBouncer at small scale. |
### Development Tooling
| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| ESLint | 9.x | Linting | Next.js 15 ships with ESLint 9 support. Use `eslint-config-next` (included). |
| Prettier | 3.x | Code formatting | Consistent style across 3 developers. Add `prettier-plugin-tailwindcss` to auto-sort Tailwind class names. |
| `prettier-plugin-tailwindcss` | 0.6.x | Tailwind class sorting | Prevents merge conflicts caused by inconsistent class ordering. |
| Husky + lint-staged | latest | Pre-commit hooks | Runs ESLint + Prettier on staged files before every commit. Prevents broken code from entering the repo. |
### Authentication Strategy
## Alternatives Considered and Rejected
| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 | Remix, Vite+React | Next.js has better SSR/SSG story for SEO-heavy college pages. Larger ecosystem for a student team. |
| CSS | Tailwind v4 | CSS Modules, styled-components | Tailwind's responsive utilities (`md:`, `lg:`) are essential for the 320px–1440px requirement. styled-components has server rendering complexity. |
| Components | shadcn/ui | MUI, Chakra, Mantine | shadcn/ui copies code into your project — no version lock-in, full customization. MUI/Chakra add heavy bundle weight and opinionated design that fights Tailwind. |
| State | Zustand (if needed) | Redux Toolkit, Jotai | Redux adds boilerplate inappropriate for a 3-person student project. Jotai is fine but less established than Zustand. |
| Backend | Django DRF | FastAPI, Node.js/Express | Django's built-in admin panel satisfies the "Admin panel for content management" requirement for free. DRF is battle-tested for CRUD-heavy platforms. FastAPI is faster but lacks the admin panel and ORM maturity. |
| DB | PostgreSQL | MySQL, MongoDB | PostgreSQL's ArrayField and full-text search are purpose-built for EduConnect's search and filtering requirements. MongoDB loses the relational integrity needed for college-course-scholarship relationships. |
| Auth | JWT (SimpleJWT) | Session auth, Auth.js | Session auth requires sticky sessions or Redis for multi-process deployments. JWT is stateless and simpler for a separate Next.js + Django setup. |
## Project Structure Recommendation
## Full Installation Reference
### Frontend Bootstrap
# Tailwind v4 (replaces v3 scaffolded by create-next-app if older CLI)
# shadcn/ui
# Forms + Validation
# Theme
# Icons (comes with shadcn but explicit is better)
# Optional: state management (add only if needed)
# Optional: data fetching (add only if needed)
# Dev tools
### Backend Bootstrap
# ... repeat for each app
### PostgreSQL (local dev via Docker)
# docker-compose.yml
## Sources
| Claim | Source | Confidence |
|-------|--------|------------|
| Next.js 15.2 stable, Turbopack stable | https://nextjs.org/blog/next-15-2 | HIGH |
| Next.js 15 caching defaults changed | https://nextjs.org/blog/next-15 | HIGH |
| React 19 stable (Dec 2024) | https://react.dev/blog/2024/12/05/react-19 | HIGH |
| Tailwind CSS v4.2, PostCSS plugin model | https://tailwindcss.com/docs/guides/nextjs | HIGH |
| Django 5.2 LTS, Python 3.10-3.14 | https://docs.djangoproject.com/en/5.2/releases/5.2/ | HIGH |
| DRF version, shadcn/ui v4 compatibility | Training data + ecosystem knowledge | MEDIUM |
| next-themes pattern, Zustand v5 | Training data + knowledge cutoff Aug 2025 | MEDIUM |
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

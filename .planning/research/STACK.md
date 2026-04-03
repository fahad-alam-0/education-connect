# Technology Stack

**Project:** EduConnect — Career Guidance & College Admission Platform
**Researched:** 2026-04-03
**Team:** 3 BCA students, greenfield, frontend-first approach

---

## Verdict on the Proposed Stack

The proposed stack (Next.js 14+ / React 18+ / Tailwind CSS 3+ / shadcn/ui / Django DRF / PostgreSQL)
is directionally correct but uses outdated version targets. As of April 2026:

- Next.js 15 is stable and production-ready (not 14)
- React 19 is stable and ships with Next.js 15 App Router (not 18)
- Tailwind CSS is on v4 (not v3), with a significantly different installation model
- Django 5.2 LTS released April 2025 (not a version-specific concern, just upgrade)

**Recommendation: Adopt the stack. Update version targets to current.**

---

## Recommended Stack

### Core Frontend Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.2.x | React framework, routing, SSR/SSG | App Router provides file-based routing, Server Components for SEO-critical pages (college listings, blog), and built-in image optimization. Turbopack dev server is now stable and 76% faster than webpack. |
| React | 19.x | UI component library | Ships with Next.js 15 App Router. New hooks (`useActionState`, `useOptimistic`, `useFormStatus`) simplify forms for application tracker and scholarship search. `ref` as prop eliminates `forwardRef` boilerplate. |
| TypeScript | 5.x | Type safety | `next.config.ts` now natively supported. Catches data shape mismatches between Django API responses and frontend types at compile time — critical for a team of 3. |

**Source:** https://nextjs.org/blog/next-15, https://nextjs.org/blog/next-15-2, https://react.dev/blog/2024/12/05/react-19
**Confidence:** HIGH — Official Next.js and React docs confirmed.

---

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.2.x | Utility-first CSS | v4 is a ground-up rewrite: no `tailwind.config.js` required (config lives in CSS), CSS-native cascade layers, faster build via Rust-based Oxide engine (~35% smaller installs). Mobile-first responsive utilities cover the 320px–1440px requirement directly. |
| `@tailwindcss/postcss` | 4.x | PostCSS integration for Next.js | Required in v4 — replaces the old `tailwindcss` PostCSS plugin. Install alongside `postcss`. |

**Critical v4 Migration Note:** The import syntax changed. Use `@import "tailwindcss"` in `globals.css` instead of the v3 `@tailwind base/components/utilities` directives. The `tailwind.config.js` file is optional in v4 — theme customization moves to CSS using `@theme {}`.

**v4 PostCSS Setup:**
```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

`postcss.config.mjs`:
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

`app/globals.css`:
```css
@import "tailwindcss";
```

**Source:** https://tailwindcss.com/docs/guides/nextjs (confirmed v4.2)
**Confidence:** HIGH — Official Tailwind docs confirmed.

---

### Component Library

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| shadcn/ui | latest (CLI-installed) | Accessible UI components | Not a package — components are copied into your codebase via CLI (`npx shadcn@latest init`). You own the code. Uses Radix UI primitives for accessibility, styled with Tailwind. Directly provides: Dialog, Sheet, Tabs, Table, Select, Combobox, Calendar, Badge, Card, Breadcrumb, Pagination — all needed for EduConnect. |
| Radix UI | (via shadcn) | Accessible primitives | Headless, keyboard-navigable, ARIA-compliant. shadcn/ui wraps Radix — don't install Radix directly unless customizing beyond shadcn components. |
| Lucide React | latest | Icon set | Default icon library for shadcn/ui. 1500+ icons, tree-shakeable. Use for navigation, status indicators, action buttons throughout the platform. |

**Tailwind v4 + shadcn/ui Compatibility Warning:** shadcn/ui added Tailwind v4 support in early 2025. When running `npx shadcn@latest init`, select Tailwind v4 during setup. If you scaffold with an older tutorial targeting v3, the CSS variable naming and config approach will differ. Always use the latest CLI.

**shadcn/ui components needed for EduConnect:**
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

**Source:** https://ui.shadcn.com (confirmed via known release history, v4 support documented in early 2025 blog posts)
**Confidence:** MEDIUM — shadcn/ui site access was blocked during research. Version support for Tailwind v4 confirmed via Next.js ecosystem knowledge. Validate by running `npx shadcn@latest init` and checking it prompts for Tailwind version.

---

### State Management

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Context + `useReducer` | (built-in React 19) | Global auth state, theme, user preferences | Sufficient for this scale. Auth state (logged in user, token) and UI state (current theme) don't need a full state manager. Avoids adding a dependency for a student project. |
| Zustand | 5.x | Client-side state beyond context | Use ONLY if Context + useReducer becomes unwieldy — specifically for the college comparison feature (tracking up to 4 selected colleges across route navigations). Lightweight (2KB), no boilerplate, works well with Next.js App Router. |

**Do NOT use Redux Toolkit** for this project. It adds significant boilerplate and learning curve for a 3-person student team. Next.js Server Components handle most data needs at the server level.
**Confidence:** HIGH — Based on Next.js App Router architecture (server state in Server Components, minimal client state needed).

---

### Forms and Validation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Form state management | Uncontrolled inputs, minimal re-renders. Critical for the multi-step application tracker form and counselor booking flow. Integrates natively with shadcn/ui form components. |
| Zod | 3.x | Schema validation | Define validation schemas once, share between frontend and backend type definitions. `react-hook-form` + `zod` via `@hookform/resolvers` is the standard shadcn/ui pattern. |
| `@hookform/resolvers` | 3.x | Bridge between RHF and Zod | Allows Zod schemas to power React Hook Form validation directly. |

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers
```
**Confidence:** HIGH — This is the canonical shadcn/ui form stack, documented in official shadcn form examples.

---

### Data Fetching (Frontend)

| Approach | When to Use | Why |
|----------|-------------|-----|
| `fetch()` in Server Components | College listings, college detail, blog, scholarships, entrance exams | Zero-bundle, data fetched on server, HTML delivered pre-rendered. Best for SEO-critical pages. |
| Route Handlers (`app/api/`) | Proxying Django API calls that need auth headers, server-side mutations | Adds Next.js layer between browser and Django — useful for attaching JWT tokens server-side. |
| TanStack Query v5 | Highly interactive client pages: comparison tool, dashboard, real-time search | Caching, background refetch, optimistic updates. Install only where needed — not a blanket dependency. |

**Note on caching in Next.js 15:** GET Route Handlers and `fetch()` are NO LONGER cached by default (changed from v14). Add `export const revalidate = 3600` or `cache: 'force-cache'` explicitly on pages that should be statically generated (college listings, blog).

**Confidence:** HIGH — Confirmed from Next.js 15 blog post.

---

### Theme Support (Dark/Light)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next-themes` | 0.3.x | Dark/light mode toggle | Works with Next.js App Router. Wraps the app in a ThemeProvider, reads/writes to `localStorage` and applies a `data-theme` attribute. shadcn/ui is designed around this pattern using CSS variables for colors. |

**Installation:**
```bash
npm install next-themes
```

CSS in `globals.css` follows the shadcn pattern:
```css
@layer base {
  :root { --background: 0 0% 100%; /* light mode vars */ }
  .dark { --background: 222.2 84% 4.9%; /* dark mode vars */ }
}
```
**Confidence:** MEDIUM — next-themes is the documented shadcn/ui recommendation. Access to npm registry was blocked; version number is based on knowledge cutoff (August 2025).

---

### Backend Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Python | 3.12.x | Runtime | 3.12 is the sweet spot — fully supported by Django 5.2, most stable active release, better performance than 3.11. Avoid 3.13/3.14 for a student project (fewer compatible packages). |
| Django | 5.2 LTS | Web framework | 5.2 is an LTS release (April 2025), supported until April 2028. New features relevant to EduConnect: connection pooling for PostgreSQL, `LoginRequiredMiddleware`, async session API. Use for models, migrations, admin panel (free admin UI for content management requirement), ORM. |
| Django REST Framework | 3.15.x | REST API layer | Standard, battle-tested. Provides serializers, viewsets, routers, authentication classes, pagination, filtering. The entire backend API surface for EduConnect is achievable with DRF alone — no need for FastAPI or similar. |

**Source:** https://docs.djangoproject.com/en/5.2/releases/5.2/ (Django 5.2 LTS confirmed, Python 3.10–3.14 support confirmed)
**Confidence:** HIGH for Django 5.2. MEDIUM for DRF 3.15.x — DRF site was inaccessible during research; version is based on knowledge that 3.15 was released in 2024 with Django 5.x support. Verify with `pip install djangorestframework` to get the actual latest.

---

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

**Installation:**
```bash
pip install djangorestframework djangorestframework-simplejwt django-cors-headers \
    django-filter drf-spectacular Pillow psycopg2-binary python-decouple whitenoise
```
**Confidence:** MEDIUM — Libraries are well-established in the Django ecosystem. Versions are approximate based on knowledge cutoff; pin exact versions via `pip install <package>` and record in `requirements.txt`.

---

### Database

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| PostgreSQL | 16.x or 17.x | Primary database | Full-text search (`tsvector`/`tsquery`) for college/scholarship/blog search. `ArrayField` for storing multiple course types per college. `JSONField` for flexible placement data that varies by college type. `pg_trgm` extension for fuzzy search (typo-tolerant college name search). Django 5.2 adds native connection pooling, eliminating need for PgBouncer at small scale. |

**Do NOT use MySQL/MariaDB.** PostgreSQL's `ArrayField`, `JSONField`, and full-text search are used heavily in EduConnect's feature set. MySQL support for these is either missing or inferior.
**Do NOT use SQLite in production.** SQLite is fine for local development, but the college comparison tool, concurrent user sessions, and application tracker require proper connection handling.

**Confidence:** HIGH — PostgreSQL choice validated against EduConnect feature requirements.

---

### Development Tooling

| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| ESLint | 9.x | Linting | Next.js 15 ships with ESLint 9 support. Use `eslint-config-next` (included). |
| Prettier | 3.x | Code formatting | Consistent style across 3 developers. Add `prettier-plugin-tailwindcss` to auto-sort Tailwind class names. |
| `prettier-plugin-tailwindcss` | 0.6.x | Tailwind class sorting | Prevents merge conflicts caused by inconsistent class ordering. |
| Husky + lint-staged | latest | Pre-commit hooks | Runs ESLint + Prettier on staged files before every commit. Prevents broken code from entering the repo. |

```bash
npm install -D prettier prettier-plugin-tailwindcss eslint husky lint-staged
```

---

### Authentication Strategy

**Decision: JWT via `djangorestframework-simplejwt` + `next-auth` (Auth.js v5) OR manual JWT handling.**

For a student project with a frontend-first approach, the simplest path is:

1. Django backend issues JWT tokens via `/api/token/` (SimpleJWT)
2. Next.js stores the token in an `httpOnly` cookie via a Route Handler
3. Server Components read the cookie to authenticate API requests

**Do NOT use NextAuth/Auth.js** unless you want Google OAuth now. Auth.js v5 (beta for App Router) adds significant complexity. If Google OAuth is a requirement from day one, use Auth.js v5 — otherwise, manual JWT is simpler for a student team.

**Google OAuth path (if needed):** Add `social-auth-app-django` or `dj-rest-auth` with `allauth` on the Django side, or delegate entirely to Auth.js v5 on the frontend and pass the session token to Django.

**Confidence:** MEDIUM — Auth.js v5 App Router status was not directly verified during this research session (access denied). The JWT-first recommendation is solid; evaluate OAuth complexity at implementation time.

---

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

---

## Project Structure Recommendation

```
edu-connect/
├── frontend/                    # Next.js 15 App Router
│   ├── app/
│   │   ├── (marketing)/         # Landing, about (static)
│   │   ├── (auth)/              # Login, signup, password reset
│   │   ├── (dashboard)/         # Student dashboard, profile
│   │   ├── colleges/            # Listings, detail, compare
│   │   ├── scholarships/        # Scholarship database
│   │   ├── exams/               # Entrance exam module
│   │   ├── careers/             # Career guidance hub
│   │   ├── guidance/            # Admission guidance hub
│   │   ├── blog/                # Blog/resource section
│   │   ├── counselors/          # Counselor booking
│   │   └── api/                 # Next.js Route Handlers (auth proxy)
│   ├── components/
│   │   ├── ui/                  # shadcn/ui copied components
│   │   ├── college/             # CollegeCard, CollegeGrid, CollegeFilter
│   │   ├── dashboard/           # ApplicationTracker, DeadlineCalendar
│   │   └── shared/              # Navbar, Footer, SearchBar
│   ├── lib/
│   │   ├── api.ts               # Typed fetch wrapper for Django API
│   │   ├── utils.ts             # cn() helper (shadcn standard)
│   │   └── types.ts             # Shared TypeScript types (College, User, etc.)
│   └── public/
│
├── backend/                     # Django 5.2 + DRF
│   ├── config/                  # Django project settings
│   ├── colleges/                # College model, serializers, views
│   ├── scholarships/            # Scholarship app
│   ├── exams/                   # Entrance exam app
│   ├── careers/                 # Career guidance content
│   ├── users/                   # Custom user model, auth
│   ├── blog/                    # Blog posts app
│   └── requirements.txt
│
└── docker-compose.yml           # PostgreSQL + Django + Next.js
```

---

## Full Installation Reference

### Frontend Bootstrap
```bash
npx create-next-app@latest frontend --typescript --eslint --app --tailwind --src-dir no
cd frontend

# Tailwind v4 (replaces v3 scaffolded by create-next-app if older CLI)
npm install tailwindcss@latest @tailwindcss/postcss postcss

# shadcn/ui
npx shadcn@latest init

# Forms + Validation
npm install react-hook-form zod @hookform/resolvers

# Theme
npm install next-themes

# Icons (comes with shadcn but explicit is better)
npm install lucide-react

# Optional: state management (add only if needed)
npm install zustand

# Optional: data fetching (add only if needed)
npm install @tanstack/react-query

# Dev tools
npm install -D prettier prettier-plugin-tailwindcss
```

### Backend Bootstrap
```bash
python -m venv venv && source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install django==5.2 djangorestframework djangorestframework-simplejwt \
    django-cors-headers django-filter drf-spectacular \
    Pillow psycopg2-binary python-decouple whitenoise

django-admin startproject config .
python manage.py startapp colleges
# ... repeat for each app
```

### PostgreSQL (local dev via Docker)
```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: educonnect
      POSTGRES_USER: educonnect
      POSTGRES_PASSWORD: devpassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

---

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

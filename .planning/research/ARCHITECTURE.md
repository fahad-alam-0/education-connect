# Architecture Patterns

**Domain:** Career Guidance & College Admission Platform
**Project:** EduConnect
**Researched:** 2026-04-03
**Confidence:** HIGH (sourced directly from BRD v2.0 + Next.js 14 / Django REST Framework known patterns)

---

## Recommended Architecture

EduConnect uses a **decoupled frontend/backend architecture** with two independently-deployed services communicating over a REST API. The frontend is a Next.js 14 App Router application on Vercel; the backend is a Django REST Framework (DRF) API on Railway/Render.

```
┌─────────────────────────────────────────────────────────┐
│  CLIENT LAYER (browser — desktop, tablet, mobile)        │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│  NEXT.JS FRONTEND  (Vercel)                              │
│                                                          │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │ Public Pages│  │  Auth Pages  │  │  Dashboards    │  │
│  │ (SSR/ISR)   │  │ (login etc.) │  │ (CSR behind    │  │
│  │             │  │              │  │  auth guard)   │  │
│  └─────────────┘  └──────────────┘  └────────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │           Shared UI Layer                        │    │
│  │  shadcn/ui + Tailwind CSS + Lucide icons         │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │           Data Layer                             │    │
│  │  TanStack Query (server state) + Zod (schemas)   │    │
│  │  Mock adapters (Phase 1) → real API (Phase 2+)   │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS / REST (JSON)
                           │ JWT Bearer tokens
┌──────────────────────────▼──────────────────────────────┐
│  DJANGO REST FRAMEWORK BACKEND  (Railway / Render)       │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │           API Router  /api/v1/                   │    │
│  │  auth · colleges · users · applications ·        │    │
│  │  scholarships · exams · blog · notifications ·   │    │
│  │  reviews · counselors · admin                    │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────┐  ┌───────────┐  ┌────────────────────┐  │
│  │ PostgreSQL  │  │   Redis   │  │   Celery Worker    │  │
│  │ (primary)   │  │ (cache +  │  │  (email reminders, │  │
│  │             │  │  broker)  │  │   deadline alerts) │  │
│  └─────────────┘  └───────────┘  └────────────────────┘  │
│                                                          │
│  ┌─────────────┐  ┌───────────┐  ┌────────────────────┐  │
│  │  S3 /       │  │  SendGrid │  │  Google OAuth      │  │
│  │  Cloudinary │  │  (email)  │  │  (django-allauth)  │  │
│  └─────────────┘  └───────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Next.js App (frontend)** | Rendering all UI, routing, auth token storage, client-side state, SEO meta | DRF API over REST; CDN for static assets |
| **DRF API** | Business logic, auth, data validation, query execution | PostgreSQL, Redis, Celery, third-party services |
| **PostgreSQL** | Persistent storage for all entities (colleges, users, applications, etc.) | DRF API only — never directly accessed by frontend |
| **Redis** | Session cache, TanStack Query-mirrored server cache, Celery task broker | DRF API, Celery workers |
| **Celery Workers** | Async background tasks: deadline reminders, email dispatch, notification fan-out | Redis (broker), PostgreSQL, SendGrid |
| **S3 / Cloudinary** | Binary file storage for user-uploaded documents, college images, avatars | DRF API (signed URLs generated server-side) |
| **SendGrid** | Transactional email (verification, password reset, deadline alerts) | Celery workers only |
| **Google OAuth** | Third-party identity verification | django-allauth on DRF backend |
| **Django Admin** | Built-in admin panel for content management — no separate build required | DRF backend directly (same Django process) |

---

## Frontend Component Breakdown

### Route Groups (Next.js App Router)

```
app/
├── (public)/                  # No auth required — SSR/ISR
│   ├── page.tsx               # Landing / Home
│   ├── colleges/
│   │   ├── page.tsx           # College listing
│   │   └── [slug]/page.tsx    # College detail
│   ├── compare/page.tsx       # Comparison tool
│   ├── admission-guides/      # Static content hub
│   ├── career-guidance/       # Career explorer + quiz
│   ├── scholarships/          # Scholarship listings
│   ├── exams/                 # Entrance exam listings
│   ├── blog/
│   │   ├── page.tsx           # Blog listing
│   │   └── [slug]/page.tsx    # Article detail
│   ├── counselors/            # Counselor listings
│   ├── about/
│   └── contact/
│
├── (auth)/                    # Auth flow pages
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   └── onboarding/page.tsx    # Profile setup wizard
│
├── (dashboard)/               # Protected — CSR with auth guard
│   ├── layout.tsx             # Dashboard shell + sidebar
│   ├── dashboard/page.tsx     # Overview / home
│   ├── profile/page.tsx
│   ├── applications/page.tsx  # Kanban tracker
│   ├── saved-colleges/page.tsx
│   ├── calendar/page.tsx      # Deadline calendar
│   ├── notifications/page.tsx
│   └── documents/page.tsx
│
├── (admin)/                   # Django built-in admin at /admin/
│   └── [handled by Django — not a Next.js concern]
│
└── api/                       # Next.js route handlers (if needed)
    └── auth/callback/route.ts # OAuth callback relay (optional)
```

### Shared Components

```
components/
├── layout/
│   ├── Navbar.tsx             # Responsive nav with hamburger
│   ├── Footer.tsx
│   ├── MobileBottomNav.tsx    # Sticky bottom nav on mobile
│   └── DashboardSidebar.tsx
├── ui/                        # shadcn/ui re-exports + custom
├── college/
│   ├── CollegeCard.tsx
│   ├── CollegeFilters.tsx
│   ├── CollegeDetailTabs.tsx
│   └── ComparisonTray.tsx     # Floating tray, up to 4 colleges
├── search/
│   └── GlobalSearch.tsx       # Autocomplete across all entities
├── notifications/
│   └── NotificationBell.tsx
└── auth/
    └── AuthGuard.tsx          # Route protection wrapper
```

---

## Data Flow

### Public Content Flow (SSR Path)

```
Browser request
  → Next.js server (SSR/ISR)
    → fetch() to DRF API (server-to-server, no CORS)
      → Django view → PostgreSQL query
      → Redis cache hit? Return cached response
    → HTML rendered with data, sent to browser
  → Browser hydrates React
```

Public pages (college listings, detail pages, blog) use Server Components + `fetch()` with revalidation (ISR). This gives SEO benefit and fast initial load without client-side waterfall.

### Authenticated Data Flow (CSR Path)

```
Dashboard page load
  → Auth guard checks JWT in localStorage / httpOnly cookie
  → TanStack Query fires API request with Bearer token
    → DRF validates JWT → returns user-specific data
  → React renders personalized UI
  → Subsequent actions (save college, update application)
    → optimistic update in TanStack Query cache
    → PATCH/POST to DRF API
    → cache invalidation on success
```

Dashboard and personal data use Client Components + TanStack Query for caching, optimistic updates, and background refetching.

### Write Operations Flow

```
User action (e.g. "Save College")
  → React event handler
  → TanStack Query mutation
    → POST /api/saved-colleges/
    → DRF validates request, writes to PostgreSQL
    → Returns 201 with created resource
  → TanStack Query invalidates 'saved-colleges' query key
  → UI updates (no manual state sync needed)
```

### Background Task Flow (Deadline Reminders)

```
Celery beat scheduler (daily cron)
  → Queries applications with deadlines in [1, 3, 7, 30] days
  → Enqueues notification tasks to Redis queue
  → Celery workers consume tasks:
    → Create Notification record in PostgreSQL
    → Send email via SendGrid
  → Frontend polls /api/notifications/unread-count/ every 60s
    → Badge updates on NotificationBell component
```

---

## Frontend-First Strategy

### Phase 1: Mock Data Layer

The frontend builds against **typed mock adapters** that match the exact shape of the real API contract. This allows the full UI to be built and demoed before the backend exists.

```
lib/
├── api/
│   ├── types.ts               # Zod schemas = API contract definition
│   ├── client.ts              # axios/fetch wrapper (swappable)
│   └── mock/
│       ├── colleges.ts        # Static JSON arrays matching College type
│       ├── blog.ts
│       ├── scholarships.ts
│       ├── exams.ts
│       └── index.ts           # Re-export all mocks
```

**Key rule:** All data-fetching code goes through `lib/api/client.ts`. The client reads `NEXT_PUBLIC_USE_MOCK=true` and either returns mock data or calls the real API. Zero component changes needed at backend integration time.

### Mock Data Strategy

| Data Type | Mock Approach | Notes |
|-----------|--------------|-------|
| College listings | 20–30 JSON objects with realistic data | Cover India + abroad, varied types |
| College detail | Full object per college including courses/fees | Enough for tab navigation to work |
| Blog posts | 10–15 articles with full content | Test category/tag filters |
| User / Auth | Fake JWT stored in localStorage, no server needed | Hardcode one student persona |
| Dashboard | Hardcoded applications in Kanban stages | Test all 8 status transitions |
| Notifications | Static array, mark-read updates local state only | Demonstrate unread badge |
| Career quiz | All questions + scoring logic in JSON | No API call needed at all |

### API Contract (Frontend Defines, Backend Implements)

TanStack Query keys match API route paths exactly. This makes the contract explicit:

```typescript
// lib/api/types.ts — Zod schema IS the contract
export const CollegeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  type: z.enum(['government', 'private', 'deemed', 'autonomous']),
  country: z.string(),
  city: z.string(),
  avg_rating: z.number(),
  total_reviews: z.number(),
  // ... full schema per BRD database design
})
export type College = z.infer<typeof CollegeSchema>

// useColleges hook — same code, real or mock
export function useColleges(filters: CollegeFilters) {
  return useQuery({
    queryKey: ['colleges', filters],
    queryFn: () => apiClient.get('/api/colleges/', { params: filters }),
  })
}
```

---

## Rendering Strategy by Page Type

| Page | Strategy | Reason |
|------|----------|--------|
| Home / Landing | ISR (revalidate: 3600) | SEO critical, data changes infrequently |
| College Listing | SSR + client-side filters | SEO for base URL, filters don't need SEO |
| College Detail | ISR per slug (revalidate: 1800) | SEO critical for each college page |
| Blog Listing | ISR (revalidate: 1800) | SEO, content published occasionally |
| Blog Article | ISR per slug (revalidate: 3600) | SEO + low write frequency |
| Scholarship / Exams | ISR (revalidate: 3600) | Date-sensitive but not real-time |
| Career Guidance Hub | Static (no revalidate) | Mostly static content |
| Student Dashboard | CSR (no SSR) | Auth-gated, personalized, no SEO value |
| Auth Pages | CSR | No SEO needed |
| Admin | Django Admin (separate from Next.js) | No frontend build cost |

---

## Suggested Build Order

### Stage 1: Foundation (Build First)
These have no dependencies on other components:

1. **Design system setup** — Tailwind config, shadcn/ui theme, typography scale, color tokens (light/dark)
2. **Layout shell** — Navbar, Footer, MobileBottomNav, responsive breakpoints
3. **Mock data layer** — `lib/api/types.ts` (Zod schemas), mock JSON files, `apiClient` with mock toggle
4. **Routing structure** — Create all route files with placeholder content; confirms navigation works

### Stage 2: Public Content Pages (High Visibility, No Auth)
These are the pages users see first and need for the demo:

5. **Landing page** — Hero, featured colleges carousel, stats, how-it-works, testimonials, latest blog
6. **College listing page** — Search bar, filter sidebar/sheet, sort, grid/list view, pagination
7. **College detail page** — Tabbed layout (Overview, Courses, Fees, Admissions, Placements, Reviews)
8. **Blog listing + article** — Category filters, featured posts, article detail
9. **Comparison tool** — ComparisonTray floater, comparison page table

### Stage 3: Auth + Identity
These unlock all personalized features:

10. **Auth pages** — Login, Register, Forgot Password (forms with React Hook Form + Zod)
11. **Mock auth** — Fake JWT flow, localStorage persistence, AuthGuard HOC
12. **Onboarding wizard** — 4-step profile setup (academic details → interests → preferences → test scores)

### Stage 4: Student Dashboard
Depends on Stage 3 (auth guard):

13. **Dashboard overview** — Stats cards, recent activity, quick actions
14. **Application tracker** — Kanban board with 8 status columns, drag-and-drop (optional)
15. **Saved colleges** — Grid with remove/compare actions
16. **Deadline calendar** — Monthly view with color-coded deadlines
17. **Notification center** — List view, mark-read, unread badge

### Stage 5: Secondary Content Modules
Lower priority, can run in parallel after Stage 2:

18. **Admission guidance hub** — Step guides by country/degree level
19. **Career guidance hub** — Career explorer, quiz logic, results page
20. **Scholarship database** — Listing + filter + detail
21. **Entrance exams** — Listing + detail + upcoming section

### Stage 6: Backend Integration (Phase 2)
Replace mock adapter with real API calls — no component changes:

22. **DRF project setup** — Django app scaffolding, PostgreSQL, JWT auth
23. **College API** — `GET /api/colleges/`, `GET /api/colleges/:slug/`
24. **Auth API** — Register, login, Google OAuth, email verification
25. **Dashboard APIs** — Applications, saved colleges, notifications
26. **Remaining APIs** — Blog, scholarships, exams, counselors, reviews

### Stage 7: Advanced Features (Phase 3)
These require backend to be fully functional:

27. **Document upload** — S3/Cloudinary integration via DRF
28. **Celery notifications** — Deadline reminder email pipeline
29. **Counselor booking** — Calendar availability, booking flow
30. **Reviews system** — Submit, moderate, helpful votes

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Mixing Server and Client Component Data Fetching
**What:** Calling the API from both Server Components and TanStack Query for the same data.
**Why bad:** Double fetch, cache incoherence, confusing data freshness story.
**Instead:** Server Components fetch + pass data as props for initial render; TanStack Query takes over on client only for mutations or real-time updates (notifications unread count).

### Anti-Pattern 2: Storing JWT in localStorage for Production
**What:** JWT access token in `localStorage`, vulnerable to XSS.
**Why bad:** Any injected script can steal the token.
**Instead:** For the frontend-first phase, `localStorage` is acceptable. At backend integration, store access token in memory and refresh token in an `httpOnly` cookie via a Next.js API route handler acting as a token relay.

### Anti-Pattern 3: Putting Business Logic in Components
**What:** Fee calculation, application status transitions, quiz scoring directly in React components.
**Why bad:** Duplicated when backend exists; hard to test; leaks into UI layer.
**Instead:** Isolate in `lib/utils/` functions and later mirror on the backend. The frontend utility is just the mock phase; the backend becomes the source of truth.

### Anti-Pattern 4: Single Django App for All Modules
**What:** Putting colleges, users, blog, scholarships all in one Django app.
**Why bad:** Becomes unmaintainable; circular imports; migrations become complex.
**Instead:** One Django app per bounded context: `apps/colleges`, `apps/users`, `apps/blog`, `apps/scholarships`, `apps/exams`, `apps/notifications`, `apps/counselors`.

### Anti-Pattern 5: Fetching Full College Objects in Listings
**What:** `/api/colleges/` returns the full college object including all courses, deadlines, reviews.
**Why bad:** Listing page only needs card data — 10x payload overhead, slow queries.
**Instead:** Use DRF serializer nesting: `CollegeListSerializer` (card fields only) vs `CollegeDetailSerializer` (full object). Keep them explicitly separate.

---

## Scalability Considerations

| Concern | Phase 1 (Dev/Demo) | Phase 2 (Production) |
|---------|-------------------|---------------------|
| College data volume | 30 mock records | PostgreSQL GIN index for full-text search |
| Concurrent users | Single Vercel serverless + single DRF instance | DRF behind gunicorn, horizontal scaling, Redis cache for college listings |
| Image delivery | Direct URLs in mock data | Cloudinary CDN with auto-WebP, lazy loading |
| Search performance | Client-side filter on mock array | PostgreSQL full-text search (`SearchVector`) + `django-filter` |
| Notification delivery | In-app only, polled every 60s | Celery beat for scheduled reminders, WebSocket upgrade for real-time (Phase 3) |
| Admin content management | Django admin panel (free, built-in) | Custom admin UI if Django admin becomes insufficient |

---

## Django App Boundaries

```
backend/
├── apps/
│   ├── users/          # User model, auth, profiles, parent-student links
│   ├── colleges/       # College, Course, AdmissionDeadline, SavedCollege
│   ├── applications/   # Application tracker
│   ├── blog/           # BlogPost, Category, Tag
│   ├── scholarships/   # Scholarship model
│   ├── exams/          # EntranceExam model
│   ├── reviews/        # Review model, helpful votes
│   ├── notifications/  # Notification model, Celery tasks
│   ├── counselors/     # Counselor profile, Booking
│   └── search/         # Cross-entity search endpoint
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── celery.py
└── manage.py
```

---

## Sources

- EduConnect BRD v2.0 (`/Users/kevin/Desktop/EDU-Connect/BRD.md`) — HIGH confidence: authoritative project specification
- Next.js 14 App Router documentation (router groups, Server/Client Components, ISR patterns) — HIGH confidence
- Django REST Framework patterns (serializer split, app-per-bounded-context) — HIGH confidence
- TanStack Query v5 patterns (queryKey conventions, optimistic updates) — HIGH confidence

# Research Summary: EduConnect

**Project:** EduConnect — Career Guidance & College Admission Platform
**Synthesized:** 2026-04-03
**Research Files:** STACK.md · FEATURES.md · ARCHITECTURE.md · PITFALLS.md

---

## Executive Summary

EduConnect is an India-first college discovery, admission guidance, and career planning platform targeting students aged 16–24. The reference competitive set (Shiksha, CollegeDunia, Collegevani) establishes the baseline feature expectations, but the domain has clear gaps — particularly around category-wise entrance exam cutoffs, kanban-style application tracking, and genuinely personalized college and scholarship matching. Research consistently points to a frontend-first monorepo approach: Next.js 15 App Router for the frontend (SSR/ISR for SEO-critical pages, CSR for the student dashboard) and Django 5.2 LTS + DRF for the backend REST API, communicating over JWT-authenticated HTTPS. The full UI can be built and demoed against typed mock data before the backend exists, which is the correct strategy for a 3-person student team.

The Indian market context is non-negotiable and shapes the product from the data model up: JEE/NEET/CAT/CUET exam linkage, NIRF rankings, INR fee display, category-wise cutoff tables (General/OBC/SC/ST/EWS), and LPA placement data are table-stakes features, not enhancements. Seventy percent of target users are on mobile, making 320px-up responsive layout a day-one constraint rather than a polish task. The recommended build sequence — Foundation → College Listings → Dashboard → Admission Guidance → Career Guidance → Backend Integration — ensures a working demo exists at every stage, with the "hero" demo (college discovery + comparison + application tracking) complete before secondary modules are started.

The top risk is scope explosion: the BRD covers 9 modules and 60+ requirements. Research is unanimous that attempting to build all modules in parallel produces a demo that "has everything" but nothing polished. The mitigation is strict sequential module completion and a hard deferral of Phase 2+ features (scholarship auto-match, counselor booking, JEE/NEET rank predictor, verified reviews) until the core discovery-and-tracking loop is fully functional.

---

## Key Findings

### From STACK.md

| Technology | Version | Rationale |
|------------|---------|-----------|
| Next.js | 15.2.x | App Router, ISR for SEO-critical college pages, stable Turbopack |
| React | 19.x | Ships with Next.js 15; `useActionState`/`useOptimistic` simplify forms |
| TypeScript | 5.x | Catches API shape mismatches at compile time — critical for a 3-person team |
| Tailwind CSS | 4.2.x | Rust-based Oxide engine; config now lives in CSS (`@import "tailwindcss"`) |
| shadcn/ui | latest CLI | Code-owned components via copy; Radix UI accessibility; Tailwind v4 supported |
| React Hook Form + Zod | 7.x / 3.x | Standard shadcn/ui form stack; shared schema for frontend + backend typing |
| Django | 5.2 LTS | Built-in admin panel satisfies content management requirement for free |
| Django REST Framework | 3.15.x | Serializers, viewsets, filtering — sufficient for all EduConnect API surfaces |
| djangorestframework-simplejwt | 5.x | Stateless auth between Next.js and Django; 15min access / 7-day refresh tokens |
| PostgreSQL | 16.x or 17.x | `ArrayField`, `JSONField`, full-text search, `pg_trgm` — needed for EduConnect's search requirements |
| Zustand | 5.x | Client-side state for college comparison tray only (not a blanket dependency) |
| TanStack Query | 5.x | Dashboard and interactive pages only; server components handle the rest |

**Critical version notes:**
- Tailwind v4 uses `@import "tailwindcss"` — not the v3 directives. Do not follow v3 tutorials.
- Next.js 15 GET route handlers and `fetch()` are **not** cached by default (changed from v14). Explicit `revalidate` values required.
- Do NOT use Redux Toolkit, MySQL, SQLite in production, or Auth.js v5 unless Google OAuth is required from day one.

### From FEATURES.md

**Must-have in MVP (Phase 1):**
1. College search with multi-faceted filter sidebar (country, state, course, college type, fee range, NIRF rank)
2. College detail page with tabbed layout (Overview / Courses / Fees / Admissions / Placements / Reviews)
3. Entrance exam module (JEE, NEET, CAT, CUET, SAT, GRE — calendar + eligibility + exam-to-college mapping)
4. User auth + student profile (board, marks, test scores)
5. Application tracker + deadline calendar (primary retention mechanism)
6. Admission guidance hub (country guides, document checklist)
7. Blog/resources (organic traffic engine)
8. Admin panel (content team cannot operate without it)

**Defer to Phase 2:**
- College comparison tool
- Scholarship database
- Reviews and ratings (needs user base to be credible)
- Counselor booking (high complexity)
- Career quiz

**Defer to Phase 3:**
- JEE/NEET rank predictor (requires multi-year cutoff dataset)
- Parent dashboard
- Scholarship auto-match
- Verified student reviews

**Anti-features (do not build in v1):**
Direct application submission, payment processing, native mobile app, community forum, real-time chat, visa document verification, AI chatbot, gamification with leaderboards, job board.

**Key differentiators available:**
- Category-wise cutoff tables (General/OBC/SC/ST/EWS) — competitors show aggregate only
- Kanban-style application tracker — competitors use flat tables
- Document checklist generator per college/country
- Counselor booking with actual calendar slots (not just callback requests)

### From ARCHITECTURE.md

**Pattern:** Decoupled frontend/backend. Next.js on Vercel, Django DRF on Railway/Render, PostgreSQL + Redis + Celery in backend.

**Rendering strategy by page type:**
- Home, college detail, blog: ISR (revalidate 1800–3600s) — SEO-critical
- College listing: SSR + client-side filter state via URL params
- Student dashboard: CSR behind auth guard — no SEO value, fully personalized
- Admin: Django built-in admin — zero frontend build cost

**Frontend-first strategy:** All data-fetching goes through `lib/api/client.ts`. A `NEXT_PUBLIC_USE_MOCK=true` flag switches between mock adapters (typed JSON files) and the real DRF API. Zero component changes at backend integration time. Zod schemas in `lib/api/types.ts` define the API contract — frontend defines it, backend implements it.

**Django app boundaries (one app per bounded context):**
`users` · `colleges` · `applications` · `blog` · `scholarships` · `exams` · `reviews` · `notifications` · `counselors` · `search`

**Suggested build stages:**
1. Foundation (design system, layout shell, mock data layer, routing)
2. Public content pages (landing, college listing, college detail, blog, comparison)
3. Auth + identity (login, register, onboarding wizard)
4. Student dashboard (Kanban tracker, saved colleges, calendar, notifications)
5. Secondary modules (admission guidance, career guidance, scholarships, exams)
6. Backend integration (replace mock adapter — no component changes)
7. Advanced features (document upload, Celery notifications, counselor booking, reviews)

### From PITFALLS.md

**Top 5 critical pitfalls:**

| # | Pitfall | Prevention | Phase |
|---|---------|------------|-------|
| 1 | Mock data shape diverges from real API schema | Type all mock data with TypeScript interfaces matching BRD Section 13 database schema from day one | Phase 1 — Foundation |
| 2 | Mobile layout broken by filter/comparison UI | Mobile-first from the start; filter panel as `Sheet` drawer on mobile; comparison limited to 2 on mobile | Phase 1, enforced every phase |
| 3 | App Router misuse — `"use client"` on every page | College/content pages must be Server Components; interactive islands (filters, save button) are Client Components nested inside | Phase 1 — Routing architecture |
| 4 | Comparison tool state lost on navigation | Zustand store at layout level + `localStorage` persistence — not `useState` inside a page | Phase 2 — Comparison feature |
| 5 | Scope explosion — all 9 modules built simultaneously | Sequential module completion: one module 100% done before starting the next | Roadmap — pre-development |

**Additional high-impact pitfalls:**
- Search bar underestimated: use `cmdk` for keyboard navigation, grouping, accessibility; build with a flat index of `{ id, type, title, url }` objects
- Dark mode must be set up in Phase 1 (next-themes + CSS variables) before any components are built — not retrofitted
- Deadline dates stored as UTC ISO strings with `date-fns-tz` display — never bare date strings
- Counselor booking is 3–5x more complex than it looks: mock UI only in Phase 2, real logic deferred to backend phase
- Auth gate should have a `NEXT_PUBLIC_DEMO_MODE=true` bypass during frontend-first phase
- College detail tabs must sync active tab to URL hash — not local `useState`
- Use URL params (`useSearchParams` + `router.push`) for filter state — not React state

---

## Implications for Roadmap

Research across all 4 files consistently supports the following phase structure. Phase ordering is driven by: dependency graph (auth before dashboard; college data before comparison), demo readiness at each stage, and pitfall mitigation (foundation must be correct before feature work begins).

### Suggested Phase Structure

**Phase 1: Foundation and Infrastructure**
- Design system (Tailwind v4 config, shadcn/ui init, dark mode tokens, typography scale)
- Layout shell (Navbar, Footer, MobileBottomNav with responsive breakpoints)
- Mock data layer (Zod schemas = API contract, typed mock JSON files, `apiClient` with mock toggle)
- Full routing tree (all route files with placeholders — slug-based URLs decided now)
- Demo mode bypass (env variable to skip auth for testing)
- Pre-commit hooks (ESLint, Prettier, Tailwind class sorting)

**Rationale:** All pitfalls related to wrong rendering mode, dark mode setup, mock schema divergence, and routing inconsistency are Phase 1 problems. Getting these wrong invalidates work in every subsequent phase.

**Deliverable:** Navigable skeleton with correct rendering strategy, mock data infrastructure, and mobile-responsive layout shell.
**Research flag:** Standard patterns — no additional research needed.

---

**Phase 2: College Discovery (Hero Demo)**
- Landing page (hero, featured colleges, stats, blog preview)
- College listing page (search bar, filter sidebar as Sheet on mobile, sort, pagination, `<Image>` components)
- College detail page (tabbed layout with URL hash sync, all 6 tabs with mock data)
- College comparison tool (Zustand store, `localStorage` persistence, mobile-limited to 2)
- Entrance exam module (calendar, exam detail, exam-to-college mapping)

**Rationale:** This is the "hero" demo — college discovery is the core product loop. Nothing else matters if discovery is weak. Entrance exam module drives repeat visits more than any other feature in the Indian market.

**Deliverable:** A student can discover, filter, compare, and research colleges entirely within the platform.
**Research flag:** Standard patterns — college listing and tab patterns are well-documented.

---

**Phase 3: Auth and Student Dashboard**
- Auth pages (login, register, forgot password — React Hook Form + Zod)
- Onboarding wizard (4-step profile setup: board, marks, test scores, preferences)
- Dashboard overview (stats cards, recent activity)
- Application tracker (Kanban board, 8 status columns)
- Saved colleges (grid with remove/compare actions)
- Deadline calendar (UTC-based dates, `date-fns-tz`, color-coded urgency)
- Notification center (unread badge, mark-read)

**Rationale:** Auth unlocks all personalized features. Dashboard is the primary retention mechanism after signup. Must come after the public content (Phase 2) so there is something worth saving and tracking.

**Deliverable:** A student can create an account, track applications, bookmark colleges, and see deadlines.
**Research flag:** Standard patterns for auth and dashboard. Calendar timezone handling may need targeted research.

---

**Phase 4: Content Modules**
- Admission guidance hub (step-by-step guides by country and degree level, document checklist generator)
- Blog/resources (listing, article detail, category navigation, SEO metadata)
- Career guidance hub (career explorer, quiz with "exploratory" disclaimer)
- Scholarship database (listing + filter + detail)

**Rationale:** These are high SEO value, relatively low code complexity, and can run after the core discovery-and-tracking loop is solid. Blog and admission guides drive organic traffic from day one; career quiz is a differentiator but depends on profile data.

**Deliverable:** Platform has content depth that drives organic search traffic and positions it as a trusted resource.
**Research flag:** Career quiz requires thought on psychometric validity — present as exploratory, not algorithmic, to avoid trust damage.

---

**Phase 5: Backend Integration**
- DRF project setup (Django 5.2, PostgreSQL, simplejwt, CORS, drf-spectacular)
- College API (`GET /api/colleges/`, `GET /api/colleges/:slug/` with list vs detail serializers)
- Auth API (register, login, email verification, Google OAuth if required)
- Dashboard APIs (applications, saved colleges, notifications)
- Remaining APIs (blog, scholarships, exams, counselors)
- Replace mock `apiClient` with real API — zero component changes if Phase 1 foundation is correct

**Rationale:** The frontend-first approach means backend integration is a swap-in, not a rebuild. DRF serializer split (list vs detail) must be enforced from the start to avoid N+1 and payload issues.

**Deliverable:** Full-stack platform with live data. Admin panel operational for content team.
**Research flag:** Needs `/gsd:research-phase` for backend deployment configuration (Render/Railway setup, Gunicorn, environment variables, PostgreSQL connection pooling).

---

**Phase 6: Advanced Features**
- Counselor booking (mock-only UI in Phase 2 is replaced with real slot generation and conflict detection)
- Document upload (S3/Cloudinary integration via DRF signed URLs)
- Celery deadline reminders (email pipeline via SendGrid)
- Reviews system (submit, moderate, helpful votes)
- Global search (PostgreSQL full-text search + `pg_trgm` across all entities)

**Rationale:** These require backend to be fully functional and stable. Counselor booking is 3–5x more complex than it appears — must not be attempted before Phase 5 is complete. Reviews need a real user base to be credible.

**Deliverable:** Platform is production-ready with async notifications, file uploads, and real counselor scheduling.
**Research flag:** Needs `/gsd:research-phase` for Celery + Redis setup, S3 signed URL patterns, and review moderation workflow.

---

## Research Flags

| Phase | Research Needed? | Reason |
|-------|-----------------|--------|
| Phase 1: Foundation | No — standard patterns | Next.js + shadcn/ui + Tailwind v4 setup is documented |
| Phase 2: College Discovery | No — standard patterns | SSR/ISR college listings + tab patterns are well-documented |
| Phase 3: Auth + Dashboard | No (mostly) | Standard auth + dashboard patterns. Calendar timezone: minor targeted research |
| Phase 4: Content Modules | No — standard patterns | Blog + static content with Next.js ISR is well-understood |
| Phase 5: Backend Integration | YES | Deployment (Render/Railway), Gunicorn config, PostgreSQL tuning, DRF pagination |
| Phase 6: Advanced Features | YES | Celery + Redis setup, S3 signed URLs, review moderation, search indexing |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core technologies (Next.js 15, React 19, Tailwind v4, Django 5.2) confirmed from official docs. DRF version and shadcn/ui Tailwind v4 compatibility are MEDIUM — verify on first install. |
| Features | MEDIUM | Indian market domain knowledge is HIGH confidence. Platform feature audit (Shiksha, CollegeDunia) based on training data — live audit would upgrade to HIGH. |
| Architecture | HIGH | Sourced from BRD v2.0 + well-documented Next.js App Router and DRF patterns. Frontend-first mock strategy is established practice. |
| Pitfalls | HIGH | Derived from BRD analysis and known Next.js App Router failure modes. Domain-specific pitfalls (fee display, ranking ambiguity, data staleness) are accurate for the education sector. |

**Overall: MEDIUM-HIGH.** Sufficient confidence to proceed to roadmap creation. No blocking gaps.

### Gaps to Address During Development

1. **DRF exact version:** Run `pip install djangorestframework` at project start and pin the actual version in `requirements.txt`.
2. **shadcn/ui + Tailwind v4:** Validate compatibility by running `npx shadcn@latest init` and confirming it prompts for Tailwind v4.
3. **Auth.js v5 status:** If Google OAuth is required from day one, re-evaluate Auth.js v5 App Router compatibility before committing to the manual JWT path.
4. **Career quiz validity:** Decide before Phase 4 whether the quiz will use a validated psychometric model or be presented as exploratory. A fake-authoritative quiz destroys trust.
5. **Data sourcing strategy:** JEE/NEET cutoff data, NIRF rankings, and college fee structures need a sourcing plan (web scraping, manual curation, official APIs). This is a content problem, not a code problem, but it blocks Phase 2 completeness.
6. **Deployment target:** Vercel (frontend) + Render or Railway (backend) is assumed. Confirm team access and free-tier limits before Phase 5.

---

## Sources

| Source | Confidence | Used In |
|--------|------------|---------|
| https://nextjs.org/blog/next-15-2 | HIGH | STACK.md |
| https://nextjs.org/blog/next-15 | HIGH | STACK.md |
| https://react.dev/blog/2024/12/05/react-19 | HIGH | STACK.md |
| https://tailwindcss.com/docs/guides/nextjs | HIGH | STACK.md |
| https://docs.djangoproject.com/en/5.2/releases/5.2/ | HIGH | STACK.md |
| EduConnect BRD v2.0 | HIGH | FEATURES.md, ARCHITECTURE.md, PITFALLS.md |
| Shiksha.com feature audit | MEDIUM | FEATURES.md |
| CollegeDunia.com feature audit | MEDIUM | FEATURES.md |
| Niche.com / CollegeBoard / Unigo feature audit | MEDIUM | FEATURES.md |
| Indian education domain (JEE/NEET/CAT/NIRF/LPA) | HIGH | FEATURES.md |
| Next.js App Router patterns (Server/Client Components, ISR) | HIGH | ARCHITECTURE.md, PITFALLS.md |
| Django REST Framework patterns (serializer split, app boundaries) | HIGH | ARCHITECTURE.md |
| TanStack Query v5 patterns | HIGH | ARCHITECTURE.md |
| Edtech platform failure modes (Shiksha, CollegeDunia, Common App) | MEDIUM | PITFALLS.md |

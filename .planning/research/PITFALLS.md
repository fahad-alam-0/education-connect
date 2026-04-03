# Domain Pitfalls: EduConnect

**Domain:** College listing + career guidance platform (education/edtech)
**Project:** EduConnect — Next.js 14 / React 18 / Tailwind CSS / shadcn/ui
**Team:** 3 BCA students, frontend-first with mock data
**Researched:** 2026-04-03
**Confidence:** HIGH (based on domain analysis, BRD deep-read, Next.js App Router patterns)

---

## Critical Pitfalls

Mistakes that cause rewrites, scope collapse, or demo failures.

---

### Pitfall 1: Mock Data Structure Does Not Match Real Schema

**What goes wrong:** Teams build mock data as flat, ad-hoc JS objects to "get the UI working fast." When the real database schema arrives (PostgreSQL with relational structure), the component props, filter logic, and URL params all need to be rewritten because the shape changed.

**Why it happens:** Mock data is designed around "what looks good on screen" rather than "what shape will the API return."

**Consequences:**
- College card component expects `college.name` but API returns `college.institution_name`
- Filter logic that works against an in-memory array breaks entirely against paginated API responses
- Comparison tool built on array indices fails when switching to ID-based references

**Prevention:**
- Define a canonical mock schema before writing any component. Match field names and nesting to the BRD database schema (Section 13). Example: use `fees.tuition_inr` not `tuitionFee`.
- Use TypeScript interfaces for all mock data shapes from day one. Even without a backend, type the data.
- Store mock data in `/src/data/` as typed `.ts` files, not inline inside components.

**Warning signs:**
- Mock data is defined inline inside the component file
- Field names differ across different mock arrays (e.g., `name` in one, `collegeName` in another)
- Comparison feature works by array position rather than by `college.id`

**Phase:** Address in Phase 1 (Foundation), before any feature module is built.

---

### Pitfall 2: Mobile Layout Broken by Complex Filter/Comparison UI

**What goes wrong:** The college filter panel (country, course, fees, type) and the comparison tray (4 colleges side-by-side) are designed desktop-first. On 320px–767px screens they overflow horizontally or stack unreadably. 70% of the target users (students) are on mobile.

**Why it happens:** Teams build on laptop screens and only check mobile at the end. Filter panels with checkboxes and range sliders are especially hard to retrofit.

**Consequences:**
- Horizontal scroll appears on listing page (violates NFR-02.5: no horizontal scroll)
- Comparison table with 4 columns is unreadable on mobile
- Filter panel overlaps content or blocks scroll

**Prevention:**
- Start every new page/component with the 375px mobile layout first, then scale up.
- For the filter panel: build as a slide-out drawer on mobile (`Sheet` from shadcn/ui), inline panel on desktop. Do not build a collapsible sidebar and try to adapt it.
- For the comparison table: on mobile, stack colleges vertically (one card per column) with a sticky row header, not a horizontal scroll. Or limit comparison to 2 on mobile.
- Use Tailwind's `sm:`, `md:`, `lg:` prefixes consistently — never write a style without considering the mobile version first.

**Warning signs:**
- A component file has no `sm:` or `md:` class variants
- The comparison table uses `grid-cols-4` without a mobile fallback
- Filter panel is built as a `<aside>` with fixed width

**Phase:** Address in Phase 1 (Foundation/Layout) and enforced in every subsequent phase.

---

### Pitfall 3: Next.js App Router Misuse — Wrong Rendering Mode Per Route

**What goes wrong:** Teams new to Next.js 14 App Router default everything to Client Components (`"use client"`) to make interactivity work. This kills SEO for college listing pages and detail pages, which are the core product value.

**Why it happens:** State (filters, search, saved colleges) feels like it requires client components. Teams add `"use client"` to fix an error and never reconsider it.

**Consequences:**
- College listing pages rendered entirely on the client — blank page on initial load, no SEO
- College detail pages not indexable by search engines (a major loss for an education platform)
- Core Web Vitals suffer: TTI bloats because large JS bundles must load before anything renders

**Prevention:**
- Rule: every page that shows college data or educational content must be a Server Component by default.
- Interactive islands (search bar, filter sidebar, comparison tray, save button) are Client Components nested inside Server Component pages.
- Use the pattern: `page.tsx` (server) renders a static shell + passes data as props to `<CollegeFilters />` (client) and `<CollegeGrid data={colleges} />` (server).
- URL-based state for filters: `?country=india&type=private` — Server Component reads `searchParams`, no client state needed for the listing query.

**Warning signs:**
- `"use client"` at the top of a `page.tsx` file
- `useEffect` fetching college data on the client when it could be a server fetch
- Filter state stored in `useState` instead of URL params (`useSearchParams` + `router.push`)

**Phase:** Address in Phase 1 (Routing architecture), enforced in Phase 2 (College listings).

---

### Pitfall 4: Comparison Tool State Lost on Navigation

**What goes wrong:** The comparison tray (up to 4 colleges) is implemented with React state inside a component. When a user navigates to a college detail page and comes back, the comparison list is empty. This is a known UX killer for comparison-heavy platforms.

**Why it happens:** `useState` does not persist across navigation in Next.js App Router unless the component is kept mounted.

**Consequences:**
- Users have to re-select colleges for comparison every time they navigate
- Comparison tray appears broken to users, reducing trust

**Prevention:**
- Store comparison state in a Zustand store (or React Context at layout level) so it persists during the browser session.
- Persist to `localStorage` so it survives page refresh.
- Expose comparison state from a layout-level provider, not from a page-level component.

**Warning signs:**
- `useState` for the comparison list inside a page component
- Comparison tray component is mounted inside `page.tsx` instead of `layout.tsx`
- No `localStorage` sync in the comparison store

**Phase:** Address in Phase 2 (College comparison feature).

---

### Pitfall 5: Scope Explosion — Building All 9 Modules Before Any Works Well

**What goes wrong:** The BRD lists 9 modules with 60+ requirements. Teams try to scaffold all modules simultaneously: placeholder pages for everything, partial implementations everywhere. The result is a demo that "has everything" but nothing is polished enough to show quality.

**Why it happens:** BCA project evaluation often rewards breadth (number of features shown) over depth. Teams interpret the BRD as a checklist to tick off.

**Consequences:**
- No module reaches a state where it demonstrates real value
- Critical interactions (search, filter, compare, dashboard) are incomplete
- Frontend-first approach collapses because mock data is different per half-finished module

**Prevention:**
- Build one module to full visual completeness before starting the next.
- Sequence: Foundation → College Listings (search + filter + detail) → Dashboard → Admission Guidance → Career Guidance → Everything else.
- College listings + college detail + comparison is the "hero" demo — that should be 100% complete before touching scholarships, exams, or counselor booking.
- Use the "Should Have" / "Could Have" BRD priorities strictly. Phase 1 is Must Have only.

**Warning signs:**
- More than 3 modules in active development simultaneously
- Any module has a page that just says "Coming Soon"
- No module has been reviewed end-to-end in the browser at mobile viewport

**Phase:** Roadmap planning (pre-development). Phase sequencing decision.

---

### Pitfall 6: Search Bar Built Without Considering Its Complexity

**What goes wrong:** The global search with autocomplete (FR-14) looks like a simple input field. Teams build a basic `<input>` and add a `onChange` handler. By Phase 2 they discover autocomplete needs:
- Debounced queries (or mock index)
- Grouped results (colleges vs. articles vs. exams)
- Keyboard navigation (↑↓ Enter Esc)
- Mobile-friendly dropdown that doesn't get covered by the virtual keyboard

All of this is much harder to retrofit than to design upfront.

**Why it happens:** Search is treated as a UI detail, not a feature with its own complexity budget.

**Consequences:**
- Autocomplete rewritten 2–3 times
- Keyboard navigation never implemented
- Mobile: dropdown hidden behind keyboard

**Prevention:**
- Use `cmdk` (Command Menu, used internally by shadcn/ui) for the search command palette. It handles keyboard navigation, grouping, and accessibility out of the box.
- Plan the search data structure with mock data: a flat index of `{ id, type, title, subtitle, url }` objects covering all entities.
- On mobile: implement as a full-screen overlay (like iOS Spotlight) not an inline dropdown.

**Warning signs:**
- Search is implemented as an uncontrolled `<input>` with no debounce
- Results are not grouped by category
- No keyboard navigation tested

**Phase:** Address in Phase 2 (College listings search) with the architecture that Phase 3 (global search) will extend.

---

## Moderate Pitfalls

---

### Pitfall 7: College Detail Page Tab State Causes Janky Navigation

**What goes wrong:** College detail page has 6 tabs (Overview, Courses, Fees, Admissions, Placements, Reviews). Teams implement tabs with local `useState`. When a user shares a link to the "Fees" tab, the recipient lands on "Overview."

**Prevention:**
- Sync active tab to the URL hash: `/colleges/iit-bombay#fees`
- Use shadcn/ui `Tabs` with controlled value, read/write from `useSearchParams` or `router.replace` with a hash.

**Phase:** Phase 2 (College detail page).

---

### Pitfall 8: Deadline Calendar Skips Time Zone Handling

**What goes wrong:** Admission deadlines stored as date strings (`"2026-12-15"`) without timezone context. A student in India (IST +5:30) may see a deadline as "tomorrow" when it is "today" for the US college posting it.

**Prevention:**
- Store all deadlines as UTC ISO strings in mock data.
- Use `date-fns-tz` or `Intl.DateTimeFormat` to display in user's local timezone.
- Never use `new Date("2026-12-15")` without explicit timezone — this is a known JS gotcha (parses as UTC midnight, displays as the day before in IST).

**Phase:** Phase 2 (Student dashboard, deadline calendar).

---

### Pitfall 9: Dark Mode Implemented as an Afterthought

**What goes wrong:** The BRD requires dark/light theme support. Teams build the entire UI in light mode and then add dark mode at the end. Tailwind `dark:` classes need to be added to every single element — this is a full second pass through all components.

**Prevention:**
- Set up `next-themes` provider and configure shadcn/ui for dark mode in Phase 1 before building any components.
- Add `dark:` variants alongside light mode variants as components are built, not after.
- Test both modes on every screen during development, not at the end.

**Warning signs:**
- Dark mode toggle exists but large sections of the UI remain white/unreadable
- `dark:` classes appear on some components but not others

**Phase:** Phase 1 (Foundation/theming setup). Non-negotiable prerequisite.

---

### Pitfall 10: Image Handling Breaks Performance on College Listings

**What goes wrong:** College listing page shows 20+ college cards, each with a logo image. Teams use `<img>` tags with external URLs or large uncompressed images. Result: listing page loads slowly, especially on mobile.

**Prevention:**
- Use Next.js `<Image>` component everywhere. It handles WebP conversion, lazy loading, and proper sizing automatically.
- For college logos in cards: set `width={80} height={80}` and `loading="lazy"`.
- For hero images: use `priority={true}` only on the above-the-fold image.
- Mock image data should use placeholder services (e.g., `https://picsum.photos/`) with consistent dimensions.

**Warning signs:**
- `<img src=...>` tags instead of `<Image>` from `next/image`
- College logos have no fixed width/height (causes layout shift = bad CLS score)
- All images load eagerly

**Phase:** Phase 2 (College listings) and enforced in all phases.

---

### Pitfall 11: Authentication Flow Blocks Mock Data Demo

**What goes wrong:** Teams implement auth (login/register) early and gate the entire student dashboard behind it. During demos and testing, every team member must create accounts and log in. Mock data can't be browsed without auth.

**Prevention:**
- For the frontend-first phase: build all dashboard pages with mock data and a "demo user" context. Auth gate is a wrapper that can be bypassed with a flag.
- Implement a `NEXT_PUBLIC_DEMO_MODE=true` env variable that skips auth checks and uses a hardcoded mock user.
- Build auth UI (login/register pages) as static visual pages first. Wire actual auth logic in a dedicated backend phase.

**Warning signs:**
- Student dashboard is unreachable without a real account
- Demo prep requires creating live accounts before every presentation

**Phase:** Phase 1 (set up demo mode bypass), auth integration deferred to backend phase.

---

### Pitfall 12: Counselor Booking Calendar Is Severely Underestimated

**What goes wrong:** Calendar slot booking (FR-12) looks like a simple UI feature — show available times, let user pick. In reality it requires: slot generation logic, conflict detection, timezone-aware display, state management for "already booked" slots, and eventually backend integration. Teams underestimate by 3–5x.

**Prevention:**
- For the frontend-first phase: use a completely mock implementation. Pre-generate a fixed set of available slots as mock data. No real booking logic.
- Do not use a full calendar library (react-big-calendar) for the booking view — it is overkill for slot selection. Use a simple date picker + time slot grid.
- Defer all real booking logic (conflict detection, notifications, video links) to the backend phase.

**Phase:** Phase 3 or later. Mark explicitly as "mock UI only" in Phase 2.

---

## Minor Pitfalls

---

### Pitfall 13: shadcn/ui Component Overrides Cause Inconsistency

**What goes wrong:** shadcn/ui components are copied into `/components/ui/`. Team members customise individual copies differently (one changes the Button radius, another changes it differently). The UI becomes visually inconsistent.

**Prevention:**
- All global token changes (colors, radius, fonts) go in `tailwind.config.ts` and `globals.css` CSS variables only. Never modify the shadcn component files directly for cosmetic changes.
- Establish a `components/ui/` rule: these files are never directly edited. Customization is done via `className` props and Tailwind variants.

**Phase:** Phase 1 (design system setup).

---

### Pitfall 14: Routing Structure Not Planned Before Building

**What goes wrong:** Teams add pages as needed without planning the full route tree. Results: inconsistent URL patterns (`/college/123` vs `/colleges/iit-bombay`), duplicate layouts, middleware that doesn't cover all auth-required routes.

**Prevention:**
- Define the full route tree in a document before coding Phase 1. Decide: slug-based URLs (SEO-friendly: `/colleges/iit-bombay-mumbai`) vs ID-based (`/colleges/123`). Decide at the start — changing later breaks links and sitemap.
- Use Next.js App Router's `layout.tsx` hierarchy deliberately: one layout for public pages, one for dashboard, one for admin.

**Phase:** Phase 1 (routing architecture).

---

### Pitfall 15: Pagination and Infinite Scroll Conflict

**What goes wrong:** The BRD specifies "pagination and infinite scroll" (FR-02.15) as if they are the same feature. They are two different UX patterns with different state management implications. Teams often implement both partially, resulting in a broken experience.

**Prevention:**
- Pick one pattern per page. Recommendation: standard pagination for the college listing page (better for bookmarking, sharing, SEO). Infinite scroll is acceptable for blog/articles feed.
- Paginated listings: URL-based page state (`?page=2`), so back-button navigation returns to the correct page.
- Do not mix infinite scroll with URL-based filters — the scroll position + filter state interaction is extremely complex.

**Phase:** Phase 2 (College listings).

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1: Foundation & routing setup | Wrong rendering mode (Client vs Server) locked in early | Define route rendering strategy document before first commit |
| Phase 1: Design system / theming | Dark mode added too late | Set up `next-themes` + CSS variables before first component |
| Phase 1: Mock data setup | Ad-hoc schema diverges from BRD database schema | Type all mock data with TypeScript interfaces matching BRD Section 13 |
| Phase 2: College listings | `<img>` instead of `<Image>`, no lazy loading | Enforce `<Image>` from `next/image` in component templates |
| Phase 2: College detail page | Tab state not URL-synced | Implement hash-based tab routing from the start |
| Phase 2: Search/filter | Filter state in `useState` instead of URL params | Use `useSearchParams` + `router.push` for all filter state |
| Phase 2: Comparison tool | State lost on navigation | Zustand store + `localStorage` before building comparison UI |
| Phase 2: Student dashboard | Auth gate blocks demo | Demo mode bypass via env variable |
| Phase 3: Deadline calendar | Timezone bugs | Use UTC storage + `date-fns-tz` for all date display |
| Phase 3: Counselor booking | Complexity 5x underestimated | Mock-only implementation, defer real logic to backend phase |
| All phases: Mobile responsiveness | Desktop-first design breaks at 320px | Mobile-first Tailwind classes, check 375px viewport on every component |
| All phases: Scope | Too many modules in parallel | Sequential module completion, one module 100% before next starts |

---

## Education Domain-Specific Warnings

These are unique to college/admission platforms and often missed by student teams.

### Data Staleness Problem
College admission deadlines, fee structures, and cutoffs change every year. If the platform looks authoritative but contains stale data, it harms users making real decisions. For a frontend-first demo: add a "Data last updated: [date]" badge on college cards. Train the habit of timestamping educational data.

### Fee Display Complexity
Indian college fees are shown in INR; international colleges in USD/GBP/CAD/AUD. The platform covers both. A "fees" column in comparisons needs currency normalization or it will show INR 2,00,000 alongside USD 45,000 with no context. Plan for: currency display format, INR lakh formatting (`₹2.5L`), and a disclaimer that fees are indicative.

### Ranking Number Ambiguity
NIRF rank #5 means very different things from QS rank #5. Displaying a single "Rank: 5" without specifying the ranking body is misleading. Always store and display `{ rank_value, rank_body, rank_year }` as a tuple, never a bare number.

### Career Quiz Without Validation
A skill assessment quiz that maps to career paths is listed (FR-05.2, FR-05.9). Without a validated psychometric model behind it, it will produce obviously random results and destroy user trust. For the frontend-first phase: present it as "exploratory" with a clear disclaimer. Do not present AI/algorithm-based recommendations without backend logic to back them up.

---

## Sources

- EduConnect BRD v2.0 (primary source for feature scope and module complexity)
- Next.js 14 App Router documentation patterns (Server vs Client Component decision tree)
- Domain analysis of edtech platforms: Shiksha, CollegeDunia, Common App, Unigo — common UX failure modes
- Confidence: HIGH for domain pitfalls (derived from BRD analysis). MEDIUM for Next.js-specific pitfalls (based on known App Router patterns as of August 2025, verify against current Next.js changelog if project starts after 2025-Q4).

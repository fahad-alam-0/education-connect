# Roadmap: EduConnect

## Overview

EduConnect delivers a career guidance and college admission platform for students in India and abroad. Phase 1 (the full frontend UI with mock data) is already built — working pages exist for every major section. The remaining work is: wiring real authentication and personalization (Phase 2), replacing mock data with a live Django/PostgreSQL backend (Phase 3), and connecting the admin panel plus search layer (Phase 4).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation + Frontend UI** - All pages built with mock data, responsive design complete
- [ ] **Phase 2: Auth + Personalized Dashboard** - Real authentication, working dashboard, application tracker
- [ ] **Phase 3: Backend Integration** - Django DRF API live, mock data replaced, full-stack working
- [ ] **Phase 4: Admin + Search** - Django admin panel, global search, production polish

## Phase Details

### Phase 1: Foundation + Frontend UI
**Goal**: Every page of the platform is navigable in a browser with realistic mock data and responsive design
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, COLL-01, COLL-02, COLL-03, COLL-04, COLL-05, COLL-06, COLL-07, COLL-08, COLL-09, COLL-10, EXAM-01, EXAM-02, EXAM-03, ADMN-01, ADMN-02, ADMN-03, ADMN-04, ADMN-05, CARE-01, CARE-02, CARE-03, CARE-04, BLOG-01, BLOG-02, BLOG-03, BLOG-04, SCHOL-01, SCHOL-02, SCHOL-03, RESP-01, RESP-02, RESP-03, RESP-04, RESP-05
**Success Criteria** (what must be TRUE):
  1. User can navigate to every page (landing, colleges, college detail, exams, admissions, careers, scholarships, blog, dashboard, login) without errors
  2. College listing page shows cards with working search, filter, and sort using mock data
  3. College detail page renders all 6 tabs (Overview, Courses, Fees, Admissions, Placements, Reviews)
  4. All pages render correctly on 320px mobile and 1440px desktop with no horizontal scroll
  5. Dark/light theme toggle works across all pages
**Plans**: TBD
**UI hint**: yes

**Note:** Phase 1 is mostly complete. COLL-09 (comparison tool) and COLL-10 (save/bookmark) are partial and will be finalized at the start of Phase 2.

### Phase 2: Auth + Personalized Dashboard
**Goal**: Users can create accounts, log in, and use the dashboard as a real personalized tool — not a static mockup
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06, SCHOL-04
**Success Criteria** (what must be TRUE):
  1. User can sign up with email/password and sign in with Google OAuth
  2. User session persists across browser refresh and logout clears the session
  3. User can create and edit a student profile (academics, interests, test scores)
  4. User can add colleges to an application tracker and update status (Researching → Applied → Accepted/Rejected)
  5. User can see a deadline calendar and notification center with real saved data
**Plans**: TBD
**UI hint**: yes

### Phase 3: Backend Integration
**Goal**: The platform runs on a live Django/PostgreSQL backend — all data is real, persistent, and API-served
**Depends on**: Phase 2
**Requirements**: FOUND-03 (real API replaces mock layer), AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, DASH-01, DASH-02, DASH-03, DASH-04, DASH-05, DASH-06, COLL-01, COLL-02, COLL-03, COLL-04, COLL-05, COLL-06, COLL-07, COLL-08, COLL-09, COLL-10, EXAM-01, EXAM-02, EXAM-03, BLOG-01, BLOG-02, BLOG-03, SCHOL-01, SCHOL-02, SCHOL-03, SCHOL-04
**Success Criteria** (what must be TRUE):
  1. All college, exam, blog, and scholarship data is served from Django DRF API endpoints (not mock files)
  2. User accounts and dashboard data persist in PostgreSQL across sessions and devices
  3. The Next.js frontend switches from mock to real API by changing one environment variable (NEXT_PUBLIC_USE_MOCK=false)
  4. Django admin panel is operational — admin can add/edit colleges and blog posts

**Note:** AUTH and DASH requirements re-appear here in the sense that they now use real backend persistence. The ADMIN-01/02/03 requirements belong to this phase. Listed separately below for clarity.
**Plans**: TBD

### Phase 4: Admin + Search + Polish
**Goal**: The platform is production-ready with content management, global search, and all remaining gaps closed
**Depends on**: Phase 3
**Requirements**: ADMIN-01, ADMIN-02, ADMIN-03, FOUND-05 (global search fully wired), BLOG-04, COLL-09, COLL-10
**Success Criteria** (what must be TRUE):
  1. Admin can manage colleges, blog posts, and users via Django admin panel
  2. Global search bar returns relevant results across colleges, exams, scholarships, and blog articles
  3. User can share a blog article via a copy-link action
  4. College comparison tool persists across navigation (up to 4 colleges, 2 on mobile)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation + Frontend UI | -/- | Complete (mostly) | 2026-04-03 |
| 2. Auth + Personalized Dashboard | 0/TBD | Not started | - |
| 3. Backend Integration | 0/TBD | Not started | - |
| 4. Admin + Search + Polish | 0/TBD | Not started | - |

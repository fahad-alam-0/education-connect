# Requirements: EduConnect

**Defined:** 2026-04-03
**Core Value:** Students can discover, compare, and track college admissions in one place.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUND-01**: Project scaffolded with Next.js 15+ App Router, Tailwind CSS, shadcn/ui
- [ ] **FOUND-02**: Responsive layout shell (navbar, footer, mobile hamburger menu) works 320px-1440px+
- [ ] **FOUND-03**: Mock data layer with TypeScript interfaces matching BRD database schema
- [ ] **FOUND-04**: All route paths defined with SEO-friendly slugs
- [ ] **FOUND-05**: Global search bar accessible from all pages

### College Discovery

- [ ] **COLL-01**: User can browse college listings in card view
- [ ] **COLL-02**: User can search colleges by name, location, or course
- [ ] **COLL-03**: User can filter colleges by country, state, type, and fee range
- [ ] **COLL-04**: User can sort colleges by ranking, rating, package, or name
- [ ] **COLL-05**: User can view college detail page with tabs (Overview, Courses, Fees, Admissions, Placements, Reviews)
- [ ] **COLL-06**: User can see courses offered with eligibility and fee per course
- [ ] **COLL-07**: User can see placement statistics (avg/highest package, placement %)
- [ ] **COLL-08**: User can see admission deadlines and process steps
- [ ] **COLL-09**: User can compare up to 4 colleges side-by-side
- [ ] **COLL-10**: User can save/bookmark colleges

### Entrance Exams

- [ ] **EXAM-01**: User can browse entrance exams by category (Engineering, Medical, Management, Abroad)
- [ ] **EXAM-02**: User can see exam dates, registration deadlines, and syllabus info
- [ ] **EXAM-03**: User can access preparation resources per exam

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password
- [ ] **AUTH-02**: User can sign in with email and password
- [ ] **AUTH-03**: User can sign in with Google OAuth
- [ ] **AUTH-04**: User can reset password via email link
- [ ] **AUTH-05**: User session persists across browser refresh

### Student Dashboard

- [ ] **DASH-01**: User can view personalized dashboard with stats overview
- [ ] **DASH-02**: User can create and edit student profile (academics, interests, preferences)
- [ ] **DASH-03**: User can track applications with status (Researching → Applied → Accepted/Rejected)
- [ ] **DASH-04**: User can view saved/bookmarked colleges
- [ ] **DASH-05**: User can see deadline calendar with upcoming dates
- [ ] **DASH-06**: User can view notification center with alerts

### Admission Guidance

- [ ] **ADMN-01**: User can browse step-by-step admission guides by country
- [ ] **ADMN-02**: User can access essay/SOP writing tips and templates
- [ ] **ADMN-03**: User can access interview preparation guides
- [ ] **ADMN-04**: User can view document checklist for applications
- [ ] **ADMN-05**: User can view application timeline planner

### Career Guidance

- [ ] **CARE-01**: User can explore career paths with salary and growth info
- [ ] **CARE-02**: User can take career quiz/assessment
- [ ] **CARE-03**: User can view industry trends and job market insights
- [ ] **CARE-04**: User can find skill development resources per career path

### Blog & Resources

- [ ] **BLOG-01**: User can browse blog articles by category
- [ ] **BLOG-02**: User can read full blog articles with author info
- [ ] **BLOG-03**: User can see featured/trending articles
- [ ] **BLOG-04**: User can share articles via link

### Scholarships

- [ ] **SCHOL-01**: User can browse scholarship database with search
- [ ] **SCHOL-02**: User can filter scholarships by country, degree, and amount
- [ ] **SCHOL-03**: User can see scholarship eligibility and deadlines
- [ ] **SCHOL-04**: User can see matched scholarships based on profile

### Responsive Design

- [ ] **RESP-01**: All pages render correctly on mobile (320px-767px)
- [ ] **RESP-02**: All pages render correctly on tablet (768px-1023px)
- [ ] **RESP-03**: All pages render correctly on desktop (1024px+)
- [ ] **RESP-04**: Touch-friendly tap targets (minimum 44x44px) on mobile
- [ ] **RESP-05**: No horizontal scroll on any device

### Admin

- [ ] **ADMIN-01**: Admin can manage colleges via Django admin panel
- [ ] **ADMIN-02**: Admin can manage blog posts via Django admin panel
- [ ] **ADMIN-03**: Admin can manage users via Django admin panel

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Reviews & Ratings

- **REV-01**: User can rate colleges on multiple parameters (1-5 stars)
- **REV-02**: User can write text reviews with moderation
- **REV-03**: User can vote reviews as helpful/unhelpful

### Counselor Booking

- **COUN-01**: User can browse counselor profiles with specialization
- **COUN-02**: User can book counselor sessions via calendar
- **COUN-03**: User can rate counselors after sessions

### Notifications

- **NOTIF-01**: User receives email notifications for deadline reminders
- **NOTIF-02**: User receives push notifications in browser

### Parent Dashboard

- **PARENT-01**: Parent can link account to student via invite code
- **PARENT-02**: Parent can view child's application progress

## Out of Scope

| Feature | Reason |
|---------|--------|
| Direct application submission | Not a portal replacement — we guide, not submit |
| Payment processing | No financial transactions in v1 |
| Visa processing | Too complex for initial scope |
| Native mobile app | Responsive web covers mobile needs |
| Accommodation booking | Ancillary feature for later |
| Real ML-based recommendations | Rule-based quiz sufficient; ML needs data pipeline |
| Community forum | Needs active user base to have value |
| Chatbot | High complexity, low v1 value |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Done |
| FOUND-02 | Phase 1 | Done |
| FOUND-03 | Phase 1 | Done |
| FOUND-04 | Phase 1 | Done |
| FOUND-05 | Phase 1 | Done |
| COLL-01 | Phase 1 | Done |
| COLL-02 | Phase 1 | Done |
| COLL-03 | Phase 1 | Done |
| COLL-04 | Phase 1 | Done |
| COLL-05 | Phase 1 | Done |
| COLL-06 | Phase 1 | Done |
| COLL-07 | Phase 1 | Done |
| COLL-08 | Phase 1 | Done |
| COLL-09 | Phase 1 | Partial |
| COLL-10 | Phase 1 | Partial |
| EXAM-01 | Phase 1 | Done |
| EXAM-02 | Phase 1 | Done |
| EXAM-03 | Phase 1 | Done |
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| AUTH-04 | Phase 2 | Pending |
| AUTH-05 | Phase 2 | Pending |
| DASH-01 | Phase 2 | Partial (UI done) |
| DASH-02 | Phase 2 | Partial (UI done) |
| DASH-03 | Phase 2 | Partial (UI done) |
| DASH-04 | Phase 2 | Partial (UI done) |
| DASH-05 | Phase 2 | Pending |
| DASH-06 | Phase 2 | Partial (UI done) |
| ADMN-01 | Phase 1 | Done |
| ADMN-02 | Phase 1 | Done |
| ADMN-03 | Phase 1 | Done |
| ADMN-04 | Phase 1 | Done |
| ADMN-05 | Phase 1 | Done |
| CARE-01 | Phase 1 | Done |
| CARE-02 | Phase 1 | Partial (UI done) |
| CARE-03 | Phase 1 | Done |
| CARE-04 | Phase 1 | Done |
| BLOG-01 | Phase 1 | Done |
| BLOG-02 | Phase 1 | Partial |
| BLOG-03 | Phase 1 | Done |
| BLOG-04 | Phase 1 | Pending |
| SCHOL-01 | Phase 1 | Done |
| SCHOL-02 | Phase 1 | Partial |
| SCHOL-03 | Phase 1 | Done |
| SCHOL-04 | Phase 2 | Pending |
| RESP-01 | Phase 1 | Done |
| RESP-02 | Phase 1 | Done |
| RESP-03 | Phase 1 | Done |
| RESP-04 | Phase 1 | Done |
| RESP-05 | Phase 1 | Done |
| ADMIN-01 | Phase 3 | Pending |
| ADMIN-02 | Phase 3 | Pending |
| ADMIN-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 45 total
- Mapped to phases: 45
- Unmapped: 0

---
*Requirements defined: 2026-04-03*
*Last updated: 2026-04-03 after initialization*

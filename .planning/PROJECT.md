# EduConnect

## What This Is

EduConnect is a responsive career guidance and college admission platform for students in India and abroad. It provides centralized college listings, admission/career guidance, a personalized student dashboard, scholarships, entrance exams info, and a blog — all working across mobile and desktop browsers.

## Core Value

Students can discover, compare, and track college admissions in one place — eliminating the confusion of scattered information and missed deadlines.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Responsive landing page with hero, search, featured colleges, stats, testimonials
- [ ] College listings with search, filter (country, course, fees, type), sort, and pagination
- [ ] College detail pages with tabs (Overview, Courses, Fees, Admissions, Placements, Reviews)
- [ ] College comparison tool (up to 4 side-by-side)
- [ ] User authentication (signup, login, Google OAuth, password reset)
- [ ] Student dashboard with profile, application tracker, saved colleges, deadline calendar, notifications
- [ ] Admission guidance hub with step-by-step guides by country/degree
- [ ] Career guidance hub with career explorer, quiz, industry trends, salary insights
- [ ] Scholarship database with search and filter
- [ ] Entrance exams module with dates, syllabus, preparation resources
- [ ] Blog/resource section with categories, featured articles, search
- [ ] Reviews & ratings system for colleges
- [ ] Counselor booking with profiles and calendar slots
- [ ] Admin panel for content management
- [ ] Global search with autocomplete across all entities
- [ ] Notification system (in-app + email reminders)
- [ ] Mobile-first responsive design (320px to 1440px+)
- [ ] Dark/light theme support

### Out of Scope

- Direct application submission to colleges — not a portal replacement
- Payment processing for fees — no financial transactions in v1
- Visa processing — too complex for initial scope
- Native mobile app — responsive web covers mobile needs for now
- Accommodation booking — ancillary feature for later

## Context

- BCA 6th semester project by team of 3 students
- Comprehensive BRD v2.0 exists at `/Users/kevin/Desktop/EDU-Connect/BRD.md`
- Frontend-first approach: build working UI with mock data, connect backend later
- Must run in Chrome browser, responsive for mobile and desktop
- Tech stack: Next.js 14+ / React 18+ / Tailwind CSS 3+ / shadcn/ui

## Constraints

- **Tech Stack**: Next.js + React + Tailwind CSS + shadcn/ui — per BRD decision
- **Platform**: Responsive web (mobile + desktop), runs in Chrome
- **Approach**: Frontend working model first, mock/static data acceptable
- **Team**: 3 BCA students
- **Quality**: Production-grade UI, professional look and feel

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js over plain HTML | SSR, routing, responsive by design, modern DX | — Pending |
| Tailwind CSS + shadcn/ui | Utility-first responsive classes, accessible components | — Pending |
| Frontend-first with mock data | Get working visual model running in browser quickly | — Pending |
| PostgreSQL over MySQL | Better JSON, full-text search, array fields | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-03 after initialization*

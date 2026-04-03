# Feature Landscape: Career Guidance & College Admission Platform

**Domain:** College discovery, admission guidance, career planning (India-first + abroad)
**Researched:** 2026-04-03
**Confidence:** MEDIUM — based on training knowledge of Shiksha, CollegeDunia, Collegevani, Niche.com, CollegeBoard, and Unigo (verified against BRD v2.0). WebSearch/WebFetch unavailable for live verification; reference platform feature lists are from training data (cutoff Aug 2025).

---

## Indian Market Context

Understanding the Indian market is mandatory before categorizing features. The following domain-specific constructs shape what is "table stakes" in this market versus Western equivalents:

| Concept | Indian Context | Implication |
|---------|---------------|-------------|
| JEE / JEE Mains / JEE Advanced | Gate exam for IITs, NITs, GFTIs — millions of applicants | Exam module is not optional; it's a core discovery signal |
| NEET | Single gate for all MBBS/BDS seats | Medical college filter must be NEET-score-driven |
| CAT / XAT / SNAP | MBA entrance exams | B-school listings must be linked to CAT percentile cutoffs |
| CUET | Common University Entrance Test, now covers 200+ central universities | Rapidly replacing board-score-based admission |
| NIRF Rankings | Government's National Institutional Ranking Framework — the authoritative Indian ranking | Must display NIRF alongside QS/THE for abroad colleges |
| LPA (Lakhs Per Annum) | Indian salary convention for placement data | All salary/placement data must be in LPA, not USD/percentile |
| Government / Aided / Autonomous / Deemed / Private | Legal classification of colleges affects fee, reservation policy, recognition | Mandatory filter dimension |
| Reservation categories (SC/ST/OBC/EWS/General) | Determines eligibility cutoffs per seat type | Cutoff tables must carry category-wise data |
| State quota vs All-India quota | For NIT/state colleges, seat allocation differs | Affects which students can apply to which colleges |

---

## Table Stakes

Features users expect from the moment they land. Absence causes immediate exit to competitors (Shiksha, CollegeDunia).

### Discovery & Search

| Feature | Why Expected | Complexity | Indian-Market Notes |
|---------|--------------|------------|---------------------|
| College search by name, location, course | Universal expectation from all reference platforms | Low | — |
| Multi-faceted filter sidebar | Shiksha/CollegeDunia have 8-12 simultaneous filter dimensions | Medium | Must include: country, state, course type, college type (Govt/Private/Deemed), fee range, NIRF rank range |
| Sort by ranking, fees, popularity | Standard; every reference platform has it | Low | Default sort = NIRF rank for Indian colleges |
| Paginated or infinite-scroll results | Required for 500+ college datasets | Low | — |
| College detail page with structured tabs | All reference platforms use tab pattern (Overview/Courses/Fees/Admissions/Placements/Reviews) | Medium | — |
| Fee structure breakdown | Students and parents need tuition, hostel, other fees itemized | Low | Must be in INR; include "annual" and "total programme" views |
| Placement statistics | LPA data is primary ROI signal for Indian families | Low | Average LPA, highest LPA, top recruiters, placement % |
| Admission deadlines with countdown | CollegeDunia, Shiksha both show this prominently | Low | Must align to JEE/NEET/CAT counselling rounds |
| Courses offered with eligibility | Without this, detail page is useless | Medium | Must include entrance exam required (JEE Mains / NEET / CAT / CUET) |
| NIRF / QS / THE ranking display | NIRF is non-negotiable for Indian students; QS for abroad | Low | Show multiple ranking systems simultaneously |

### Entrance Exam Information

| Feature | Why Expected | Complexity | Indian-Market Notes |
|---------|--------------|------------|---------------------|
| Exam calendar (JEE, NEET, CAT, CUET, SAT, GRE, IELTS) | Students plan their year around exam dates | Medium | This is what drives return visits more than any other feature |
| Exam registration deadlines | Missed NEET registration = missed year | Low | — |
| Syllabus and exam pattern per exam | Students come to reference platforms specifically for this | Medium | — |
| Exam-to-college mapping | "Which colleges accept JEE Mains?" is a top search query | Medium | Bidirectional: college → exams and exam → eligible colleges |

### User Account & Dashboard

| Feature | Why Expected | Complexity | Indian-Market Notes |
|---------|--------------|------------|---------------------|
| Email + Google OAuth registration | Google login is the dominant mobile auth pattern in India | Low | — |
| Student profile with academic details | Required for personalized features to function | Medium | Must capture: board (CBSE/ICSE/State), marks/percentage, test scores |
| Saved/bookmarked colleges | Universal; Shiksha and CollegeDunia both have this | Low | — |
| Application tracker with status stages | Users managing 5-15 applications simultaneously need this | Medium | Stages: Researching → Documents Ready → Applied → Under Review → Result |
| Deadline calendar | Core value proposition of the platform per BRD | Medium | Color-code by urgency (red < 7 days, amber < 30 days) |
| In-app + email notifications | Users won't come back daily without reminders | Medium | — |

### Content & Guidance

| Feature | Why Expected | Complexity | Indian-Market Notes |
|---------|--------------|------------|---------------------|
| Blog / articles section | All reference platforms have editorial content for SEO and trust | Low | — |
| Admission guidance articles by country/degree | Step-by-step content is a primary search-engine entry point | Medium | India, USA, UK, Canada, Germany, Australia as minimum coverage |
| Category navigation in blog | Users browse by topic (study abroad, exam prep, career advice) | Low | — |
| Newsletter subscription | Standard lead-capture; all reference platforms use it | Low | — |

### UX Infrastructure

| Feature | Why Expected | Complexity | Indian-Market Notes |
|---------|--------------|------------|---------------------|
| Responsive mobile layout (320px+) | 70%+ Indian student traffic is mobile-first | Medium | Mobile breakpoints are not optional polish |
| Global search with autocomplete | Users type college names, exam names, cities — autocomplete removes friction | Medium | Needs to cover colleges, courses, exams, articles |
| Fast page loads (FCP < 2s) | Indian mobile networks vary; slow = exit | Medium | Lazy-load images; SSR/SSG via Next.js is the right call |
| Dark / light theme | Not universal but increasingly expected by student demographic (16-24) | Low | — |

---

## Differentiators

Features that reference platforms do poorly, do not offer, or where a new entrant can genuinely improve the experience.

### Indian-Market-Specific Differentiators

| Feature | Value Proposition | Complexity | Dependency |
|---------|-------------------|------------|-----------|
| Category-wise cutoff tables (General/OBC/SC/ST/EWS) | Shiksha shows aggregate cutoffs; per-category data is hard to find in a clean UI | High | College data model must carry category dimension |
| JEE/NEET rank-to-college predictor | "Given my JEE rank of 8500, which NITs/GFTIs can I get?" — heavily searched, existing tools are clunky and ad-laden | High | Requires historical cutoff dataset; complex matching logic |
| Counselling round tracker (JoSAA/CSAB for JEE; MCC for NEET) | JoSAA counselling has 6 rounds with floating seat availability — no platform presents this clearly | High | Requires round-wise data ingestion |
| Exam score normalization explainer | JEE Mains uses percentile normalization across shifts — confusing for students; clean explainer + calculator wins trust | Medium | Static content + simple calculator |
| NIRF vs perception gap highlights | Some colleges rank well on NIRF but have poor placements (and vice versa) — surface this honestly | Medium | Requires editorial judgment + data |
| State-quota vs All-India quota clarity | NIT seats split 50/50; students from outside state often don't understand their realistic odds | Medium | Data annotation on college profiles |

### Career Guidance Differentiators

| Feature | Value Proposition | Complexity | Dependency |
|---------|-------------------|------------|-----------|
| Career quiz linking to college discovery | Take quiz → get career match → see "colleges for this career" — closes the loop Shiksha/CollegeDunia leave open | High | Career data model must link to courses/colleges |
| LPA-by-career-path salary insights | "If I study CS from an NIT vs a private college, what's the LPA difference?" — data-driven answer | High | Placement data aggregation |
| Skill-gap analysis vs career target | "You want to be a data scientist — here are the skills you're missing and courses to fill them" | High | Career ontology + profile assessment |
| Day-in-the-life professional profiles | Qualitative content Shiksha lacks; builds trust with uncertain students | Medium | Editorial production effort |

### UX Differentiators

| Feature | Value Proposition | Complexity | Dependency |
|---------|-------------------|------------|-----------|
| College comparison with highlight-differences | Niche.com does side-by-side well; Indian platforms do it poorly; "better value" highlighting is rare | Medium | Comparison feature + scoring logic |
| Kanban-style application tracker | Trello-like visual board (Researching → Applied → Accepted) instead of a flat list; CollegeDunia's tracker is a flat table | Medium | Dashboard module |
| Document checklist generator per college/country | "Here is your exact checklist for applying to a UK MSc" — personalized, not generic | Medium | Admission guide content model |
| Parent-linked dashboard | Parent gets read-only view of child's applications and deadlines — unique to EduConnect among Indian platforms | Medium | Auth system with account-linking |
| Counselor booking with calendar slots | Most Indian platforms only offer "request a callback"; actual slot-based booking is a differentiator | High | Counselor management system |
| Progress indicator / gamification | Profile completion %, application milestones — drives engagement; common in US platforms, absent in Indian ones | Low | Profile system |

### Content Differentiators

| Feature | Value Proposition | Complexity | Dependency |
|---------|-------------------|------------|-----------|
| Scholarship auto-match based on profile | Show scholarships the student actually qualifies for; Shiksha lists scholarships but doesn't personalize | High | Profile system + scholarship eligibility data |
| SOP / LOR template library | Free, well-structured templates with worked examples — high search volume, low supply | Medium | Static content (minimal dev) |
| College review system with verified-student badges | Unigo/Niche do this well; Indian platforms have sparse, often fake reviews; verification adds trust | High | Auth + moderation system |
| Abroad college integration | Most Indian platforms focus 90% on India; genuinely useful abroad data (USA, UK, Canada) with Indian-student-specific context (F1 visa costs, post-study work rights) is rare | High | Data model expansion + editorial |

---

## Anti-Features

Things to deliberately not build in v1 (and possibly ever).

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Direct application submission | Requires integration agreements with hundreds of colleges, legal liability, data compliance; CollegeBoard/UCAS took years to build this | Link to official application portals; the BRD correctly scopes this out |
| Payment processing for fees | PCI-DSS compliance, RBI payment aggregator registration; out of scope for a student project and v1 product | Out of scope per BRD |
| Visa processing / documentation | Legally sensitive; requires authoritative, up-to-date information that a content team can't maintain reliably | Provide informational guides only; link to official embassy sites |
| Native mobile app (iOS/Android) | Doubles the codebase maintenance burden; responsive PWA covers Indian mobile-first needs for v1 | Responsive web with PWA manifest covers 95% of the mobile use case |
| Community forum / Q&A | Requires moderation infrastructure, spam control, community cold-start problem — high effort, low return for v1 | Blog comments or a simple FAQ is sufficient early on |
| Real-time chat / live support | WebSocket infrastructure, staffing, uptime expectations; adds operational complexity disproportionate to v1 value | Counselor booking with async follow-up covers the core need |
| Accommodation booking | Ancillary to admission; Booking.com already does this; referral link is sufficient | Link out to hostel/PG aggregators |
| Official document verification | Requires DigiLocker API, college database access, legal framework — far beyond scope | Checklist + upload is sufficient; verification is the college's responsibility |
| Social media feed / posts | Platform-builds-community is a multi-year strategy; premature for a guidance tool | Newsletter + blog covers content distribution needs |
| AI chatbot (rule-based) | Rule-based chatbots feel broken quickly; LLM-based requires API costs and content moderation; both create false expectations | Guided forms and curated content answer 80% of questions better |
| Gamification with points/badges/leaderboards | Misaligned with the serious, high-stakes context of college admission; feels trivial | Simple progress indicators are sufficient motivation |
| Job board / internship listings | Separate domain (Internshala, Naukri exist); dilutes focus | Career guidance content (salaries, paths) is sufficient; link out to job boards |

---

## Feature Dependencies

```
User Auth
  └─► Student Profile
        ├─► Application Tracker (needs college save)
        ├─► Deadline Calendar (needs applications + exam data)
        ├─► Scholarship Auto-Match (needs profile completeness)
        ├─► Career Quiz Results (stored per user)
        └─► Parent Account Linking (needs student profile as anchor)

College Data Model
  ├─► College Listing Page (display)
  ├─► College Detail Page (display + tabs)
  ├─► College Comparison Tool (needs ≥2 college records)
  ├─► Exam-to-College Mapping (needs both exam + college data)
  ├─► Reviews & Ratings (needs college + auth)
  └─► JEE/NEET Rank Predictor (needs cutoff data per college per year)

Entrance Exam Module
  ├─► Exam Calendar (standalone)
  ├─► Exam-to-College Mapping (needs college data)
  └─► Deadline Calendar in Dashboard (imports exam dates)

Blog / Content
  ├─► SEO entry points (drives organic traffic before auth)
  ├─► Admission Guides (structured sub-type of blog)
  └─► Career Guidance Articles (structured sub-type of blog)

Counselor Booking
  ├─► Counselor Profiles (public, no auth)
  ├─► Slot Selection (requires auth to book)
  └─► Session Management (requires counselor-side dashboard)

Admin Panel
  └─► Feeds all public-facing data (colleges, exams, scholarships, blog)
       — must be built before or alongside content modules
```

---

## MVP Recommendation

The MVP must solve the primary use case: **a student can find, compare, and track colleges without leaving the platform.**

### Must Ship in MVP (Phase 1)

1. **College listings with search + filter** — the core product loop starts here; no point building anything else if discovery is weak
2. **College detail page** (Overview / Courses / Fees / Admissions / Placements tabs) — where the decision happens
3. **Entrance exam module** (JEE, NEET, CAT, CUET, SAT, GRE) — drives repeat visits and organic search traffic in the Indian market; unique leverage point
4. **User auth + student profile** — gates the personalized features
5. **Application tracker + deadline calendar** — primary retention mechanism after signup
6. **Admission guidance hub** (country guides, document checklist) — high SEO value, low build cost
7. **Blog/resources** — organic traffic engine from day one
8. **Admin panel** (CRUD for all content) — without this, the content team cannot operate

### Defer to Phase 2

- **College comparison tool** — useful but students can mentally compare if detail pages are good
- **Scholarship database** — high value but data curation is expensive; build after college data is solid
- **Reviews & ratings** — needs a user base to be credible; a cold-start review system is worse than none
- **Counselor booking** — high complexity (calendar, video links, counselor management); phase 2
- **Career quiz** — valuable differentiator but not blocking core admission workflow

### Defer to Phase 3

- **JEE/NEET rank predictor** — requires multi-year cutoff dataset; high data curation cost
- **Parent dashboard** — useful but low priority until student base is established
- **Scholarship auto-match** — depends on rich profile data that users won't fill in v1
- **Verified student reviews** — depends on active user base + moderation infrastructure

---

## Complexity Notes by Feature

| Feature | Complexity | Primary Reason |
|---------|------------|----------------|
| College search + filter | Medium | Multi-field filtering, performance at scale |
| College detail page tabs | Low | Structured display; complexity is data curation, not code |
| NIRF + QS ranking display | Low | Data attribute, not a system |
| Category-wise cutoff tables | High | Data model complexity + ingestion pipeline |
| JEE/NEET rank predictor | Very High | Historical dataset + matching algorithm |
| Entrance exam calendar | Medium | Data curation for 15+ exams; logic is simple |
| Exam-to-college mapping | Medium | Bidirectional linkage in data model |
| User auth (email + Google OAuth) | Low | Well-solved by NextAuth.js |
| Student profile wizard | Medium | Multi-step form + data validation |
| Application tracker (Kanban) | Medium | State management, drag-and-drop optional |
| Deadline calendar | Medium | Calendar UI component + deadline aggregation |
| College comparison (4-up) | Medium | Dynamic table, highlight logic |
| Scholarship auto-match | High | Profile-to-eligibility matching logic |
| Career quiz + matching | High | Question design + career ontology |
| Reviews + moderation | High | Moderation queue, spam prevention, trust signals |
| Counselor booking + calendar | High | Availability management, booking conflicts |
| Parent account linking | Medium | Invite-code flow + scoped read permissions |
| Blog / CMS | Low | Standard Next.js content rendering |
| Admission guides | Low | Static structured content |
| Global search autocomplete | Medium | Elasticsearch or Postgres full-text search |
| Admin panel (CRUD) | Medium | Standard back-office, well-understood patterns |
| Responsive mobile layout | Medium | Design discipline required throughout; not a single task |

---

## Sources

**Confidence note:** WebSearch and WebFetch were unavailable during this research session. All platform feature analysis is based on training knowledge (Shiksha, CollegeDunia, Collegevani, Niche.com, CollegeBoard, Unigo — training cutoff Aug 2025). Indian market context (JEE, NEET, CAT, NIRF, LPA, reservation system, JoSAA counselling) is HIGH confidence based on well-documented, stable domain knowledge. Feature categorization is MEDIUM confidence — live platform audits would upgrade this.

- EduConnect BRD v2.0 (`/Users/kevin/Desktop/EDU-Connect/BRD.md`) — PRIMARY SOURCE
- Shiksha.com feature audit — training knowledge, MEDIUM confidence
- CollegeDunia.com feature audit — training knowledge, MEDIUM confidence
- Niche.com feature audit — training knowledge, MEDIUM confidence
- CollegeBoard.org feature audit — training knowledge, MEDIUM confidence
- Indian education domain knowledge (JEE/NEET/CAT/NIRF) — HIGH confidence

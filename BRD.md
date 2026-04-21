# EduConnect - Business Requirements Document (BRD)

**Project Name:** EduConnect - Career Guidance & College Admission Platform
**Version:** 2.0
**Date:** 03 April 2026
**Original Concept Date:** 02 March 2026
**Team:** Abijith S (U19VU23S0026), Muhammad Ansar A H (U19VU23S0002), Abanas Krishna (U19VU23S0009)
**Program:** BCA 6th Semester
**Document Status:** Final Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [Target Audience & User Personas](#4-target-audience--user-personas)
5. [Scope](#5-scope)
6. [Functional Requirements](#6-functional-requirements)
7. [Non-Functional Requirements](#7-non-functional-requirements)
8. [System Modules (Detailed)](#8-system-modules-detailed)
9. [User Flows](#9-user-flows)
10. [Page-by-Page Breakdown (Responsive Web)](#10-page-by-page-breakdown-responsive-web)
11. [Tech Stack](#11-tech-stack)
12. [System Architecture](#12-system-architecture)
13. [Database Schema Design](#13-database-schema-design)
14. [API Endpoints](#14-api-endpoints)
15. [Third-Party Integrations](#15-third-party-integrations)
16. [Hardware & Software Requirements](#16-hardware--software-requirements)
17. [Security Requirements](#17-security-requirements)
18. [SEO & Performance Requirements](#18-seo--performance-requirements)
19. [Success Metrics & KPIs](#19-success-metrics--kpis)
20. [Risk Assessment](#20-risk-assessment)
21. [Project Timeline & Milestones](#21-project-timeline--milestones)
22. [Future Enhancements](#22-future-enhancements)

---

## 1. Executive Summary

EduConnect is a comprehensive, responsive web platform that simplifies the college admission process for students in India and Abroad. It provides centralized college listings, step-by-step admission guidance, career resources, and a personalized student dashboard — all accessible from desktop and mobile devices.

**What the original presentation covered:**
- Basic introduction, problem statement, 4 proposed solutions
- 5 system modules (College Listings, Admission Guidance, Career Guidance, Student Dashboard, Blog/Resources)
- Software & hardware requirements
- Tech stack: Django, HTML, MySQL

**What was missing and has been added in this BRD:**
- Detailed user personas and role-based access
- Authentication & authorization system
- Search, filter, and compare functionality
- Notification & alert system
- Scholarship & financial aid module
- Entrance exam information module
- College reviews & ratings system
- Counselor booking / live chat
- Admin panel & content management
- Responsive design specifications (mobile + desktop)
- Complete database schema design
- API endpoint specifications
- Security, SEO, and performance requirements
- Third-party integrations
- Analytics & reporting dashboard
- Detailed user flows
- Page-by-page wireframe breakdown
- Success metrics and KPIs
- Risk assessment and mitigation plan
- Project timeline with milestones

---

## 2. Problem Statement

### Core Problems (from original presentation)
- Students face confusion during college admissions
- Lack of centralized information about colleges
- Difficulty in tracking applications
- Limited career guidance resources

### Extended Problems Identified
| # | Problem | Impact |
|---|---------|--------|
| P1 | No single platform compares colleges across India and abroad side-by-side | Students visit 10+ websites to gather basic info |
| P2 | Admission deadlines are scattered and easily missed | Students miss application windows |
| P3 | Scholarship/financial aid information is fragmented | Students miss financial opportunities |
| P4 | No personalized recommendations based on student profile | Students apply to wrong-fit colleges |
| P5 | Entrance exam schedules and syllabus are hard to track | Exam preparation suffers |
| P6 | Parents have no visibility into their child's application progress | Family decision-making is hampered |
| P7 | Career guidance is generic, not tailored to individual strengths | Students make uninformed career choices |
| P8 | Mobile access to admission tools is poor in existing platforms | 70%+ students browse on mobile |

---

## 3. Project Objectives

| # | Objective | Measurable Target |
|---|-----------|-------------------|
| O1 | Centralize college information | 500+ colleges listed within 6 months |
| O2 | Simplify application tracking | Students can track all applications in one dashboard |
| O3 | Provide personalized career guidance | AI-based recommendations based on student profile |
| O4 | Ensure mobile-first responsive design | 100% feature parity across mobile and desktop |
| O5 | Deliver deadline alerts | Zero missed deadlines for active users |
| O6 | Enable college comparison | Side-by-side comparison of up to 4 colleges |
| O7 | Reduce admission confusion | 80% user satisfaction rating |

---

## 4. Target Audience & User Personas

### 4.1 Primary Users

#### Persona 1: Student (Age 16-24)
- **Who:** High school/undergraduate students seeking admission
- **Goals:** Find the right college, track applications, get career guidance
- **Pain Points:** Information overload, missed deadlines, no personalized advice
- **Device:** Primarily mobile (70%), desktop (30%)

#### Persona 2: Parent/Guardian
- **Who:** Parents helping children with college decisions
- **Goals:** Monitor child's application progress, compare college costs, understand ROI
- **Pain Points:** No visibility into the process, financial planning difficulty
- **Device:** Desktop (60%), mobile (40%)

### 4.2 Secondary Users

#### Persona 3: Career Counselor
- **Who:** Professional guidance counselors
- **Goals:** Manage multiple students, provide recommendations, track progress
- **Pain Points:** Manual tracking, no centralized tool
- **Device:** Desktop (80%)

#### Persona 4: College/Institution Representative
- **Who:** Admissions staff from listed colleges
- **Goals:** Update college info, respond to queries, manage listings
- **Pain Points:** Keeping information current across platforms
- **Device:** Desktop (90%)

### 4.3 System Users

#### Persona 5: Platform Admin
- **Who:** EduConnect team members
- **Goals:** Manage content, moderate reviews, monitor analytics, handle support
- **Device:** Desktop only

### User Roles & Permissions Matrix

| Feature | Student | Parent | Counselor | College Rep | Admin |
|---------|---------|--------|-----------|-------------|-------|
| View college listings | Yes | Yes | Yes | Yes | Yes |
| Create/Edit profile | Yes | Yes | Yes | Yes | Yes |
| Track applications | Yes | View only | View all assigned | No | View all |
| Save/Bookmark colleges | Yes | Yes | Yes | No | No |
| Write reviews | Yes | No | No | No | Moderate |
| Compare colleges | Yes | Yes | Yes | No | Yes |
| Book counselor session | Yes | Yes | N/A | No | Manage |
| Edit college info | No | No | No | Own college | All |
| Access admin panel | No | No | No | No | Yes |
| Receive notifications | Yes | Yes | Yes | Yes | Yes |
| View analytics | Own | Own | Assigned students | Own college | All |

---

## 5. Scope

### 5.1 In Scope (MVP - Phase 1)
- User registration & authentication (email + Google OAuth)
- College listings with search, filter, and sort
- College detail pages with courses, fees, eligibility, deadlines
- Admission guidance content (step-by-step guides)
- Career guidance content and resources
- Student dashboard with profile, saved colleges, application tracker
- Blog/resource section
- Responsive design (mobile + desktop)
- Basic notification system (email)
- Contact/inquiry forms
- Admin panel for content management

### 5.2 In Scope (Phase 2)
- College comparison tool
- Scholarship & financial aid database
- Entrance exam module
- Reviews & ratings system
- Counselor booking system
- Parent dashboard (linked accounts)
- Push notifications
- Advanced search with AI recommendations

### 5.3 In Scope (Phase 3)
- Live chat / chatbot for instant guidance
- Video counseling integration
- College representative portal
- Analytics dashboard
- Community forum
- Mobile app (React Native / Flutter)

### 5.4 Out of Scope
- Direct application submission to colleges
- Payment processing for college fees
- Official document verification
- Visa processing assistance
- Accommodation booking

---

## 6. Functional Requirements

### FR-01: User Authentication & Account Management
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01.1 | User registration with email, name, phone, and password | Must Have |
| FR-01.2 | Google OAuth / Social login | Should Have |
| FR-01.3 | Email verification on registration | Must Have |
| FR-01.4 | Password reset via email link | Must Have |
| FR-01.5 | Role-based registration (Student, Parent, Counselor) | Must Have |
| FR-01.6 | Profile creation wizard on first login | Must Have |
| FR-01.7 | Profile edit and update | Must Have |
| FR-01.8 | Account deactivation/deletion | Must Have |
| FR-01.9 | Session management and auto-logout after inactivity | Should Have |
| FR-01.10 | Parent-Student account linking via invite code | Should Have |

### FR-02: College Listings
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-02.1 | Display colleges in card/list view with key info | Must Have |
| FR-02.2 | Search by college name, location, course | Must Have |
| FR-02.3 | Filter by country, state, city, course type, fee range, ranking | Must Have |
| FR-02.4 | Sort by ranking, fees, name, popularity | Must Have |
| FR-02.5 | College detail page with: name, description, logo, images, location, contact | Must Have |
| FR-02.6 | Courses offered with eligibility criteria per course | Must Have |
| FR-02.7 | Fee structure breakdown (tuition, hostel, other) | Must Have |
| FR-02.8 | Admission deadlines with countdown timer | Must Have |
| FR-02.9 | Placement statistics (average package, top recruiters) | Should Have |
| FR-02.10 | Campus facilities list | Should Have |
| FR-02.11 | College location on embedded map | Should Have |
| FR-02.12 | Photo gallery / virtual tour link | Could Have |
| FR-02.13 | Save/bookmark college to dashboard | Must Have |
| FR-02.14 | Share college page via link/social media | Should Have |
| FR-02.15 | Pagination and infinite scroll on listing page | Must Have |

### FR-03: College Comparison
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-03.1 | Add up to 4 colleges to comparison tray | Should Have |
| FR-03.2 | Side-by-side comparison table (fees, courses, ranking, placement, facilities) | Should Have |
| FR-03.3 | Highlight differences and better values | Could Have |
| FR-03.4 | Save/export comparison as PDF | Could Have |

### FR-04: Admission Guidance
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-04.1 | Step-by-step admission process guides per country/college type | Must Have |
| FR-04.2 | Essay/SOP writing tips with sample templates | Must Have |
| FR-04.3 | Interview preparation guides with common questions | Must Have |
| FR-04.4 | Document checklist (customizable per college type) | Must Have |
| FR-04.5 | Application timeline planner | Should Have |
| FR-04.6 | LOR (Letter of Recommendation) guidance | Should Have |
| FR-04.7 | Standardized test guides (SAT, GRE, GMAT, IELTS, TOEFL) | Should Have |
| FR-04.8 | Country-specific admission guides (USA, UK, Canada, Australia, Germany) | Must Have |

### FR-05: Career Guidance
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-05.1 | Career path explorer (visual career maps) | Must Have |
| FR-05.2 | Skill assessment questionnaire | Should Have |
| FR-05.3 | Personalized career recommendations based on profile | Should Have |
| FR-05.4 | Industry trends articles and data | Must Have |
| FR-05.5 | Job market insights per field/location | Must Have |
| FR-05.6 | Skill development resource links (courses, certifications) | Must Have |
| FR-05.7 | Salary insights by role and experience | Should Have |
| FR-05.8 | "Day in the life" professional profiles | Could Have |
| FR-05.9 | Career quiz to match interests to professions | Should Have |

### FR-06: Student Dashboard
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-06.1 | Personalized student profile (academic details, interests, test scores) | Must Have |
| FR-06.2 | Application tracker (college name, status, deadlines, documents) | Must Have |
| FR-06.3 | Saved/bookmarked colleges list | Must Have |
| FR-06.4 | Deadline calendar view with color coding | Must Have |
| FR-06.5 | Notification center (all alerts in one place) | Must Have |
| FR-06.6 | Progress indicator (profile completion, applications sent) | Should Have |
| FR-06.7 | Recent activity feed | Should Have |
| FR-06.8 | Quick actions (add application, browse colleges, get career advice) | Should Have |
| FR-06.9 | Document upload and management | Should Have |
| FR-06.10 | Notes/journal for each college application | Could Have |

### FR-07: Scholarship & Financial Aid (NEW MODULE)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-07.1 | Scholarship database with search and filter | Should Have |
| FR-07.2 | Eligibility checker based on student profile | Should Have |
| FR-07.3 | Scholarship deadlines and reminders | Should Have |
| FR-07.4 | Education loan information from partner banks | Could Have |
| FR-07.5 | Fee comparison calculator | Could Have |

### FR-08: Entrance Exams Module (NEW MODULE)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-08.1 | Entrance exam database (JEE, NEET, CAT, SAT, GRE, etc.) | Should Have |
| FR-08.2 | Exam dates, registration deadlines, syllabus | Should Have |
| FR-08.3 | Preparation resources and tips | Should Have |
| FR-08.4 | Previous year question papers / practice links | Could Have |
| FR-08.5 | Exam-to-college mapping (which exams for which colleges) | Should Have |

### FR-09: Blog/Resource Section
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-09.1 | Blog articles categorized by topic | Must Have |
| FR-09.2 | Search and filter blog posts | Must Have |
| FR-09.3 | Featured/trending articles section | Should Have |
| FR-09.4 | Author profiles for blog writers | Could Have |
| FR-09.5 | Related articles suggestions | Should Have |
| FR-09.6 | Social sharing for articles | Should Have |
| FR-09.7 | Newsletter subscription | Should Have |

### FR-10: Notifications & Alerts
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-10.1 | Email notifications for deadline reminders | Must Have |
| FR-10.2 | In-app notification center | Must Have |
| FR-10.3 | Push notifications (browser) | Should Have |
| FR-10.4 | Customizable notification preferences | Should Have |
| FR-10.5 | Weekly digest email with relevant updates | Could Have |

### FR-11: Reviews & Ratings (NEW MODULE)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-11.1 | Students can rate colleges (1-5 stars) on multiple parameters | Should Have |
| FR-11.2 | Written reviews with moderation | Should Have |
| FR-11.3 | Verified student badge for reviews | Could Have |
| FR-11.4 | Helpful/unhelpful voting on reviews | Could Have |
| FR-11.5 | Average rating display on college cards | Should Have |

### FR-12: Counselor Booking (NEW MODULE)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-12.1 | Counselor profile listing with specialization | Should Have |
| FR-12.2 | Booking calendar with available slots | Should Have |
| FR-12.3 | Video call integration (Google Meet / Zoom link) | Could Have |
| FR-12.4 | Session notes and follow-up tracking | Could Have |
| FR-12.5 | Rating and feedback for counselors | Could Have |

### FR-13: Admin Panel
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-13.1 | Dashboard with platform statistics (users, colleges, traffic) | Must Have |
| FR-13.2 | CRUD operations for colleges, courses, articles | Must Have |
| FR-13.3 | User management (view, suspend, delete) | Must Have |
| FR-13.4 | Content moderation (reviews, comments) | Must Have |
| FR-13.5 | Bulk import colleges via CSV/Excel | Should Have |
| FR-13.6 | SEO metadata management per page | Should Have |
| FR-13.7 | Analytics and reporting dashboard | Should Have |
| FR-13.8 | System logs and audit trail | Should Have |

### FR-14: Search (Global)
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-14.1 | Global search bar accessible from all pages | Must Have |
| FR-14.2 | Search across colleges, courses, articles, exams | Must Have |
| FR-14.3 | Auto-suggest / autocomplete | Should Have |
| FR-14.4 | Search results grouped by category | Should Have |
| FR-14.5 | Recent searches saved per user | Could Have |

---

## 7. Non-Functional Requirements

### NFR-01: Performance
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01.1 | Page load time (First Contentful Paint) | < 1.5 seconds |
| NFR-01.2 | Time to Interactive | < 3 seconds |
| NFR-01.3 | API response time | < 500ms for 95th percentile |
| NFR-01.4 | Support concurrent users | 1,000+ simultaneous |
| NFR-01.5 | Database query time | < 200ms average |
| NFR-01.6 | Image optimization | WebP format, lazy loading |
| NFR-01.7 | Lighthouse performance score | > 85 |

### NFR-02: Responsiveness
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-02.1 | Mobile breakpoint | 320px - 767px |
| NFR-02.2 | Tablet breakpoint | 768px - 1023px |
| NFR-02.3 | Desktop breakpoint | 1024px+ |
| NFR-02.4 | Touch-friendly tap targets | Minimum 44x44px |
| NFR-02.5 | No horizontal scroll on any device | 100% compliance |
| NFR-02.6 | Tested browsers | Chrome, Safari, Firefox, Edge |
| NFR-02.7 | Tested mobile OS | iOS 15+, Android 10+ |

### NFR-03: Accessibility
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-03.1 | WCAG compliance level | AA minimum |
| NFR-03.2 | Keyboard navigation | Full support |
| NFR-03.3 | Screen reader compatibility | ARIA labels on all interactive elements |
| NFR-03.4 | Color contrast ratio | 4.5:1 minimum |
| NFR-03.5 | Alt text on all images | 100% compliance |

### NFR-04: Scalability
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-04.1 | Horizontal scaling support | Stateless backend |
| NFR-04.2 | CDN for static assets | Mandatory |
| NFR-04.3 | Database connection pooling | Configured |
| NFR-04.4 | Caching strategy | Redis/Memcached for frequent queries |

### NFR-05: Availability
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-05.1 | Uptime | 99.5% |
| NFR-05.2 | Planned maintenance window | < 2 hours/month |
| NFR-05.3 | Backup frequency | Daily automated backups |
| NFR-05.4 | Recovery Time Objective (RTO) | < 4 hours |

### NFR-06: Internationalization
| ID | Requirement | Target |
|----|-------------|--------|
| NFR-06.1 | Default language | English |
| NFR-06.2 | Future language support ready | i18n framework in place |
| NFR-06.3 | Currency display | INR and USD |
| NFR-06.4 | Date format | DD/MM/YYYY (user configurable) |
| NFR-06.5 | Timezone handling | User timezone auto-detected |

---

## 8. System Modules (Detailed)

### Module Architecture Overview

```
EduConnect Platform
├── Public Pages (No auth required)
│   ├── Home / Landing Page
│   ├── College Listings (Browse)
│   ├── College Detail Page
│   ├── Admission Guides
│   ├── Career Guidance Hub
│   ├── Blog / Resources
│   ├── Entrance Exams Info
│   ├── Scholarship Database
│   ├── About Us
│   └── Contact Us
│
├── Authenticated Pages
│   ├── Student Dashboard
│   │   ├── Profile Management
│   │   ├── Application Tracker
│   │   ├── Saved Colleges
│   │   ├── Deadline Calendar
│   │   ├── Notification Center
│   │   └── Document Manager
│   ├── Parent Dashboard
│   │   ├── Linked Student View
│   │   └── Progress Monitor
│   ├── Counselor Dashboard
│   │   ├── Student Management
│   │   ├── Booking Calendar
│   │   └── Session Notes
│   └── College Rep Dashboard
│       ├── College Profile Editor
│       └── Inquiry Management
│
├── Admin Panel
│   ├── Dashboard / Analytics
│   ├── College Management (CRUD)
│   ├── User Management
│   ├── Content Management (Blog, Guides)
│   ├── Review Moderation
│   ├── Notification Management
│   └── System Settings
│
└── Shared Components
    ├── Global Search
    ├── Navigation (Responsive)
    ├── Footer
    ├── Auth Modals (Login/Register)
    ├── Comparison Tray
    └── Notification Bell
```

### Module Details

#### M1: College Listings Module
**Purpose:** Centralized, searchable database of colleges in India and abroad.

**Data per College:**
- Basic: Name, Logo, Type (Government/Private/Deemed), Established Year
- Location: Country, State, City, Address, Map Coordinates
- Academics: Courses offered, Departments, Faculty count
- Admissions: Eligibility criteria per course, Deadlines, Required exams, Fee structure
- Placements: Average package, Highest package, Top recruiters, Placement %
- Facilities: Hostel, Library, Labs, Sports, WiFi, Canteen
- Rankings: NIRF, QS, THE, country-specific rankings
- Media: Photos, Videos, Virtual tour link
- Contact: Phone, Email, Website, Social media links
- Reviews: Average rating, Number of reviews

#### M2: Admission Guidance Module
**Purpose:** Step-by-step guides for application processes.

**Content Structure:**
- Country-wise guides (India, USA, UK, Canada, Australia, Germany, etc.)
- Degree-level guides (Undergraduate, Postgraduate, PhD, Diploma)
- Application process walkthrough
- Essay/SOP writing tips with templates
- Interview preparation (common questions, video tips)
- Document checklist generator
- LOR request templates
- Test preparation guides (SAT, GRE, GMAT, IELTS, TOEFL, JEE, NEET, CAT)
- Timeline planner tool

#### M3: Career Guidance Module
**Purpose:** Help students make informed career decisions.

**Content Structure:**
- Career path explorer (interactive visual career maps)
- Career quiz / aptitude assessment
- Industry-wise career information
- Required skills per career path
- Salary ranges by role, experience, and location
- Skill development resources (online courses, certifications)
- Industry trends and reports
- Job market insights
- Professional day-in-the-life profiles

#### M4: Student Dashboard Module
**Purpose:** Personalized control center for each student.

**Features:**
- Profile: Academic history, test scores, interests, preferred locations
- Application Tracker: Kanban-style board (Researching → Applying → Applied → Accepted → Enrolled)
- Saved Colleges: Bookmarked colleges with quick compare
- Deadline Calendar: Monthly/weekly view with color-coded deadlines
- Notifications: In-app alerts for deadlines, new colleges, blog updates
- Documents: Upload, organize, and manage application documents
- Progress: Profile completion %, application progress

#### M5: Blog/Resource Section
**Purpose:** Content hub for educational articles and resources.

**Features:**
- Categories: Admission tips, Career advice, Study abroad, Exam prep, Student life
- Tags for cross-referencing
- Featured/trending articles
- Author profiles
- Related article suggestions
- Social sharing
- Newsletter signup

#### M6: Scholarship & Financial Aid (NEW)
**Purpose:** Aggregate scholarship opportunities and financial planning tools.

**Features:**
- Searchable scholarship database
- Filter by: Country, Degree, Field, Amount, Eligibility
- Auto-match scholarships to student profile
- Deadline tracking with reminders
- Education loan information
- Cost of living calculator by city

#### M7: Entrance Exams (NEW)
**Purpose:** Central hub for exam information and preparation.

**Features:**
- Exam database: JEE, NEET, CAT, SAT, GRE, GMAT, IELTS, TOEFL, etc.
- Exam dates and registration deadlines
- Syllabus and exam pattern
- Preparation tips and resources
- Exam-to-college mapping
- Previous year papers (links)

#### M8: Reviews & Ratings (NEW)
**Purpose:** Peer-driven college feedback system.

**Features:**
- Multi-parameter ratings (Academics, Placement, Infrastructure, Faculty, Campus Life)
- Written reviews with text
- Moderation queue for admin
- Verified student badge
- Helpful/unhelpful voting

#### M9: Counselor Booking (NEW)
**Purpose:** Connect students with professional guidance counselors.

**Features:**
- Counselor profiles (specialization, experience, ratings)
- Calendar-based slot booking
- Video call link generation
- Session notes
- Follow-up scheduling

---

## 9. User Flows

### UF-01: New Student Registration & Onboarding
```
Landing Page → Click "Sign Up"
→ Registration Form (Name, Email, Phone, Password, Role: Student)
→ Email Verification
→ Profile Setup Wizard:
    Step 1: Academic Details (Current education level, Marks/GPA, Board/University)
    Step 2: Interests (Preferred fields, Career interests)
    Step 3: Preferences (Preferred countries, Budget range, Degree level)
    Step 4: Test Scores (Optional: SAT, GRE, IELTS, etc.)
→ Dashboard (with recommended colleges based on profile)
```

### UF-02: College Discovery & Comparison
```
Home/Navbar → Click "Colleges" or use Search Bar
→ College Listing Page (card view with filters sidebar)
→ Apply Filters (Country: India, Course: B.Tech, Fee: Under 5L)
→ Browse Results → Click College Card
→ College Detail Page (tabs: Overview, Courses, Fees, Admissions, Placements, Reviews)
→ Click "Add to Compare" (max 4) OR "Save to Dashboard"
→ Click "Compare" button → Comparison Page (side-by-side table)
→ Click "Apply Guidance" → Admission Guide for that college type
```

### UF-03: Application Tracking
```
Dashboard → Click "Add New Application"
→ Select College (from saved or search)
→ Set Status (Researching)
→ Add Deadline Date
→ Upload Required Documents
→ Move through stages: Researching → Preparing → Applied → Under Review → Accepted/Rejected
→ System sends reminders 30, 7, 3, 1 days before deadline
```

### UF-04: Career Exploration
```
Navbar → Click "Career Guidance"
→ Career Hub Page → Click "Take Career Quiz"
→ Answer 15-20 questions about interests, skills, values
→ Get Results: Top 5 Career Matches with compatibility %
→ Click a Career → Career Detail Page (description, skills needed, salary, growth, related courses)
→ Click "Find Colleges for this Career" → Filtered college listing
```

### UF-05: Blog & Resource Consumption
```
Navbar → Click "Resources/Blog"
→ Blog Listing Page (filter by category/tag)
→ Click Article → Full Article Page
→ Related Articles shown at bottom
→ Click "Share" → Social media share options
→ Click "Subscribe" → Newsletter signup modal
```

### UF-06: Counselor Booking
```
Dashboard → Click "Book a Counselor"
→ Counselor Listing (filter by specialization, rating)
→ Click Counselor Profile → View details, reviews
→ Click "Book Session" → Calendar with available slots
→ Select Date & Time → Confirm Booking
→ Receive Email with Video Call Link
→ Post-session: Rate counselor
```

---

## 10. Page-by-Page Breakdown (Responsive Web)

### P01: Landing Page / Home
**Purpose:** First impression, explain value, drive sign-ups

**Desktop Layout:**
- Hero section: Full-width banner with tagline, search bar, CTA buttons ("Explore Colleges" / "Sign Up Free")
- Stats bar: X+ Colleges, Y+ Students, Z+ Countries
- Featured Colleges carousel (6 cards visible)
- How it Works section (3-step visual guide)
- Popular Categories grid (Engineering, Medical, MBA, Arts, Study Abroad)
- Testimonials slider
- Latest Blog Posts (3 cards)
- Newsletter signup banner
- Footer (links, social media, contact)

**Mobile Layout:**
- Hamburger menu
- Hero section: Stacked layout, prominent search bar, single CTA
- Stats bar: 2x2 grid
- Featured Colleges: Horizontal scrollable cards
- How it Works: Vertical stacked steps
- Categories: 2-column grid
- Single testimonial with swipe
- 1 blog card with "View All" link
- Sticky bottom nav: Home, Search, Dashboard, Menu

### P02: College Listing Page
**Desktop Layout:**
- Top: Breadcrumb, search bar with autocomplete
- Left sidebar: Filters (country, state, course, fee range sliders, ranking, college type checkboxes)
- Right: Results count, sort dropdown, view toggle (grid/list)
- College cards: Image, name, location, rating, top courses, fee range, CTA buttons (View / Compare / Save)
- Pagination at bottom

**Mobile Layout:**
- Search bar at top
- Filter button → Opens bottom sheet with filters
- Sort button → Dropdown
- Cards: Stacked full-width, compact layout
- Infinite scroll instead of pagination
- Floating "Compare (X)" button when colleges added

### P03: College Detail Page
**Desktop Layout:**
- Hero: College banner image, logo, name, location, rating, quick stats
- Sticky tab navigation: Overview | Courses | Fees | Admissions | Placements | Reviews | Gallery
- Overview tab: Description, key facts grid, location map, contact info
- Courses tab: Accordion list with eligibility per course
- Fees tab: Table with breakdown
- Admissions tab: Deadlines, required exams, process steps
- Placements tab: Stats, top recruiters logos, salary chart
- Reviews tab: Average rating breakdown, review cards, write review CTA
- Sidebar: Quick actions (Save, Compare, Apply Guidance, Share), Similar Colleges

**Mobile Layout:**
- Scrollable tabs (horizontal)
- Collapsed sidebar actions → Sticky bottom action bar (Save, Compare, Share)
- Accordion sections for dense content
- Full-width tables with horizontal scroll

### P04: College Comparison Page
**Desktop Layout:**
- 2-4 column layout with college headers
- Rows: Rating, Fees, Courses, Ranking, Placement %, Avg Package, Facilities, Deadlines
- Highlighted best value per row
- Remove/swap college buttons
- Print/PDF export button

**Mobile Layout:**
- 2-column max, swipe for more
- Sticky college name headers
- Collapsible category rows

### P05: Admission Guidance Hub
**Desktop Layout:**
- Hero: "Your Admission Journey Starts Here"
- Category cards: By Country, By Degree Level, By Exam
- Featured guides carousel
- Step-by-step process timeline (visual)
- Download checklist CTA

**Mobile Layout:**
- Vertical card stack
- Expandable timeline steps
- Sticky "Download Checklist" button

### P06: Career Guidance Hub
**Desktop Layout:**
- Hero with "Take Career Quiz" CTA
- Career path explorer (interactive tree/map)
- Industry cards grid
- Trending careers section
- Salary insights charts
- Skill development resources

**Mobile Layout:**
- Simplified career path (list view instead of tree)
- Swipeable industry cards
- Collapsible sections

### P07: Student Dashboard
**Desktop Layout:**
- Left sidebar: Navigation (Profile, Applications, Saved, Calendar, Notifications, Documents)
- Main content area switches per section
- Top bar: Welcome message, profile completion %, notification bell
- Application Tracker: Kanban board with drag-and-drop
- Calendar: Monthly view with deadline dots
- Quick Stats cards at top

**Mobile Layout:**
- Bottom tab navigation (replaces sidebar)
- Application Tracker: List view with status badges (Kanban too complex for mobile)
- Calendar: Agenda/list view by default
- Pull-to-refresh on all sections

### P08: Blog/Resources Page
**Desktop Layout:**
- Featured article hero (large card)
- Category tabs/pills
- 3-column article grid
- Sidebar: Popular posts, categories, tags cloud, newsletter signup

**Mobile Layout:**
- Single column card list
- Category horizontal scroll pills
- No sidebar (integrated into main flow)

### P09: Scholarship Page
**Desktop Layout:**
- Search + filter (similar to college listing)
- Scholarship cards: Name, amount, eligibility summary, deadline, apply link
- Eligibility checker tool in sidebar

**Mobile Layout:**
- Bottom sheet filters
- Stacked cards
- Eligibility checker as separate tab

### P10: Entrance Exams Page
**Desktop Layout:**
- Exam category tabs (Engineering, Medical, Management, Abroad)
- Exam cards: Name, date, registration deadline, quick links
- Upcoming exams timeline
- Preparation resources section

**Mobile Layout:**
- Swipeable category tabs
- Compact exam cards
- Countdown badges for upcoming exams

### P11: Login / Register Pages
**Desktop Layout:**
- Split screen: Left = branding/illustration, Right = form
- Social login buttons at top
- Form fields with inline validation
- Terms & conditions checkbox

**Mobile Layout:**
- Full-width form
- Social login buttons prominent
- Minimal branding (logo only)

### P12: Contact / About Pages
**Desktop Layout:**
- About: Team section, mission, vision, stats
- Contact: Form + map + contact details side-by-side

**Mobile Layout:**
- Stacked sections
- Click-to-call phone numbers
- Click-to-email addresses

### P13: Admin Panel
**Desktop Only (minimum 1024px):**
- Left sidebar navigation
- Dashboard with charts (users, traffic, colleges, popular searches)
- Data tables with search, filter, sort, bulk actions
- CRUD modals for content management
- Review moderation queue

---

## 11. Tech Stack

### Frontend (Updated from original)
| Component | Technology | Reason |
|-----------|-----------|--------|
| Framework | **React.js 18+** with **Next.js 14+** | SEO-friendly SSR, fast routing, responsive by design |
| Styling | **Tailwind CSS 3+** | Utility-first, responsive classes built-in, smaller bundle |
| UI Components | **shadcn/ui** | Accessible, customizable, professional components |
| State Management | **React Context + TanStack Query** | Server state caching, minimal client state |
| Forms | **React Hook Form + Zod** | Performant forms with schema validation |
| Charts | **Recharts** | Dashboard analytics visualization |
| Calendar | **React Big Calendar** | Deadline calendar in dashboard |
| Rich Text Editor | **TipTap** | Blog/guide content editing in admin |
| Icons | **Lucide React** | Consistent, lightweight icon set |

### Backend (Aligned with original)
| Component | Technology | Reason |
|-----------|-----------|--------|
| Framework | **Python Django 5+** | Original team expertise, robust ORM, admin panel |
| API | **Django REST Framework** | RESTful API for React frontend |
| Authentication | **django-allauth + JWT** | Social auth + token-based auth for SPA |
| Task Queue | **Celery + Redis** | Email notifications, deadline reminders |
| Search | **django-filter + PostgreSQL Full Text** | Advanced filtering and search |
| File Storage | **Django Storages + AWS S3 / Cloudinary** | Document & image uploads |
| CORS | **django-cors-headers** | Cross-origin for separate frontend |

### Database (Updated from original)
| Component | Technology | Reason |
|-----------|-----------|--------|
| Primary DB | **PostgreSQL 15+** | Superior to MySQL for JSON, full-text search, array fields |
| Cache | **Redis** | Session cache, query cache, Celery broker |
| Search Index | **PostgreSQL GIN indexes** | Full-text search without extra infra (Phase 1) |

> **Note:** Original spec used MySQL. PostgreSQL is recommended for production due to better JSON support, full-text search, and array fields. MySQL can be used if team prefers, with minimal changes.

### DevOps & Infrastructure
| Component | Technology | Reason |
|-----------|-----------|--------|
| Hosting (Frontend) | **Vercel** | Zero-config Next.js deployment, global CDN |
| Hosting (Backend) | **Railway / Render / AWS EC2** | Django deployment with managed PostgreSQL |
| Version Control | **Git + GitHub** | Collaboration and CI/CD |
| CI/CD | **GitHub Actions** | Automated testing and deployment |
| Monitoring | **Sentry** | Error tracking |
| Analytics | **Google Analytics 4 + PostHog** | User behavior analytics |

---

## 12. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│                                                                  │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│   │   Desktop     │    │   Tablet     │    │   Mobile     │      │
│   │   Browser     │    │   Browser    │    │   Browser    │      │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘      │
│          │                    │                    │              │
│          └────────────────────┼────────────────────┘              │
│                               │                                  │
│                    ┌──────────▼──────────┐                       │
│                    │  Next.js Frontend   │                       │
│                    │  (React + Tailwind) │                       │
│                    │  Hosted on Vercel   │                       │
│                    └──────────┬──────────┘                       │
└───────────────────────────────┼──────────────────────────────────┘
                                │ HTTPS / REST API
┌───────────────────────────────┼──────────────────────────────────┐
│                        SERVER LAYER                               │
│                               │                                  │
│                    ┌──────────▼──────────┐                       │
│                    │   Django REST API   │                       │
│                    │   (DRF + JWT Auth)  │                       │
│                    └──────────┬──────────┘                       │
│                               │                                  │
│              ┌────────────────┼────────────────┐                 │
│              │                │                │                 │
│    ┌─────────▼──────┐ ┌──────▼───────┐ ┌─────▼──────────┐      │
│    │  PostgreSQL    │ │    Redis     │ │  Celery Worker │      │
│    │  (Primary DB)  │ │  (Cache +    │ │  (Background   │      │
│    │                │ │   Broker)    │ │   Tasks)       │      │
│    └────────────────┘ └──────────────┘ └────────────────┘      │
│                                                                  │
│    ┌────────────────┐ ┌──────────────┐ ┌────────────────┐      │
│    │  AWS S3 /      │ │  SMTP Email  │ │  Google OAuth  │      │
│    │  Cloudinary    │ │  Service     │ │  Provider      │      │
│    │  (File Store)  │ │  (SendGrid)  │ │                │      │
│    └────────────────┘ └──────────────┘ └────────────────┘      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 13. Database Schema Design

### Core Tables

#### users
```
users
├── id (PK, UUID)
├── email (UNIQUE, NOT NULL)
├── password_hash (NOT NULL)
├── first_name (VARCHAR 100)
├── last_name (VARCHAR 100)
├── phone (VARCHAR 15)
├── role (ENUM: student, parent, counselor, college_rep, admin)
├── avatar_url (VARCHAR 500)
├── is_email_verified (BOOLEAN, DEFAULT false)
├── is_active (BOOLEAN, DEFAULT true)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### student_profiles
```
student_profiles
├── id (PK, UUID)
├── user_id (FK → users.id, UNIQUE)
├── date_of_birth (DATE)
├── gender (ENUM: male, female, other, prefer_not_to_say)
├── current_education_level (ENUM: high_school, undergraduate, graduate)
├── institution_name (VARCHAR 200)
├── board_university (VARCHAR 200)
├── gpa_percentage (DECIMAL 5,2)
├── preferred_countries (JSON ARRAY)
├── preferred_fields (JSON ARRAY)
├── preferred_degree_level (ENUM: ug, pg, phd, diploma)
├── budget_min (DECIMAL 12,2)
├── budget_max (DECIMAL 12,2)
├── budget_currency (VARCHAR 3, DEFAULT 'INR')
├── test_scores (JSON: {sat: 1400, gre: 320, ielts: 7.5, ...})
├── bio (TEXT)
├── profile_completion_pct (INT, DEFAULT 0)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### colleges
```
colleges
├── id (PK, UUID)
├── name (VARCHAR 300, NOT NULL)
├── slug (VARCHAR 300, UNIQUE)
├── type (ENUM: government, private, deemed, autonomous)
├── established_year (INT)
├── description (TEXT)
├── logo_url (VARCHAR 500)
├── banner_url (VARCHAR 500)
├── website (VARCHAR 500)
├── email (VARCHAR 200)
├── phone (VARCHAR 20)
├── country (VARCHAR 100, NOT NULL)
├── state (VARCHAR 100)
├── city (VARCHAR 100)
├── address (TEXT)
├── latitude (DECIMAL 10,8)
├── longitude (DECIMAL 11,8)
├── ranking_nirf (INT)
├── ranking_qs (INT)
├── ranking_the (INT)
├── accreditation (VARCHAR 200)
├── avg_package_lpa (DECIMAL 8,2)
├── highest_package_lpa (DECIMAL 8,2)
├── placement_percentage (DECIMAL 5,2)
├── total_students (INT)
├── total_faculty (INT)
├── campus_area_acres (DECIMAL 8,2)
├── facilities (JSON ARRAY: ["hostel","library","wifi",...])
├── social_links (JSON: {facebook, twitter, instagram, linkedin, youtube})
├── is_featured (BOOLEAN, DEFAULT false)
├── is_active (BOOLEAN, DEFAULT true)
├── avg_rating (DECIMAL 3,2, DEFAULT 0)
├── total_reviews (INT, DEFAULT 0)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### courses
```
courses
├── id (PK, UUID)
├── college_id (FK → colleges.id)
├── name (VARCHAR 200, NOT NULL)
├── degree_level (ENUM: ug, pg, phd, diploma, certificate)
├── department (VARCHAR 200)
├── duration_years (DECIMAL 3,1)
├── fee_per_year (DECIMAL 12,2)
├── fee_currency (VARCHAR 3, DEFAULT 'INR')
├── total_fee (DECIMAL 12,2)
├── eligibility_criteria (TEXT)
├── min_percentage (DECIMAL 5,2)
├── required_exams (JSON ARRAY)
├── seats_available (INT)
├── specializations (JSON ARRAY)
├── is_active (BOOLEAN, DEFAULT true)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### admission_deadlines
```
admission_deadlines
├── id (PK, UUID)
├── college_id (FK → colleges.id)
├── course_id (FK → courses.id, NULLABLE)
├── academic_year (VARCHAR 10: "2026-27")
├── application_open_date (DATE)
├── application_close_date (DATE)
├── exam_date (DATE, NULLABLE)
├── result_date (DATE, NULLABLE)
├── counseling_start_date (DATE, NULLABLE)
├── notes (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### applications (Student Application Tracker)
```
applications
├── id (PK, UUID)
├── student_id (FK → users.id)
├── college_id (FK → colleges.id)
├── course_id (FK → courses.id, NULLABLE)
├── status (ENUM: researching, preparing, applied, under_review, accepted, rejected, enrolled, withdrawn)
├── deadline_date (DATE)
├── applied_date (DATE, NULLABLE)
├── result_date (DATE, NULLABLE)
├── notes (TEXT)
├── priority (ENUM: dream, target, safety)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### saved_colleges
```
saved_colleges
├── id (PK, UUID)
├── user_id (FK → users.id)
├── college_id (FK → colleges.id)
├── created_at (TIMESTAMP)
└── UNIQUE (user_id, college_id)
```

#### reviews
```
reviews
├── id (PK, UUID)
├── user_id (FK → users.id)
├── college_id (FK → colleges.id)
├── rating_overall (INT 1-5)
├── rating_academics (INT 1-5)
├── rating_placements (INT 1-5)
├── rating_infrastructure (INT 1-5)
├── rating_faculty (INT 1-5)
├── rating_campus_life (INT 1-5)
├── review_text (TEXT)
├── is_verified (BOOLEAN, DEFAULT false)
├── is_approved (BOOLEAN, DEFAULT false)
├── helpful_count (INT, DEFAULT 0)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### blog_posts
```
blog_posts
├── id (PK, UUID)
├── author_id (FK → users.id)
├── title (VARCHAR 300)
├── slug (VARCHAR 300, UNIQUE)
├── excerpt (VARCHAR 500)
├── content (TEXT / Rich HTML)
├── cover_image_url (VARCHAR 500)
├── category (ENUM: admission_tips, career_advice, study_abroad, exam_prep, student_life, scholarships)
├── tags (JSON ARRAY)
├── is_featured (BOOLEAN, DEFAULT false)
├── is_published (BOOLEAN, DEFAULT false)
├── published_at (TIMESTAMP)
├── views_count (INT, DEFAULT 0)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### scholarships
```
scholarships
├── id (PK, UUID)
├── name (VARCHAR 300)
├── provider (VARCHAR 300)
├── description (TEXT)
├── amount (DECIMAL 12,2)
├── currency (VARCHAR 3)
├── eligibility_criteria (TEXT)
├── applicable_countries (JSON ARRAY)
├── applicable_degree_levels (JSON ARRAY)
├── applicable_fields (JSON ARRAY)
├── deadline (DATE)
├── application_url (VARCHAR 500)
├── is_active (BOOLEAN, DEFAULT true)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### entrance_exams
```
entrance_exams
├── id (PK, UUID)
├── name (VARCHAR 200)
├── full_name (VARCHAR 500)
├── category (ENUM: engineering, medical, management, law, abroad, government)
├── conducting_body (VARCHAR 300)
├── description (TEXT)
├── exam_date (DATE)
├── registration_open (DATE)
├── registration_close (DATE)
├── result_date (DATE)
├── syllabus_url (VARCHAR 500)
├── official_website (VARCHAR 500)
├── preparation_tips (TEXT)
├── is_active (BOOLEAN, DEFAULT true)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### notifications
```
notifications
├── id (PK, UUID)
├── user_id (FK → users.id)
├── type (ENUM: deadline_reminder, new_college, application_update, blog_post, scholarship, system)
├── title (VARCHAR 200)
├── message (TEXT)
├── link (VARCHAR 500)
├── is_read (BOOLEAN, DEFAULT false)
├── created_at (TIMESTAMP)
└── read_at (TIMESTAMP, NULLABLE)
```

#### counselors
```
counselors
├── id (PK, UUID)
├── user_id (FK → users.id, UNIQUE)
├── specialization (JSON ARRAY: ["study_abroad","engineering","mba"])
├── experience_years (INT)
├── bio (TEXT)
├── hourly_rate (DECIMAL 8,2)
├── avg_rating (DECIMAL 3,2, DEFAULT 0)
├── total_sessions (INT, DEFAULT 0)
├── is_available (BOOLEAN, DEFAULT true)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### counselor_bookings
```
counselor_bookings
├── id (PK, UUID)
├── counselor_id (FK → counselors.id)
├── student_id (FK → users.id)
├── session_date (DATE)
├── start_time (TIME)
├── end_time (TIME)
├── status (ENUM: scheduled, completed, cancelled, no_show)
├── meeting_link (VARCHAR 500)
├── notes (TEXT)
├── rating (INT 1-5, NULLABLE)
├── feedback (TEXT, NULLABLE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### documents
```
documents
├── id (PK, UUID)
├── user_id (FK → users.id)
├── application_id (FK → applications.id, NULLABLE)
├── name (VARCHAR 200)
├── file_url (VARCHAR 500)
├── file_type (VARCHAR 50)
├── file_size_bytes (BIGINT)
├── category (ENUM: transcript, resume, sop, lor, certificate, id_proof, photo, other)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

#### parent_student_links
```
parent_student_links
├── id (PK, UUID)
├── parent_id (FK → users.id)
├── student_id (FK → users.id)
├── invite_code (VARCHAR 20, UNIQUE)
├── status (ENUM: pending, active, revoked)
├── created_at (TIMESTAMP)
└── accepted_at (TIMESTAMP, NULLABLE)
```

---

## 14. API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login (returns JWT) |
| POST | `/api/auth/logout/` | Logout (blacklist token) |
| POST | `/api/auth/refresh/` | Refresh JWT token |
| POST | `/api/auth/verify-email/` | Verify email with token |
| POST | `/api/auth/forgot-password/` | Request password reset |
| POST | `/api/auth/reset-password/` | Reset password with token |
| GET | `/api/auth/google/` | Google OAuth redirect |
| GET | `/api/auth/google/callback/` | Google OAuth callback |

### Users & Profiles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me/` | Get current user profile |
| PUT | `/api/users/me/` | Update current user profile |
| GET | `/api/users/me/student-profile/` | Get student profile |
| PUT | `/api/users/me/student-profile/` | Update student profile |
| DELETE | `/api/users/me/` | Deactivate account |

### Colleges
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/colleges/` | List colleges (with search, filter, sort, pagination) |
| GET | `/api/colleges/:slug/` | Get college detail |
| GET | `/api/colleges/:slug/courses/` | Get courses for a college |
| GET | `/api/colleges/:slug/deadlines/` | Get deadlines for a college |
| GET | `/api/colleges/:slug/reviews/` | Get reviews for a college |
| GET | `/api/colleges/featured/` | Get featured colleges |
| GET | `/api/colleges/compare/?ids=1,2,3` | Compare colleges |

### Saved Colleges
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/saved-colleges/` | List saved colleges |
| POST | `/api/saved-colleges/` | Save a college |
| DELETE | `/api/saved-colleges/:college_id/` | Unsave a college |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/applications/` | List user's applications |
| POST | `/api/applications/` | Create new application |
| PUT | `/api/applications/:id/` | Update application |
| PATCH | `/api/applications/:id/status/` | Update application status |
| DELETE | `/api/applications/:id/` | Delete application |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews/` | Submit a review |
| PUT | `/api/reviews/:id/` | Edit own review |
| DELETE | `/api/reviews/:id/` | Delete own review |
| POST | `/api/reviews/:id/helpful/` | Mark review as helpful |

### Blog
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blog/` | List published posts (filter by category, tag) |
| GET | `/api/blog/:slug/` | Get post detail |
| GET | `/api/blog/featured/` | Get featured posts |
| GET | `/api/blog/categories/` | List categories with post count |

### Scholarships
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/scholarships/` | List scholarships (with filters) |
| GET | `/api/scholarships/:id/` | Get scholarship detail |
| GET | `/api/scholarships/recommended/` | Get recommended based on profile |

### Entrance Exams
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exams/` | List exams (with filters) |
| GET | `/api/exams/:id/` | Get exam detail |
| GET | `/api/exams/upcoming/` | Get upcoming exams |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications/` | List user notifications |
| PATCH | `/api/notifications/:id/read/` | Mark as read |
| POST | `/api/notifications/read-all/` | Mark all as read |
| GET | `/api/notifications/unread-count/` | Get unread count |

### Counselors
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/counselors/` | List counselors |
| GET | `/api/counselors/:id/` | Get counselor detail |
| GET | `/api/counselors/:id/availability/` | Get available slots |
| POST | `/api/counselors/:id/book/` | Book a session |
| POST | `/api/counselor-bookings/:id/cancel/` | Cancel booking |
| POST | `/api/counselor-bookings/:id/rate/` | Rate completed session |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/documents/` | List user documents |
| POST | `/api/documents/` | Upload document |
| DELETE | `/api/documents/:id/` | Delete document |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search/?q=term` | Global search across all entities |
| GET | `/api/search/autocomplete/?q=term` | Autocomplete suggestions |

### Admin (Admin-only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/colleges/` | Create college |
| PUT | `/api/admin/colleges/:id/` | Update college |
| DELETE | `/api/admin/colleges/:id/` | Delete college |
| POST | `/api/admin/colleges/bulk-import/` | Bulk import from CSV |
| GET | `/api/admin/users/` | List all users |
| PATCH | `/api/admin/users/:id/` | Update user status |
| GET | `/api/admin/reviews/pending/` | Get pending reviews |
| PATCH | `/api/admin/reviews/:id/approve/` | Approve review |
| PATCH | `/api/admin/reviews/:id/reject/` | Reject review |
| GET | `/api/admin/analytics/dashboard/` | Get dashboard stats |
| POST | `/api/admin/blog/` | Create blog post |
| PUT | `/api/admin/blog/:id/` | Update blog post |

---

## 15. Third-Party Integrations

| Integration | Purpose | Priority |
|-------------|---------|----------|
| **Google OAuth 2.0** | Social login | Must Have |
| **SendGrid / Resend** | Transactional emails (verification, reminders) | Must Have |
| **Cloudinary / AWS S3** | Image & document storage | Must Have |
| **Google Maps Embed API** | College location maps | Should Have |
| **Google Analytics 4** | Website traffic analytics | Must Have |
| **Google reCAPTCHA v3** | Bot protection on forms | Should Have |
| **Sentry** | Error monitoring and alerting | Should Have |
| **PostHog** | Product analytics (user behavior) | Could Have |
| **Google Meet / Zoom API** | Counselor video sessions | Could Have (Phase 2) |
| **Razorpay / Stripe** | Counselor session payments (future) | Could Have (Phase 3) |

---

## 16. Hardware & Software Requirements

### Development Environment
| Component | Requirement |
|-----------|-------------|
| OS | Windows 10/11, macOS 12+, Linux (Ubuntu 20.04+) |
| Processor | Intel i3 / AMD Ryzen 3 or higher |
| RAM | 8 GB minimum (4 GB absolute minimum) |
| Storage | 50 GB free space |
| Internet | 10 Mbps or higher |
| IDE | VS Code (with ESLint, Prettier, Python, Tailwind plugins) or PyCharm |
| Runtime | Node.js 18+ (frontend), Python 3.11+ (backend) |
| Database | PostgreSQL 15+ (local) |
| Cache | Redis 7+ (local or Docker) |
| Browser | Chrome 100+, Firefox 100+, Safari 16+, Edge 100+ |
| Version Control | Git 2.30+ |
| Containerization | Docker (optional but recommended) |

### Production Server Requirements
| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | 2 vCPU | 4 vCPU |
| RAM | 4 GB | 8 GB |
| Storage | 50 GB SSD | 100 GB SSD |
| Bandwidth | 100 GB/month | Unlimited |
| SSL Certificate | Required (Let's Encrypt free) | Required |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |

---

## 17. Security Requirements

| # | Requirement | Implementation |
|---|-------------|----------------|
| S1 | Authentication | JWT tokens with refresh rotation, httpOnly cookies |
| S2 | Password Security | bcrypt hashing, minimum 8 chars, complexity rules |
| S3 | Input Validation | Server-side validation on all inputs, Zod schemas on frontend |
| S4 | SQL Injection Prevention | Django ORM (parameterized queries), no raw SQL |
| S5 | XSS Prevention | React auto-escaping, Content Security Policy headers |
| S6 | CSRF Protection | Django CSRF middleware, SameSite cookies |
| S7 | Rate Limiting | django-ratelimit on auth and API endpoints |
| S8 | HTTPS | Enforced via HSTS headers, redirect HTTP to HTTPS |
| S9 | File Upload Validation | Type checking, size limits (5MB), malware scan |
| S10 | CORS | Whitelist only frontend domain |
| S11 | Data Encryption | TLS in transit, AES-256 at rest for sensitive data |
| S12 | Secrets Management | Environment variables, never in code |
| S13 | Dependency Scanning | GitHub Dependabot, pip-audit, npm audit |
| S14 | Admin Access | 2FA required for admin accounts |
| S15 | Privacy | GDPR-compliant data handling, user data export/delete |

---

## 18. SEO & Performance Requirements

### SEO
| # | Requirement |
|---|-------------|
| SEO-1 | Server-side rendering (SSR) for all public pages |
| SEO-2 | Unique meta title, description, and OG tags per page |
| SEO-3 | Dynamic sitemap.xml generation |
| SEO-4 | robots.txt configuration |
| SEO-5 | Structured data (JSON-LD) for colleges, articles, reviews |
| SEO-6 | Canonical URLs on all pages |
| SEO-7 | Clean URL slugs (e.g., /colleges/iit-bombay) |
| SEO-8 | Image alt tags on all images |
| SEO-9 | Internal linking strategy |
| SEO-10 | 301 redirects for changed URLs |

### Performance
| # | Requirement |
|---|-------------|
| P-1 | Lighthouse score > 85 for Performance, Accessibility, SEO |
| P-2 | Image optimization: WebP format, responsive sizes, lazy loading |
| P-3 | Code splitting per route |
| P-4 | Static page generation for stable content (blog posts, guides) |
| P-5 | API response caching with Redis (TTL: 5 min for listings, 1 hr for static) |
| P-6 | Database query optimization with indexes on searchable columns |
| P-7 | Gzip/Brotli compression |
| P-8 | CDN for static assets (Vercel Edge Network) |
| P-9 | Bundle size budget: < 200KB initial JS |
| P-10 | Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1 |

---

## 19. Success Metrics & KPIs

### User Acquisition
| Metric | Target (6 months) | Target (1 year) |
|--------|-------------------|-----------------|
| Registered users | 5,000 | 25,000 |
| Monthly active users | 2,000 | 10,000 |
| Daily active users | 500 | 3,000 |

### Engagement
| Metric | Target |
|--------|--------|
| Avg session duration | > 4 minutes |
| Pages per session | > 3 |
| Return visitor rate | > 40% |
| Dashboard usage (weekly) | > 60% of registered users |
| College saves per user | > 5 average |
| Applications tracked per user | > 3 average |

### Content
| Metric | Target (6 months) |
|--------|-------------------|
| Colleges listed | 500+ (India) + 200+ (Abroad) |
| Blog posts published | 100+ |
| Admission guides | 20+ country/degree combos |
| Scholarships listed | 200+ |

### Technical
| Metric | Target |
|--------|--------|
| Page load time | < 2 seconds |
| API uptime | 99.5% |
| Error rate | < 0.5% |
| Mobile traffic share | > 60% |

### Business
| Metric | Target |
|--------|--------|
| User satisfaction (NPS) | > 50 |
| Counselor booking rate | > 5% of active users |
| Newsletter subscribers | > 20% of registered users |

---

## 20. Risk Assessment

| # | Risk | Probability | Impact | Mitigation |
|---|------|-------------|--------|------------|
| R1 | Inaccurate college data | High | High | Partner with colleges for verified data; admin review process; user-reported errors |
| R2 | Low initial user adoption | Medium | High | SEO strategy, social media marketing, college partnerships, referral program |
| R3 | Data scraping by competitors | Medium | Medium | Rate limiting, CAPTCHA, terms of service, legal protection |
| R4 | Server downtime during peak admission season | Medium | High | Auto-scaling, load balancing, CDN, monitoring alerts |
| R5 | Security breach / data leak | Low | Critical | Security audit, penetration testing, encrypted data, regular backups |
| R6 | Scope creep delaying launch | High | Medium | Strict MVP definition, phased releases, weekly sprint reviews |
| R7 | Team member unavailability | Medium | Medium | Code documentation, pair programming, knowledge sharing |
| R8 | Third-party API changes/deprecation | Low | Medium | Abstraction layers, fallback mechanisms, monitoring |
| R9 | Mobile performance issues | Medium | High | Mobile-first design, performance budgets, testing on real devices |
| R10 | Content going stale (outdated deadlines) | High | High | Automated deadline alerts for admins, crowdsourced updates, annual audit cycle |

---

## 21. Project Timeline & Milestones

### Phase 1: MVP (Weeks 1-8)
| Week | Milestone | Deliverables |
|------|-----------|-------------|
| 1-2 | **Project Setup & Design** | Repo setup, Figma designs, DB schema finalized, dev environment |
| 3-4 | **Auth + College Listings** | Registration, login, college CRUD, listing page with search/filter |
| 5-6 | **Dashboard + Content** | Student dashboard, application tracker, admission & career guides, blog |
| 7 | **Integration + Polish** | Notifications, saved colleges, responsive testing, bug fixes |
| 8 | **Testing + Deploy** | QA testing, performance optimization, MVP deployment |

### Phase 2: Enhanced Features (Weeks 9-14)
| Week | Milestone | Deliverables |
|------|-----------|-------------|
| 9-10 | **Comparison + Scholarships** | College comparison, scholarship database, entrance exams |
| 11-12 | **Reviews + Advanced Search** | Reviews & ratings, AI recommendations, advanced filters |
| 13-14 | **Parent + Counselor** | Parent dashboard, counselor booking, push notifications |

### Phase 3: Scale & Optimize (Weeks 15-20)
| Week | Milestone | Deliverables |
|------|-----------|-------------|
| 15-16 | **Chat + Community** | Live chat / chatbot, community forum |
| 17-18 | **College Portal + Analytics** | College rep dashboard, analytics dashboard |
| 19-20 | **Optimization + Growth** | Performance optimization, SEO, marketing integrations |

---

## 22. Future Enhancements

| # | Enhancement | Description |
|---|-------------|-------------|
| FE-1 | Mobile App | React Native / Flutter app for iOS and Android |
| FE-2 | AI Chatbot | GPT-powered admission assistant for instant answers |
| FE-3 | Virtual Campus Tours | 360-degree campus tours integrated on college pages |
| FE-4 | Peer Mentorship | Connect current students with aspiring students |
| FE-5 | Visa Guidance Module | Country-specific visa application guidance |
| FE-6 | Accommodation Finder | Hostel/PG/apartment listings near colleges |
| FE-7 | Education Loan Marketplace | Compare and apply for education loans |
| FE-8 | Alumni Network | Connect with alumni for career insights |
| FE-9 | Mock Interview AI | AI-powered mock interview practice |
| FE-10 | Multi-language Support | Hindi, Tamil, Telugu, Kannada, Malayalam |
| FE-11 | Offline Mode (PWA) | Progressive Web App for offline content access |
| FE-12 | WhatsApp Notifications | Deadline reminders via WhatsApp Business API |

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| BRD | Business Requirements Document |
| MVP | Minimum Viable Product |
| SSR | Server-Side Rendering |
| JWT | JSON Web Token |
| ORM | Object-Relational Mapping |
| CRUD | Create, Read, Update, Delete |
| API | Application Programming Interface |
| CDN | Content Delivery Network |
| WCAG | Web Content Accessibility Guidelines |
| SOP | Statement of Purpose |
| LOR | Letter of Recommendation |
| NPS | Net Promoter Score |
| LPA | Lakhs Per Annum |

---

## Appendix B: Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 02 March 2026 | Team EduConnect | Original presentation/abstract |
| 2.0 | 03 April 2026 | Team EduConnect | Full BRD with all missing requirements, responsive design specs, database schema, API design, security, SEO, timeline |

---

*This document serves as the complete specification for building EduConnect as a responsive web application. All development, design, and testing should reference this BRD as the single source of truth.*

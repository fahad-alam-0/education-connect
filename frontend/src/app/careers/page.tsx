"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Compass, TrendingUp, BookOpen, BrainCircuit, Code, Stethoscope,
  BarChart3, Palette, Scale, Cpu, IndianRupee, ArrowRight,
  Globe, Wrench, Building2, Microscope, FlaskConical, Plane,
  Radio, Camera, PenTool, Landmark, Heart, Leaf,
  Truck, ShieldCheck, Database, Monitor, Smartphone, Banknote,
  GraduationCap, Users, Megaphone, Clapperboard, Music, Dumbbell,
  ChefHat, Hotel, Newspaper, Baby, PawPrint, Lightbulb,
} from "lucide-react";

const careerPaths = [
  // Technology & Engineering
  { title: "Software Engineering", icon: Code, salary: "6-50 LPA", growth: "High", demand: "Very High", skills: ["DSA", "System Design", "Full Stack"], category: "Technology" },
  { title: "Data Science & AI", icon: BrainCircuit, salary: "8-60 LPA", growth: "Very High", demand: "Very High", skills: ["Python", "ML", "Statistics"], category: "Technology" },
  { title: "Cybersecurity", icon: ShieldCheck, salary: "8-45 LPA", growth: "Very High", demand: "Very High", skills: ["Networks", "Ethical Hacking", "SIEM"], category: "Technology" },
  { title: "Cloud & DevOps", icon: Database, salary: "8-40 LPA", growth: "Very High", demand: "Very High", skills: ["AWS", "Docker", "Kubernetes"], category: "Technology" },
  { title: "Mobile App Development", icon: Smartphone, salary: "5-35 LPA", growth: "High", demand: "High", skills: ["React Native", "Flutter", "Swift"], category: "Technology" },
  { title: "Blockchain & Web3", icon: Cpu, salary: "10-50 LPA", growth: "High", demand: "Moderate", skills: ["Solidity", "DeFi", "Smart Contracts"], category: "Technology" },
  { title: "Game Development", icon: Monitor, salary: "4-30 LPA", growth: "High", demand: "Moderate", skills: ["Unity", "Unreal", "C++"], category: "Technology" },
  { title: "Robotics & IoT", icon: Wrench, salary: "5-30 LPA", growth: "High", demand: "High", skills: ["Embedded Systems", "ROS", "Sensors"], category: "Technology" },
  { title: "Electronics Engineering", icon: Radio, salary: "4-25 LPA", growth: "Moderate", demand: "High", skills: ["VLSI", "PCB Design", "Signal Processing"], category: "Engineering" },
  { title: "Mechanical Engineering", icon: Wrench, salary: "4-20 LPA", growth: "Moderate", demand: "Moderate", skills: ["CAD/CAM", "Thermal", "Manufacturing"], category: "Engineering" },
  { title: "Civil Engineering", icon: Building2, salary: "4-18 LPA", growth: "Moderate", demand: "Moderate", skills: ["Structural Design", "AutoCAD", "Project Mgmt"], category: "Engineering" },
  { title: "Aerospace Engineering", icon: Plane, salary: "6-30 LPA", growth: "High", demand: "Moderate", skills: ["Aerodynamics", "Propulsion", "CFD"], category: "Engineering" },

  // Healthcare & Sciences
  { title: "Medicine (MBBS/MD)", icon: Stethoscope, salary: "5-30 LPA", growth: "Steady", demand: "High", skills: ["Biology", "Patient Care", "Research"], category: "Healthcare" },
  { title: "Pharmacy", icon: FlaskConical, salary: "3-15 LPA", growth: "Moderate", demand: "High", skills: ["Pharmacology", "Drug Design", "QA"], category: "Healthcare" },
  { title: "Nursing", icon: Heart, salary: "3-12 LPA", growth: "High", demand: "Very High", skills: ["Patient Care", "ICU", "Community Health"], category: "Healthcare" },
  { title: "Dentistry (BDS/MDS)", icon: Stethoscope, salary: "4-20 LPA", growth: "Moderate", demand: "Moderate", skills: ["Oral Surgery", "Orthodontics", "Prosthodontics"], category: "Healthcare" },
  { title: "Psychology & Counseling", icon: Users, salary: "3-18 LPA", growth: "High", demand: "High", skills: ["CBT", "Research Methods", "Clinical Assessment"], category: "Healthcare" },
  { title: "Biotechnology", icon: Microscope, salary: "4-20 LPA", growth: "High", demand: "High", skills: ["Genomics", "Bioinformatics", "Lab Research"], category: "Sciences" },
  { title: "Environmental Science", icon: Leaf, salary: "4-15 LPA", growth: "Very High", demand: "High", skills: ["Sustainability", "EIA", "Climate Science"], category: "Sciences" },
  { title: "Physics & Research", icon: FlaskConical, salary: "4-20 LPA", growth: "Moderate", demand: "Moderate", skills: ["Quantum Mechanics", "Lab Skills", "Modeling"], category: "Sciences" },

  // Business & Management
  { title: "Management & MBA", icon: BarChart3, salary: "10-80 LPA", growth: "High", demand: "High", skills: ["Leadership", "Finance", "Strategy"], category: "Business" },
  { title: "Finance & Banking", icon: Banknote, salary: "6-50 LPA", growth: "High", demand: "High", skills: ["Financial Analysis", "Risk Mgmt", "Excel"], category: "Business" },
  { title: "Chartered Accountant (CA)", icon: BarChart3, salary: "7-40 LPA", growth: "Steady", demand: "High", skills: ["Accounting", "Tax", "Audit"], category: "Business" },
  { title: "Human Resources", icon: Users, salary: "4-25 LPA", growth: "Moderate", demand: "High", skills: ["Recruitment", "HRIS", "Employee Relations"], category: "Business" },
  { title: "Supply Chain & Logistics", icon: Truck, salary: "5-25 LPA", growth: "High", demand: "High", skills: ["SCM", "Inventory", "Operations Research"], category: "Business" },
  { title: "Entrepreneurship", icon: Lightbulb, salary: "Variable", growth: "Very High", demand: "Self-driven", skills: ["Fundraising", "Product-Market Fit", "Leadership"], category: "Business" },

  // Creative & Design
  { title: "UI/UX Design", icon: Palette, salary: "5-35 LPA", growth: "High", demand: "High", skills: ["Figma", "User Research", "Prototyping"], category: "Creative" },
  { title: "Graphic Design", icon: PenTool, salary: "3-18 LPA", growth: "Moderate", demand: "High", skills: ["Photoshop", "Illustrator", "Branding"], category: "Creative" },
  { title: "Film & Video Production", icon: Clapperboard, salary: "3-25 LPA", growth: "High", demand: "Moderate", skills: ["Editing", "Cinematography", "Direction"], category: "Creative" },
  { title: "Animation & VFX", icon: Monitor, salary: "4-25 LPA", growth: "High", demand: "High", skills: ["Maya", "After Effects", "3D Modeling"], category: "Creative" },
  { title: "Photography", icon: Camera, salary: "3-15 LPA", growth: "Moderate", demand: "Moderate", skills: ["Lightroom", "Composition", "Studio Lighting"], category: "Creative" },
  { title: "Fashion Design", icon: Palette, salary: "3-20 LPA", growth: "Moderate", demand: "Moderate", skills: ["Pattern Making", "Textiles", "CAD Fashion"], category: "Creative" },
  { title: "Music & Audio Production", icon: Music, salary: "2-20 LPA", growth: "Moderate", demand: "Moderate", skills: ["DAW", "Mixing", "Music Theory"], category: "Creative" },

  // Marketing & Communication
  { title: "Digital Marketing", icon: TrendingUp, salary: "4-25 LPA", growth: "High", demand: "High", skills: ["SEO", "Analytics", "Content Strategy"], category: "Marketing" },
  { title: "Content Writing & Copywriting", icon: PenTool, salary: "3-15 LPA", growth: "High", demand: "High", skills: ["SEO Writing", "Storytelling", "CMS"], category: "Marketing" },
  { title: "Public Relations", icon: Megaphone, salary: "4-20 LPA", growth: "Moderate", demand: "Moderate", skills: ["Media Relations", "Crisis Mgmt", "Branding"], category: "Marketing" },
  { title: "Journalism & Mass Comm", icon: Newspaper, salary: "3-18 LPA", growth: "Moderate", demand: "Moderate", skills: ["Reporting", "Editing", "Digital Media"], category: "Marketing" },

  // Law & Government
  { title: "Law (Litigation)", icon: Scale, salary: "5-40 LPA", growth: "Moderate", demand: "Moderate", skills: ["Legal Research", "Drafting", "Argumentation"], category: "Law & Govt" },
  { title: "Corporate Law", icon: Scale, salary: "8-50 LPA", growth: "High", demand: "High", skills: ["M&A", "Compliance", "Contract Law"], category: "Law & Govt" },
  { title: "Civil Services (IAS/IPS)", icon: Landmark, salary: "8-15 LPA + Perks", growth: "Steady", demand: "Very High", skills: ["UPSC Prep", "Current Affairs", "Essay Writing"], category: "Law & Govt" },
  { title: "Defense & Armed Forces", icon: ShieldCheck, salary: "6-18 LPA + Perks", growth: "Steady", demand: "High", skills: ["Physical Fitness", "Leadership", "NDA/CDS"], category: "Law & Govt" },

  // Education & Social
  { title: "Teaching & Academics", icon: GraduationCap, salary: "3-15 LPA", growth: "Steady", demand: "High", skills: ["Pedagogy", "Subject Expertise", "EdTech"], category: "Education" },
  { title: "Education Technology", icon: Monitor, salary: "5-30 LPA", growth: "Very High", demand: "High", skills: ["LMS", "Instructional Design", "AI in EdTech"], category: "Education" },
  { title: "Social Work & NGO", icon: Heart, salary: "3-10 LPA", growth: "Moderate", demand: "High", skills: ["Community Dev", "Fundraising", "Counseling"], category: "Education" },
  { title: "Child Development", icon: Baby, salary: "3-10 LPA", growth: "Moderate", demand: "Moderate", skills: ["Child Psychology", "Montessori", "Special Education"], category: "Education" },

  // Hospitality & Lifestyle
  { title: "Hotel Management", icon: Hotel, salary: "3-18 LPA", growth: "High", demand: "High", skills: ["F&B", "Front Office", "Housekeeping"], category: "Hospitality" },
  { title: "Culinary Arts", icon: ChefHat, salary: "3-15 LPA", growth: "High", demand: "Moderate", skills: ["Cuisine", "Food Safety", "Kitchen Mgmt"], category: "Hospitality" },
  { title: "Sports & Fitness", icon: Dumbbell, salary: "3-15 LPA", growth: "High", demand: "High", skills: ["Nutrition", "Coaching", "Sports Science"], category: "Hospitality" },
  { title: "Travel & Tourism", icon: Globe, salary: "3-12 LPA", growth: "High", demand: "High", skills: ["Ticketing", "Itinerary Planning", "Languages"], category: "Hospitality" },
  { title: "Veterinary Science", icon: PawPrint, salary: "4-15 LPA", growth: "Moderate", demand: "Moderate", skills: ["Animal Surgery", "Pathology", "Zoonosis"], category: "Sciences" },
];

const categories = ["All", "Technology", "Engineering", "Healthcare", "Sciences", "Business", "Creative", "Marketing", "Law & Govt", "Education", "Hospitality"];

const trends = [
  { title: "AI & Generative AI roles grew 35% in 2025", category: "Technology" },
  { title: "Remote work opportunities expanding in IT sector", category: "Work Culture" },
  { title: "Healthcare tech emerging as top career choice", category: "Healthcare" },
  { title: "Sustainability roles seeing 50% YoY growth", category: "Green Jobs" },
  { title: "Cybersecurity talent gap widened to 3.5M unfilled positions", category: "Technology" },
  { title: "India's GCC boom creating 500K+ new roles by 2027", category: "Business" },
  { title: "EdTech sector recovery — hiring up 28% in 2025", category: "Education" },
  { title: "Electric vehicle industry creating new engineering roles", category: "Engineering" },
];

const quizQuestions = [
  "Do you enjoy solving complex problems?",
  "Are you more creative or analytical?",
  "Do you prefer working with people or data?",
  "Are you interested in technology?",
  "Do you value job stability over high risk/reward?",
];

export default function CareersPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? careerPaths
    : careerPaths.filter((c) => c.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-16">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
          alt="Professionals collaborating in a modern office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/92 to-teal-50/90 dark:from-emerald-950/92 dark:to-teal-950/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">{careerPaths.length}+ Career Paths</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Career Guidance Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Explore career paths, discover your strengths, and make informed decisions about your future.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white gap-2">
            <Compass className="h-5 w-5" /> Take Career Quiz
          </Button>
        </div>
      </section>

      {/* Career Paths */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-2">Explore Career Paths</h2>
        <p className="text-muted-foreground mb-4">Browse {careerPaths.length} career options across {categories.length - 1} industries</p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-teal-600 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat} {cat !== "All" && <span className="opacity-70">({careerPaths.filter(c => c.category === cat).length})</span>}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} career{filtered.length !== 1 ? "s" : ""} shown</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((career) => {
            const Icon = career.icon;
            return (
              <Card key={career.title} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 group-hover:text-teal-600 transition-colors">{career.title}</h3>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Salary Range</span>
                      <span className="font-medium flex items-center gap-0.5"><IndianRupee className="h-3 w-3" />{career.salary}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Growth</span>
                      <Badge variant="secondary" className="text-[10px]">{career.growth}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Demand</span>
                      <Badge variant="secondary" className="text-[10px]">{career.demand}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {career.skills.map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px] font-normal">{s}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Industry Trends */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Industry Trends 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trends.map((t) => (
              <Card key={t.title}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <TrendingUp className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.title}</p>
                    <Badge variant="secondary" className="text-[10px] mt-1">{t.category}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Quiz Preview */}
      <section className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white border-0">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-3">Not Sure Which Career is Right?</h2>
                <p className="text-teal-100 mb-4">
                  Take our 5-minute career assessment quiz and get personalized recommendations based on your interests, skills, and personality.
                </p>
                <ul className="space-y-2 mb-6">
                  {["Personalized career matches", "Skill gap analysis", "Recommended courses & colleges"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Compass className="h-5 w-5" /> Start Career Quiz
                </Button>
              </div>
              <div className="space-y-3">
                {quizQuestions.slice(0, 3).map((q, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <p className="text-sm">Q{i + 1}: {q}</p>
                  </div>
                ))}
                <p className="text-sm text-teal-200 text-center">+ 12 more questions...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

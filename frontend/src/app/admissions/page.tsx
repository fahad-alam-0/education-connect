import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText, PenLine, MessageSquare, FolderOpen, Globe, GraduationCap,
  BookOpen, ArrowRight, CheckCircle2,
} from "lucide-react";

const guides = [
  { title: "Application Process", description: "Step-by-step walkthrough of the entire application journey, from registration to acceptance.", icon: FileText, color: "from-blue-500 to-blue-600" },
  { title: "Essay & SOP Writing", description: "Tips, templates, and examples for writing compelling Statements of Purpose and application essays.", icon: PenLine, color: "from-purple-500 to-purple-600" },
  { title: "Interview Preparation", description: "Common interview questions, video tips, and strategies to ace your college interview.", icon: MessageSquare, color: "from-amber-500 to-amber-600" },
  { title: "Document Checklist", description: "Complete checklist of required documents for Indian and international college applications.", icon: FolderOpen, color: "from-green-500 to-green-600" },
];

const countryGuides = [
  { country: "India", flag: "🇮🇳", exams: "JEE, NEET, CAT, GATE", highlights: ["NIRF Rankings", "Central Counseling", "State Quota"] },
  { country: "USA", flag: "🇺🇸", exams: "SAT, GRE, GMAT, TOEFL", highlights: ["Common App", "Rolling Admissions", "Need-blind Aid"] },
  { country: "UK", flag: "🇬🇧", exams: "IELTS, A-Levels", highlights: ["UCAS System", "Personal Statement", "3-Year UG"] },
  { country: "Canada", flag: "🇨🇦", exams: "IELTS, GRE", highlights: ["Post-Study Work Permit", "Co-op Programs", "PR Pathway"] },
  { country: "Australia", flag: "🇦🇺", exams: "IELTS, PTE", highlights: ["Group of Eight", "Subclass 500 Visa", "ESOS Act"] },
  { country: "Germany", flag: "🇩🇪", exams: "IELTS, TestDaF", highlights: ["Low/No Tuition", "TU9 Alliance", "Blocked Account"] },
];

const timeline = [
  { month: "12+ months before", task: "Research colleges, take standardized tests", done: true },
  { month: "9-12 months", task: "Shortlist colleges, prepare SOP/essays", done: true },
  { month: "6-9 months", task: "Request LORs, gather documents", done: false },
  { month: "3-6 months", task: "Submit applications, apply for scholarships", done: false },
  { month: "1-3 months", task: "Attend interviews, accept offers", done: false },
  { month: "0-1 months", task: "Visa process, prepare for departure", done: false },
];

export default function AdmissionsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-16">
        <img
          src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80"
          alt="Student writing an application essay"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/92 to-indigo-50/90 dark:from-blue-950/92 dark:to-indigo-950/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">Step-by-Step Guides</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Admission Guidance Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to navigate the college admission process — from application to acceptance, for India and abroad.
          </p>
        </div>
      </section>

      {/* Guide Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Admission Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card key={guide.title} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${guide.color} text-white flex items-center justify-center mb-4 shadow`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-teal-600 transition-colors">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground">{guide.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Country Guides */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2">Country-Wise Admission Guides</h2>
          <p className="text-muted-foreground mb-6">Detailed processes for each destination</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countryGuides.map((g) => (
              <Card key={g.country} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{g.flag}</span>
                    <div>
                      <h3 className="font-semibold">Study in {g.country}</h3>
                      <p className="text-xs text-muted-foreground">Exams: {g.exams}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {g.highlights.map((h) => (
                      <Badge key={h} variant="secondary" className="text-[10px]">{h}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Timeline */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Application Timeline</h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {timeline.map((t, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  t.done ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                }`}>
                  {t.done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                {i < timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-1" />}
              </div>
              <div className="pb-6">
                <p className="text-xs font-medium text-teal-600">{t.month}</p>
                <p className="text-sm">{t.task}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

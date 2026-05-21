import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter } from "@/components/animated-counter";
import {
  Search,
  GraduationCap,
  BookOpen,
  Compass,
  Star,
  ArrowRight,
  MapPin,
  TrendingUp,
  Users,
  Globe,
  FileText,
} from "lucide-react";
import { colleges, blogPosts, testimonials, stats } from "@/lib/mock-data";

const categories = [
  { label: "Engineering", icon: "🏗️", count: 180, href: "/colleges?category=engineering" },
  { label: "Medical", icon: "🏥", count: 95, href: "/colleges?category=medical" },
  { label: "MBA", icon: "📊", count: 120, href: "/colleges?category=mba" },
  { label: "Arts & Science", icon: "🎨", count: 200, href: "/colleges?category=arts" },
  { label: "Study Abroad", icon: "✈️", count: 150, href: "/colleges?country=abroad" },
  { label: "Law", icon: "⚖️", count: 60, href: "/colleges?category=law" },
];

const steps = [
  { step: "1", title: "Create Your Profile", description: "Tell us about your academic background, interests, and preferences.", icon: Users },
  { step: "2", title: "Discover & Compare", description: "Browse colleges, compare side-by-side, and find your perfect match.", icon: Search },
  { step: "3", title: "Track & Apply", description: "Track deadlines, manage documents, and never miss an application.", icon: FileText },
];

export default function HomePage() {
  const featuredColleges = colleges.slice(0, 4);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
          alt="Diverse students studying together on campus"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/90 via-emerald-50/90 to-cyan-50/85 dark:from-teal-950/90 dark:via-emerald-950/90 dark:to-cyan-950/85" />
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 border-teal-200">
              500+ Colleges | 15+ Countries
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your Journey to the{" "}
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Perfect College
              </span>{" "}
              Starts Here
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover colleges, get admission guidance, explore careers, and track your applications — all in one place. For students in India and abroad.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center bg-background border rounded-xl shadow-lg p-2">
                <Search className="h-5 w-5 text-muted-foreground ml-3" />
                <input
                  type="text"
                  placeholder="Search colleges, courses, exams..."
                  className="flex-1 px-3 py-2.5 bg-transparent outline-none text-sm md:text-base"
                />
                <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white px-6">
                  Search
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                <span className="text-xs text-muted-foreground">Popular:</span>
                {["IIT Bombay", "B.Tech CSE", "MBA", "Study in UK", "NEET"].map((tag) => (
                  <Link key={tag} href="/colleges" className="text-xs text-teal-600 hover:underline">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/colleges">
                <Button size="lg" className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white gap-2 w-full sm:w-auto">
                  <GraduationCap className="h-5 w-5" />
                  Explore Colleges
                </Button>
              </Link>
              <Link href="/careers">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <Compass className="h-5 w-5" />
                  Career Guidance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Colleges</h2>
            <p className="text-muted-foreground mt-1">Top-ranked institutions for your future</p>
          </div>
          <Link href="/colleges">
            <Button variant="ghost" className="gap-1 text-teal-600">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredColleges.map((college) => (
            <Link key={college.id} href={`/colleges/${college.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="h-32 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <img src={college.banner} alt={`${college.name} campus`} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <img src={college.logo} alt={college.name} className="h-16 w-16 rounded-full shadow relative z-10" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm leading-tight mb-1 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    {college.city}, {college.country}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium">{college.avgRating}</span>
                    </div>
                    {college.rankingNirf && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        NIRF #{college.rankingNirf}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {college.avgPackageLpa} LPA avg
                    </span>
                    <span>{college.feeRange}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">How EduConnect Works</h2>
            <p className="text-muted-foreground mt-2">Three simple steps to your dream college</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    <span className="text-teal-600">Step {s.step}:</span> {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
          <p className="text-muted-foreground mt-2">Find colleges in your field of interest</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.label} href={cat.href}>
              <Card className="text-center hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer p-4">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="font-medium text-sm">{cat.label}</h3>
                <p className="text-xs text-muted-foreground">{cat.count}+ Colleges</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">What Students Say</h2>
            <p className="text-teal-100 mt-2">Real stories from real students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-teal-200">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-teal-50 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Latest Resources</h2>
            <p className="text-muted-foreground mt-1">Tips, guides, and insights for your journey</p>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="gap-1 text-teal-600">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <div className="h-40 rounded-t-lg overflow-hidden relative">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-muted-foreground/30" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {post.category}
                  </Badge>
                  <h3 className="font-semibold text-sm leading-tight mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Start Your Journey?</h2>
          <p className="text-teal-100 mb-6 max-w-xl mx-auto">
            Join 25,000+ students who found their dream college through EduConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="gap-2">
                <GraduationCap className="h-5 w-5" />
                Sign Up Free
              </Button>
            </Link>
            <Link href="/admissions">
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10 gap-2">
                <Globe className="h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

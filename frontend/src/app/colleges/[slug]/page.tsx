"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin, Star, TrendingUp, Users, Globe, Bookmark, Share2, ArrowLeft,
  Calendar, IndianRupee, GraduationCap, Building, Wifi, BookOpen, Dumbbell,
} from "lucide-react";
import { colleges } from "@/lib/mock-data";

const facilityIcons: Record<string, React.ReactNode> = {
  Hostel: <Building className="h-4 w-4" />,
  Library: <BookOpen className="h-4 w-4" />,
  WiFi: <Wifi className="h-4 w-4" />,
  Gym: <Dumbbell className="h-4 w-4" />,
};

export default function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const college = colleges.find((c) => c.slug === slug);

  if (!college) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">College Not Found</h1>
        <Link href="/colleges"><Button variant="outline">Back to Colleges</Button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative text-white">
        <img
          src={college.banner || "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"}
          alt={`${college.name} campus`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 to-emerald-700/90" />
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Link href="/colleges" className="inline-flex items-center gap-1 text-teal-200 hover:text-white text-sm mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Colleges
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img src={college.logo} alt={college.name} className="h-20 w-20 rounded-xl shadow-lg bg-white/10" />
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge className="bg-white/20 text-white border-0">{college.type}</Badge>
                {college.rankingNirf && (
                  <Badge className="bg-amber-400/20 text-amber-200 border-0">NIRF #{college.rankingNirf}</Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-teal-100">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{college.city}, {college.state}, {college.country}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Est. {college.established}</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4" />{college.totalStudents.toLocaleString()} Students</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-4 w-4 ${s <= Math.round(college.avgRating) ? "fill-amber-400 text-amber-400" : "text-white/30"}`} />
                ))}
                <span className="text-sm ml-1">{college.avgRating} ({college.totalReviews} reviews)</span>
              </div>
            </div>
            <div className="flex gap-2 self-start">
              <Button size="sm" variant="secondary" className="gap-1.5">
                <Bookmark className="h-4 w-4" /> Save
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 text-white border-white/30 hover:bg-white/10">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-teal-600">{college.avgPackageLpa} LPA</p>
              <p className="text-xs text-muted-foreground">Avg Package</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-teal-600">{college.highestPackageLpa} LPA</p>
              <p className="text-xs text-muted-foreground">Highest Package</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-teal-600">{college.placementPercentage}%</p>
              <p className="text-xs text-muted-foreground">Placement Rate</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-xl font-bold text-teal-600">{college.feeRange}</p>
              <p className="text-xs text-muted-foreground">Fee Range</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-3">About {college.name}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{college.description}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Campus Facilities</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {college.facilities.map((f) => (
                        <div key={f} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg text-sm">
                          {facilityIcons[f] || <Building className="h-4 w-4" />}
                          {f}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Quick Info</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{college.type}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Established</span><span className="font-medium">{college.established}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Students</span><span className="font-medium">{college.totalStudents.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-medium">{college.city}, {college.state}</span></div>
                      {college.rankingNirf && <div className="flex justify-between"><span className="text-muted-foreground">NIRF Rank</span><span className="font-medium">#{college.rankingNirf}</span></div>}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5" /> Visit Website
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="space-y-4">
              {college.courses.map((course) => (
                <Card key={course.name}>
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap className="h-4 w-4 text-teal-600" />
                        <h3 className="font-semibold text-sm">{course.name}</h3>
                        <Badge variant="secondary" className="text-[10px]">{course.degreeLevel}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{course.duration} | Eligibility: {course.eligibility}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold flex items-center gap-0.5 justify-end">
                        <IndianRupee className="h-3.5 w-3.5" />
                        {(course.feePerYear / 100000).toFixed(1)}L/year
                      </p>
                      <Button size="sm" variant="outline" className="mt-1 text-xs">Apply Guidance</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admissions">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Admission Process</h2>
                <div className="space-y-4">
                  {["Check eligibility criteria for your desired course", "Register and appear for required entrance exams", "Apply through the official admission portal", "Attend counseling/interview if required", "Secure your seat with fee payment"].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-sm font-bold shrink-0">
                        {i + 1}
                      </div>
                      <div className="pt-1">
                        <p className="text-sm">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="placements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Placement Highlights</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Average Package</span>
                      <span className="font-bold text-teal-600">{college.avgPackageLpa} LPA</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Highest Package</span>
                      <span className="font-bold text-teal-600">{college.highestPackageLpa} LPA</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Placement Rate</span>
                      <span className="font-bold text-teal-600">{college.placementPercentage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Top Recruiters</h2>
                  <div className="flex flex-wrap gap-2">
                    {["Google", "Microsoft", "Amazon", "Apple", "Goldman Sachs", "McKinsey", "Deloitte", "TCS", "Infosys"].map((r) => (
                      <Badge key={r} variant="outline" className="text-xs">{r}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Student Reviews</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-4 w-4 ${s <= Math.round(college.avgRating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{college.avgRating} out of 5 ({college.totalReviews} reviews)</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">Write a Review</Button>
                </div>
                {/* Sample Reviews */}
                {[
                  { name: "Aditya K.", rating: 5, text: "Excellent faculty and infrastructure. The placement cell is very active and supportive. Campus life is amazing!", date: "Feb 2026" },
                  { name: "Sneha R.", rating: 4, text: "Great academic environment. Some courses could be more industry-oriented but overall a wonderful experience.", date: "Jan 2026" },
                ].map((review) => (
                  <div key={review.name} className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{review.name}</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

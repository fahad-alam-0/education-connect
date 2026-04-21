"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Star, TrendingUp, SlidersHorizontal, X, GitCompareArrows } from "lucide-react";
import { colleges } from "@/lib/mock-data";

const countries = ["All", "India", "USA", "UK", "Canada"];
const types = ["All", "Government", "Private", "Deemed", "Autonomous"];

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("ranking");
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);

  const filtered = colleges
    .filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase()) ||
        c.courses.some((co) => co.name.toLowerCase().includes(search.toLowerCase()));
      const matchCountry = country === "All" || c.country === country;
      const matchType = type === "All" || c.type === type;
      return matchSearch && matchCountry && matchType;
    })
    .sort((a, b) => {
      if (sort === "ranking") return (a.rankingNirf ?? 999) - (b.rankingNirf ?? 999);
      if (sort === "rating") return b.avgRating - a.avgRating;
      if (sort === "package") return b.avgPackageLpa - a.avgPackageLpa;
      return a.name.localeCompare(b.name);
    });

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Colleges</h1>
        <p className="text-muted-foreground">Browse {colleges.length} colleges in India and abroad</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search colleges, courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={country} onValueChange={(v) => v && setCountry(v)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>{c === "All" ? "All Countries" : c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={(v) => v && setType(v)}>
            <SelectTrigger className="w-[130px] hidden sm:flex">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>{t === "All" ? "All Types" : t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => v && setSort(v)}>
            <SelectTrigger className="w-[140px] hidden sm:flex">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ranking">NIRF Ranking</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="package">Avg Package</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="sm:hidden" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Filters */}
      {showFilters && (
        <div className="flex gap-2 mb-4 sm:hidden">
          <Select value={type} onValueChange={(v) => v && setType(v)}>
            <SelectTrigger className="flex-1"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              {types.map((t) => (
                <SelectItem key={t} value={t}>{t === "All" ? "All Types" : t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => v && setSort(v)}>
            <SelectTrigger className="flex-1"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ranking">NIRF Ranking</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="package">Avg Package</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{filtered.length} colleges found</p>
        {compareList.length > 0 && (
          <Button size="sm" className="gap-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
            <GitCompareArrows className="h-4 w-4" />
            Compare ({compareList.length})
          </Button>
        )}
      </div>

      {/* College Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((college) => (
          <Card key={college.id} className="hover:shadow-lg transition-all group">
            <div className="h-28 rounded-t-lg flex items-center justify-center relative overflow-hidden">
              <img src={college.banner} alt={`${college.name} campus`} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <img src={college.logo} alt={college.name} className="h-14 w-14 rounded-full shadow relative z-10" />
              <button
                onClick={(e) => { e.preventDefault(); toggleCompare(college.id); }}
                className={`absolute top-2 right-2 p-1.5 rounded-full text-xs font-medium transition-colors ${
                  compareList.includes(college.id)
                    ? "bg-teal-600 text-white"
                    : "bg-white/80 text-muted-foreground hover:bg-white"
                }`}
              >
                <GitCompareArrows className="h-3.5 w-3.5" />
              </button>
              <Badge className="absolute top-2 left-2 text-[10px]" variant="secondary">
                {college.type}
              </Badge>
            </div>
            <Link href={`/colleges/${college.slug}`}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm leading-tight mb-1 group-hover:text-teal-600 transition-colors">
                  {college.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {college.city}, {college.state}, {college.country}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{college.avgRating}</span>
                    <span className="text-xs text-muted-foreground">({college.totalReviews})</span>
                  </div>
                  {college.rankingNirf && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      NIRF #{college.rankingNirf}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted/50 rounded-md p-2">
                    <p className="text-xs font-semibold text-teal-600">{college.avgPackageLpa}L</p>
                    <p className="text-[10px] text-muted-foreground">Avg Package</p>
                  </div>
                  <div className="bg-muted/50 rounded-md p-2">
                    <p className="text-xs font-semibold text-teal-600">{college.placementPercentage}%</p>
                    <p className="text-[10px] text-muted-foreground">Placed</p>
                  </div>
                  <div className="bg-muted/50 rounded-md p-2">
                    <p className="text-xs font-semibold text-teal-600">{college.feeRange}</p>
                    <p className="text-[10px] text-muted-foreground">Fees</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {college.courses.slice(0, 2).map((course) => (
                    <Badge key={course.name} variant="outline" className="text-[10px] font-normal">
                      {course.name.replace("B.Tech ", "").replace("B.E. ", "")}
                    </Badge>
                  ))}
                  {college.courses.length > 2 && (
                    <Badge variant="outline" className="text-[10px] font-normal">
                      +{college.courses.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg font-medium text-muted-foreground">No colleges found</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCountry("All"); setType("All"); }}>
            <X className="h-4 w-4 mr-1" /> Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

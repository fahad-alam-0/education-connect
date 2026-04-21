import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Globe, ArrowRight, Search } from "lucide-react";
import { scholarships } from "@/lib/mock-data";

export default function ScholarshipsPage() {
  return (
    <div>
      <section className="relative overflow-hidden py-16">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&q=80"
          alt="Graduates celebrating their achievement"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/92 to-yellow-50/90 dark:from-amber-950/92 dark:to-yellow-950/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">200+ Scholarships</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Scholarship & Financial Aid</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Find scholarships you&apos;re eligible for. Merit-based, need-based, and government-funded opportunities.
          </p>
          <div className="max-w-xl mx-auto flex items-center bg-background border rounded-xl shadow-lg p-2">
            <Search className="h-5 w-5 text-muted-foreground ml-3" />
            <input type="text" placeholder="Search scholarships..." className="flex-1 px-3 py-2 bg-transparent outline-none text-sm" />
            <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6">Search</Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Available Scholarships</h2>
        <div className="space-y-4">
          {scholarships.map((s) => (
            <Card key={s.id} className="hover:shadow-md transition-all">
              <CardContent className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <Trophy className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{s.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{s.provider}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-[10px] gap-1"><Calendar className="h-3 w-3" /> {s.deadline}</Badge>
                      {s.countries.map((c) => (
                        <Badge key={c} variant="outline" className="text-[10px] gap-1"><Globe className="h-3 w-3" /> {c}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right md:text-right">
                  <p className="text-lg font-bold text-amber-600 mb-1">{s.amount}</p>
                  <p className="text-xs text-muted-foreground mb-2">{s.eligibility}</p>
                  <Button size="sm" variant="outline" className="gap-1 text-xs">
                    Apply <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

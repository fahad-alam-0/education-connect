import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ExternalLink, FileText } from "lucide-react";
import { exams } from "@/lib/mock-data";

const categoryColors: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-800 border-blue-200",
  Medical: "bg-red-100 text-red-800 border-red-200",
  Management: "bg-purple-100 text-purple-800 border-purple-200",
  Abroad: "bg-teal-100 text-teal-800 border-teal-200",
};

export default function ExamsPage() {
  return (
    <div>
      <section className="relative overflow-hidden py-16">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
          alt="Student studying for exams with notes and books"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/92 to-purple-50/90 dark:from-violet-950/92 dark:to-purple-950/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge className="mb-4 bg-violet-100 text-violet-800 border-violet-200">All Major Exams</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Entrance Exams</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exam dates, registration deadlines, syllabus, and preparation resources for all major entrance exams.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">All</Badge>
          {["Engineering", "Medical", "Management", "Abroad"].map((c) => (
            <Badge key={c} variant="outline" className="cursor-pointer hover:bg-muted">{c}</Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-md transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{exam.name}</h3>
                      <Badge className={categoryColors[exam.category] || "bg-muted"}>{exam.category}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{exam.fullName}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{exam.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" /> Exam Date
                    </div>
                    <p className="text-sm font-semibold">{exam.examDate}</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <Clock className="h-3 w-3" /> Registration
                    </div>
                    <p className="text-sm font-semibold">{exam.registrationDeadline}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1 text-xs flex-1">
                    <FileText className="h-3 w-3" /> Syllabus
                  </Button>
                  <Button size="sm" className="gap-1 text-xs flex-1 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                    <ExternalLink className="h-3 w-3" /> Prep Resources
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

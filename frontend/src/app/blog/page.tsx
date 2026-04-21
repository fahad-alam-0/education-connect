import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, User } from "lucide-react";
import { blogPosts } from "@/lib/mock-data";

const categories = ["All", "Exam Prep", "Study Abroad", "Admission Tips", "Career Advice", "Scholarships"];

export default function BlogPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-slate-100 text-slate-800 border-slate-200">Resources & Guides</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert tips, guides, and insights to help you navigate your education journey.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <Badge key={c} variant="outline" className="cursor-pointer hover:bg-muted px-3 py-1">{c}</Badge>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mb-8 overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-48 md:h-auto overflow-hidden relative">
              {blogPosts[0].coverImage ? (
                <img src={blogPosts[0].coverImage} alt={blogPosts[0].title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-100 to-emerald-200 dark:from-teal-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-teal-600/30" />
                </div>
              )}
            </div>
            <CardContent className="p-6 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-3 text-xs">{blogPosts[0].category}</Badge>
              <h2 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors">{blogPosts[0].title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{blogPosts[0].author}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{blogPosts[0].readTime}</span>
                <span>{blogPosts[0].publishedAt}</span>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
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
                <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
                <h3 className="font-semibold text-sm leading-tight mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

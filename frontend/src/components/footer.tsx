import Link from "next/link";
import { GraduationCap } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Colleges", href: "/colleges" },
    { label: "Careers", href: "/careers" },
    { label: "Scholarships", href: "/scholarships" },
    { label: "Entrance Exams", href: "/exams" },
  ],
  Guidance: [
    { label: "Admission Guide", href: "/admissions" },
    { label: "Essay Writing Tips", href: "/blog" },
    { label: "Interview Prep", href: "/blog" },
    { label: "Study Abroad", href: "/blog" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">EduConnect</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simplifying college admissions and career guidance for students in India and abroad.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm mb-3">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 EduConnect. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built by Abijith S, Muhammad Ansar A H & Abanas Krishna
          </p>
        </div>
      </div>
    </footer>
  );
}

import { NextResponse } from "next/server";
import { blogPosts, colleges, exams, scholarships, stats, testimonials } from "@/lib/mock-data";

const dataMap = {
  colleges,
  blogPosts,
  scholarships,
  exams,
  testimonials,
  stats,
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  if (resource) {
    if (!(resource in dataMap)) {
      return NextResponse.json(
        {
          error: "Invalid resource.",
          validResources: Object.keys(dataMap),
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ resource, data: dataMap[resource as keyof typeof dataMap] });
  }

  return NextResponse.json({
    resources: dataMap,
  });
}

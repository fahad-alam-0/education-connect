"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, Bookmark, Bell, Calendar, FileText, User,
  Plus, Clock, CheckCircle2, XCircle, AlertCircle, TrendingUp, Star,
} from "lucide-react";

const applications = [
  { id: "1", college: "IIT Bombay", course: "B.Tech CSE", status: "applied", deadline: "2026-04-15", priority: "dream" },
  { id: "2", college: "IIT Delhi", course: "B.Tech CSE", status: "under_review", deadline: "2026-04-20", priority: "dream" },
  { id: "3", college: "NIT Trichy", course: "B.Tech CSE", status: "accepted", deadline: "2026-03-30", priority: "target" },
  { id: "4", college: "BITS Pilani", course: "B.E. CSE", status: "preparing", deadline: "2026-05-10", priority: "target" },
  { id: "5", college: "VIT Vellore", course: "B.Tech CSE", status: "accepted", deadline: "2026-03-15", priority: "safety" },
];

const savedColleges = [
  { name: "University of Toronto", rating: 4.6, location: "Toronto, Canada" },
  { name: "University of Oxford", rating: 4.8, location: "Oxford, UK" },
  { name: "MIT", rating: 4.9, location: "Cambridge, USA" },
];

const notifications = [
  { text: "JEE Advanced registration deadline in 5 days", type: "warning", time: "2 hours ago" },
  { text: "NIT Trichy accepted your application!", type: "success", time: "1 day ago" },
  { text: "New scholarship: INSPIRE 2026-27 applications open", type: "info", time: "2 days ago" },
  { text: "IIT Delhi application status updated", type: "info", time: "3 days ago" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  researching: { label: "Researching", color: "bg-slate-100 text-slate-700", icon: <Clock className="h-3 w-3" /> },
  preparing: { label: "Preparing", color: "bg-blue-100 text-blue-700", icon: <FileText className="h-3 w-3" /> },
  applied: { label: "Applied", color: "bg-amber-100 text-amber-700", icon: <AlertCircle className="h-3 w-3" /> },
  under_review: { label: "Under Review", color: "bg-purple-100 text-purple-700", icon: <Clock className="h-3 w-3" /> },
  accepted: { label: "Accepted", color: "bg-green-100 text-green-700", icon: <CheckCircle2 className="h-3 w-3" /> },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: <XCircle className="h-3 w-3" /> },
};

const priorityColors: Record<string, string> = {
  dream: "border-l-amber-500",
  target: "border-l-blue-500",
  safety: "border-l-green-500",
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Welcome back, Buddy! 👋</h1>
          <p className="text-muted-foreground">Here&apos;s your admission journey at a glance</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1"><Bell className="h-3 w-3" /> 4 new</Badge>
          <Badge className="bg-teal-100 text-teal-800 border-teal-200">Profile 75% complete</Badge>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <GraduationCap className="h-8 w-8 mx-auto text-teal-600 mb-2" />
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <p className="text-2xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Accepted</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Bookmark className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Saved Colleges</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto text-amber-600 mb-2" />
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Upcoming Deadlines</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications & Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Recent Applications</h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("applications")}>View All</Button>
                </div>
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => {
                    const status = statusConfig[app.status];
                    return (
                      <div key={app.id} className={`flex items-center justify-between p-3 rounded-lg border border-l-4 ${priorityColors[app.priority]}`}>
                        <div>
                          <p className="text-sm font-medium">{app.college}</p>
                          <p className="text-xs text-muted-foreground">{app.course}</p>
                        </div>
                        <Badge className={`${status.color} gap-1 text-[10px]`}>
                          {status.icon} {status.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Notifications</h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("notifications")}>View All</Button>
                </div>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((n, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        n.type === "success" ? "bg-green-500" : n.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                      }`} />
                      <div>
                        <p className="text-sm">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Applications</h2>
            <Button size="sm" className="gap-1.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
              <Plus className="h-4 w-4" /> Add Application
            </Button>
          </div>
          <div className="space-y-3">
            {applications.map((app) => {
              const status = statusConfig[app.status];
              return (
                <Card key={app.id}>
                  <CardContent className={`p-4 border-l-4 ${priorityColors[app.priority]} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{app.college}</h3>
                        <Badge variant="outline" className="text-[10px] capitalize">{app.priority}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{app.course}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" /> Deadline: {app.deadline}
                      </p>
                    </div>
                    <Badge className={`${status.color} gap-1 self-start`}>
                      {status.icon} {status.label}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Saved Colleges Tab */}
      {activeTab === "saved" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Saved Colleges</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedColleges.map((c) => (
              <Card key={c.name} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{c.location}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium">{c.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">All Notifications</h2>
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <Card key={i}>
                <CardContent className="p-4 flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    n.type === "success" ? "bg-green-500" : n.type === "warning" ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-6">Student Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Full Name</label>
                  <p className="text-sm font-medium">Buddy</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Email</label>
                  <p className="text-sm font-medium">buddy@example.com</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Current Education</label>
                  <p className="text-sm font-medium">BCA 6th Semester</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">GPA / Percentage</label>
                  <p className="text-sm font-medium">8.5 CGPA</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Preferred Countries</label>
                  <div className="flex gap-1 mt-1">
                    {["India", "USA", "Canada"].map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Preferred Fields</label>
                  <div className="flex gap-1 mt-1">
                    {["Computer Science", "AI/ML", "Data Science"].map((f) => (
                      <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Test Scores</label>
                  <p className="text-sm font-medium">GRE: 320 | IELTS: 7.5</p>
                </div>
              </div>
            </div>
            <Button className="mt-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">Edit Profile</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

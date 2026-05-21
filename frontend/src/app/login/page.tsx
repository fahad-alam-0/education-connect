"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || (isSignUp && !name.trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    const user = { name: name || email.split("@")[0], email };
    localStorage.setItem("educonnect_user", JSON.stringify(user));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-950/20 dark:via-emerald-950/20 dark:to-cyan-950/20">
      <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-xl">
        {/* Side illustration - hidden on mobile */}
        <div className="hidden lg:block w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80"
            alt="Students collaborating in a study group"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/80 to-emerald-700/80 flex flex-col items-center justify-center p-8 text-white text-center">
            <GraduationCap className="h-16 w-16 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to EduConnect</h2>
            <p className="text-teal-100 text-sm">Your gateway to discovering the perfect college, career guidance, and scholarship opportunities.</p>
          </div>
        </div>
      <Card className="w-full lg:w-1/2 rounded-none lg:rounded-r-2xl lg:rounded-l-none border-0 lg:border shadow-none">
        <CardContent className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center mb-3">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp ? "Join EduConnect and start your journey" : "Sign in to your EduConnect account"}
            </p>
          </div>

          {/* Google OAuth */}
          <Button variant="outline" className="w-full mb-4 gap-2">
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with email</span></div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleAuth}>
            {isSignUp && (
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <Input placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="you@example.com" className="pl-9" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter your password" className="pl-9 pr-9" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {!isSignUp && (
              <div className="text-right">
                <Link href="#" className="text-xs text-teal-600 hover:underline">Forgot password?</Link>
              </div>
            )}
            {error && <p className="text-xs text-red-600">{error}</p>}
            <Button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white">
              {isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-teal-600 hover:underline font-medium">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}

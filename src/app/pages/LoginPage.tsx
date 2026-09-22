import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { GraduationCap } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    const success = await login(email, password);
    if (!success) {
      setError("Invalid credentials. Use any email and password (min 4 chars)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#183632] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-[#176b63] p-12 text-white lg:block">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div><div className="brand-mark mb-8 inline-flex rounded-xl p-3"><GraduationCap className="h-7 w-7" /></div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a7d8cf]">Campus operations</p><h1 className="mt-4 text-5xl font-bold leading-tight">One clear view of your college.</h1><p className="mt-5 max-w-sm text-[#d1e9e4]">Manage students, faculty, attendance, fees, examinations, and library services from one calm workspace.</p></div>
            <p className="text-sm text-[#a7d8cf]">College ERP · Built for better campus days</p>
          </div>
          <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full border-[42px] border-white/10" />
        </div>
        <Card className="rounded-none border-0 shadow-none">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center lg:hidden">
            <div className="brand-mark p-3 rounded-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl tracking-tight">Welcome back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Demo: Use any email and password (minimum 4 characters)
            </p>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}

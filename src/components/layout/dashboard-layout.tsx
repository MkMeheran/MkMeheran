"use client";

import { ReactNode, useMemo } from "react";
import { Sidebar } from "./sidebar";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    email?: string;
    role?: string;
  };
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const router = useRouter();
  
  const supabase = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createBrowserClient();
  }, []);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar user={user} onSignOut={handleSignOut} />
      <main className="md:ml-64 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}

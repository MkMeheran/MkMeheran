"use client";

import { useEffect, useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent, Badge } from "@/components/ui";
import { Users, Map, Bot, Webhook, TrendingUp, Activity } from "lucide-react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase";

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: { role?: string } } | null>(null);
  
  const supabase = useMemo(() => {
    if (typeof window === "undefined") return null;
    return createBrowserClient();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  const stats = [
    { 
      title: "Total Users", 
      value: "1,234", 
      change: "+12%", 
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Map Features", 
      value: "567", 
      change: "+8%", 
      icon: Map,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "AI Requests", 
      value: "8,901", 
      change: "+23%", 
      icon: Bot,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    { 
      title: "Webhooks", 
      value: "234", 
      change: "+5%", 
      icon: Webhook,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
  ];

  const recentActivity = [
    { action: "Map layer updated", time: "2 minutes ago", type: "map" },
    { action: "New user registered", time: "15 minutes ago", type: "user" },
    { action: "AI query processed", time: "1 hour ago", type: "ai" },
    { action: "Webhook triggered", time: "2 hours ago", type: "webhook" },
  ];

  return (
    <DashboardLayout 
      user={{ 
        email: user?.email, 
        role: user?.user_metadata?.role || "user" 
      }}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.email || "User"}!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 ml-1">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge
                      variant={
                        activity.type === "ai"
                          ? "default"
                          : activity.type === "map"
                          ? "success"
                          : activity.type === "webhook"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/map"
                  className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <Map className="h-8 w-8 text-gray-400 group-hover:text-blue-600" />
                  <p className="mt-2 font-medium text-gray-900">View Map</p>
                  <p className="text-xs text-gray-500">
                    Explore GIS features
                  </p>
                </Link>
                <Link
                  href="/dashboard/ai"
                  className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                >
                  <Bot className="h-8 w-8 text-gray-400 group-hover:text-purple-600" />
                  <p className="mt-2 font-medium text-gray-900">AI Agent</p>
                  <p className="text-xs text-gray-500">
                    Chat with AI assistant
                  </p>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
                >
                  <Webhook className="h-8 w-8 text-gray-400 group-hover:text-green-600" />
                  <p className="mt-2 font-medium text-gray-900">Webhooks</p>
                  <p className="text-xs text-gray-500">
                    Configure n8n integration
                  </p>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                >
                  <Users className="h-8 w-8 text-gray-400 group-hover:text-orange-600" />
                  <p className="mt-2 font-medium text-gray-900">Users</p>
                  <p className="text-xs text-gray-500">
                    Manage team members
                  </p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

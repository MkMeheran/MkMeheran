import Link from "next/link";
import { Map, Bot, LayoutDashboard, Webhook, Shield, Zap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Authentication with Roles",
      description: "Secure authentication powered by Supabase with role-based access control (admin, user, moderator).",
    },
    {
      icon: LayoutDashboard,
      title: "Responsive Dashboard",
      description: "Beautiful, responsive dashboard with statistics, activity feeds, and quick actions.",
    },
    {
      icon: Map,
      title: "Interactive Map",
      description: "Leaflet-powered map with GeoJSON support, feature interaction, and import/export.",
    },
    {
      icon: Bot,
      title: "AI Agent API",
      description: "Integrated OpenAI-powered AI assistant for GIS analysis and data processing.",
    },
    {
      icon: Webhook,
      title: "n8n Integration",
      description: "Webhook triggers and handlers for seamless n8n automation workflows.",
    },
    {
      icon: Zap,
      title: "Production Ready",
      description: "TypeScript, TailwindCSS, scalable folder structure, and reusable UI components.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">NF</span>
            </div>
            <span className="font-semibold text-gray-900">NextFS Starter</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm mb-6">
          <Zap className="h-4 w-4" />
          Next.js 15 + TypeScript + TailwindCSS
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Full-Stack Starter for
          <br />
          <span className="text-blue-600">GIS, AI & Automation</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          A production-ready boilerplate with Supabase auth, Leaflet maps, OpenAI integration, 
          n8n webhooks, and a beautiful responsive dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
          >
            Get Started Free
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
          >
            View Demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Everything You Need
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Built with modern technologies and best practices for scalable GIS, 
          AI-driven SaaS, and dashboard projects.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Modern Tech Stack
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            Built with the latest and greatest technologies for optimal developer experience and performance.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {["Next.js 15", "TypeScript", "TailwindCSS", "Supabase", "Leaflet", "OpenAI", "n8n"].map(
              (tech) => (
                <div
                  key={tech}
                  className="px-6 py-3 bg-white rounded-full border border-gray-200 text-gray-700 font-medium"
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Build?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Clone the repo, configure your environment variables, and start building your next project.
        </p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 NextJS Fullstack Starter. MIT License.</p>
        </div>
      </footer>
    </div>
  );
}

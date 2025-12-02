# NextJS Fullstack Starter

A production-ready full-stack boilerplate built with **Next.js 15**, **TypeScript**, **TailwindCSS**, **Supabase**, **Leaflet**, **OpenAI**, and **n8n** integration. Perfect for GIS applications, AI-driven SaaS, automation workflows, and dashboard projects.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ecf8e)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🔐 **Authentication with Roles** - Supabase-powered auth with role-based access control (admin, user, moderator)
- 📊 **Responsive Dashboard** - Beautiful, mobile-friendly dashboard with statistics and activity feeds
- 🗺️ **Interactive Map** - Leaflet-powered map with GeoJSON support, feature interaction, and import/export
- 🤖 **AI Agent API** - OpenAI-integrated assistant for GIS analysis and data processing
- 🔗 **n8n Integration** - Webhook triggers and handlers for automation workflows
- 🎨 **Reusable UI Components** - Button, Card, Input, Modal, Badge, Spinner, and more
- 📁 **Scalable Folder Structure** - Organized codebase ready for large-scale projects
- ⚡ **Production Ready** - TypeScript, ESLint, optimized builds

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)
- OpenAI API key (optional, for AI features)
- n8n instance (optional, for automation)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/MkMeheran/MkMeheran.git
cd MkMeheran
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# OpenAI (optional)
OPENAI_API_KEY=sk-your-api-key

# n8n (optional)
N8N_WEBHOOK_URL=https://your-n8n.com/webhook
WEBHOOK_SECRET=your-secret
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── ai/            # AI agent endpoint
│   │   └── webhooks/      # n8n webhook handlers
│   ├── auth/              # Auth pages (login, signup)
│   ├── dashboard/         # Dashboard pages
│   │   ├── ai/            # AI chat page
│   │   └── settings/      # Settings page
│   ├── map/               # Map page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/            # Layout components (Sidebar, DashboardLayout)
│   ├── map/               # Map components (MapContainer, DynamicMap)
│   └── ui/                # UI primitives (Button, Card, Input, etc.)
├── hooks/                 # Custom React hooks
│   └── use-auth.ts        # Authentication hook
├── lib/                   # Utilities and integrations
│   ├── openai/            # OpenAI client and helpers
│   └── supabase/          # Supabase client (browser, server, middleware)
├── types/                 # TypeScript type definitions
└── middleware.ts          # Next.js middleware (auth protection)
```

## 🔐 Authentication

Authentication is powered by Supabase with support for:

- Email/Password authentication
- Role-based access control (RBAC)
- Protected routes via middleware
- Session management

### User Roles

| Role | Description |
|------|-------------|
| `admin` | Full access to all features |
| `moderator` | Limited admin capabilities |
| `user` | Standard user access |

### Usage

```tsx
import { useAuth } from "@/hooks";

function MyComponent() {
  const { user, role, isAdmin, hasRole, signIn, signOut } = useAuth();
  
  if (hasRole("admin")) {
    return <AdminPanel />;
  }
  
  return <UserDashboard />;
}
```

## 🗺️ Map Features

The map component uses Leaflet with:

- OpenStreetMap tiles
- GeoJSON layer support
- Feature click interactions
- Popups with properties
- Import/Export GeoJSON files

### Usage

```tsx
import { DynamicMapContainer } from "@/components/map";

function MapPage() {
  return (
    <DynamicMapContainer
      center={[51.505, -0.09]}
      zoom={13}
      geoJson={yourGeoJsonData}
      onFeatureClick={(feature) => console.log(feature)}
    />
  );
}
```

## 🤖 AI Agent

The AI agent uses OpenAI's API for:

- Single prompt queries
- Multi-turn conversations
- Customizable system prompts

### API Usage

```bash
# Single prompt
curl -X POST http://localhost:3000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is GIS?"}'

# Conversation
curl -X POST http://localhost:3000/api/ai \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello"},
      {"role": "assistant", "content": "Hi! How can I help?"},
      {"role": "user", "content": "Tell me about maps"}
    ]
  }'
```

## 🔗 n8n Integration

### Receiving Webhooks

The `/api/webhooks` endpoint receives webhooks from n8n:

```bash
curl -X POST http://localhost:3000/api/webhooks \
  -H "Content-Type: application/json" \
  -H "x-webhook-signature: your-signature" \
  -d '{"event": "user.created", "data": {...}}'
```

### Triggering n8n Workflows

```bash
curl -X PUT http://localhost:3000/api/webhooks \
  -H "Content-Type: application/json" \
  -d '{"event": "custom-event", "data": {...}}'
```

## 🎨 UI Components

Reusable components built with TailwindCSS and class-variance-authority:

| Component | Description |
|-----------|-------------|
| `Button` | Customizable button with variants |
| `Input` | Form input with label and error states |
| `Card` | Content container with header/footer |
| `Modal` | Dialog overlay component |
| `Badge` | Status indicator badges |
| `Spinner` | Loading indicators |

### Example

```tsx
import { Button, Card, Input, Modal } from "@/components/ui";

<Button variant="primary" size="lg">
  Click Me
</Button>

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📦 Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Enable Email Auth in Authentication → Providers

3. (Optional) Add custom claims for roles:

```sql
-- Create a function to set user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
# Dockerfile included for containerized deployments
docker build -t nextfs-starter .
docker run -p 3000:3000 nextfs-starter
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

---

Built with ❤️ for the GIS, AI, and automation community.

"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Button, Input, Card, CardHeader, CardTitle, CardContent, CardDescription, Badge } from "@/components/ui";
import { Settings, Webhook, Key, Bell, Save } from "lucide-react";

export default function SettingsPage() {
  const [n8nUrl, setN8nUrl] = useState("");
  const [webhookSecret, setWebhookSecret] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">
            Configure your application settings and integrations.
          </p>
        </div>

        <div className="grid gap-6">
          {/* n8n Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                n8n Integration
              </CardTitle>
              <CardDescription>
                Configure your n8n webhook URL for automation workflows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="n8n Webhook URL"
                placeholder="https://your-n8n-instance.com/webhook"
                value={n8nUrl}
                onChange={(e) => setN8nUrl(e.target.value)}
              />
              <Input
                type="password"
                label="Webhook Secret"
                placeholder="Enter your webhook secret"
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
              />
              <div className="flex items-center gap-4">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                {saved && (
                  <Badge variant="success">Settings saved successfully!</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* API Keys */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>
                View and manage API key settings (configured via environment variables).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">OpenAI API</p>
                    <p className="text-sm text-gray-500">For AI agent functionality</p>
                  </div>
                  <Badge variant="secondary">
                    Check .env
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Supabase</p>
                    <p className="text-sm text-gray-500">Authentication and database</p>
                  </div>
                  <Badge variant="secondary">
                    Check .env
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Webhook Events</p>
                    <p className="text-sm text-gray-500">Trigger n8n workflows on events</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Application
              </CardTitle>
              <CardDescription>
                General application settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Input
                  label="Application Name"
                  defaultValue="NextJS Fullstack Starter"
                />
                <Input
                  label="Application URL"
                  defaultValue="http://localhost:3000"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

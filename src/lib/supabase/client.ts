import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient | null {
  // Only create client in browser with available env vars
  if (typeof window === "undefined") {
    return null;
  }
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Supabase credentials not found in environment variables");
    }
    return null;
  }
  
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(url, key);
  }
  
  return supabaseClient;
}

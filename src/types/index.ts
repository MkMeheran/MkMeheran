// User type with role-based access control
export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at?: string;
  full_name?: string;
  avatar_url?: string;
}

export type UserRole = "admin" | "user" | "moderator";

// Session type for authentication
export interface Session {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

// GeoJSON types for map functionality
export interface GeoJSONFeature {
  type: "Feature";
  geometry: GeoJSONGeometry;
  properties: Record<string, unknown>;
}

export interface GeoJSONGeometry {
  type:
    | "Point"
    | "LineString"
    | "Polygon"
    | "MultiPoint"
    | "MultiLineString"
    | "MultiPolygon"
    | "GeometryCollection";
  coordinates: unknown;
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

// Dashboard stats type
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  mapFeatures: number;
  apiCalls: number;
}

// Webhook payload for n8n integration
export interface WebhookPayload {
  event: string;
  timestamp: string;
  data: Record<string, unknown>;
}

// AI Agent request/response types
export interface AIAgentRequest {
  prompt: string;
  context?: string;
  maxTokens?: number;
}

export interface AIAgentResponse {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

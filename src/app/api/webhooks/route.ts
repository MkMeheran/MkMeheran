import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Verify webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) return false;
  
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// n8n incoming webhook handler
export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("x-webhook-signature");
    const webhookSecret = process.env.WEBHOOK_SECRET;

    // Verify signature if secret is configured
    if (webhookSecret && !verifyWebhookSignature(payload, signature, webhookSecret)) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 }
      );
    }

    const data = JSON.parse(payload);

    // Process the webhook payload
    const { event, ...eventData } = data;

    console.log(`Received webhook event: ${event}`, eventData);

    // Handle different event types
    switch (event) {
      case "user.created":
        // Handle user creation event from n8n
        console.log("Processing user.created event");
        break;

      case "data.sync":
        // Handle data sync event
        console.log("Processing data.sync event");
        break;

      case "notification":
        // Handle notification event
        console.log("Processing notification event");
        break;

      default:
        console.log(`Unknown event type: ${event}`);
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
      event,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Trigger n8n webhook
export async function PUT(request: NextRequest) {
  try {
    const { event, data } = await request.json();

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!n8nWebhookUrl) {
      return NextResponse.json(
        { success: false, error: "n8n webhook URL not configured" },
        { status: 500 }
      );
    }

    // Send webhook to n8n
    const response = await fetch(`${n8nWebhookUrl}/${event}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        event,
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    return NextResponse.json({
      success: true,
      message: "Webhook sent to n8n successfully",
    });
  } catch (error) {
    console.error("n8n trigger error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to trigger n8n webhook",
      },
      { status: 500 }
    );
  }
}

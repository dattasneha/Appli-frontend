import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.API_URL || "https://appli-oc5h.onrender.com/appli/v1";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Login proxy error:", error);
    return NextResponse.json(
      { detail: [{ msg: "Failed to connect to server" }] },
      { status: 500 }
    );
  }
}
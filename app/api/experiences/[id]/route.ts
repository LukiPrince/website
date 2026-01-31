import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { getExperience } from "@/lib/content";

export const runtime = "edge";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - Get single experience
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const experience = await getExperience(id);

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}

// PUT - Update experience (not available on Edge)
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: "Write operations not available on Cloudflare Edge Runtime",
        message: "To update experiences, edit the source files in content/experiences/ and redeploy"
      },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}

// DELETE - Delete experience (not available on Edge)
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        error: "Write operations not available on Cloudflare Edge Runtime",
        message: "To delete experiences, remove the file from content/experiences/ and redeploy"
      },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}

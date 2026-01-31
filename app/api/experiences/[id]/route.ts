import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getExperience,
  saveExperience,
  deleteExperience,
} from "@/lib/content";

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

// PUT - Update experience
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { order, year, title, company, description, technologies } = body;

    // Check if experience exists
    const existing = await getExperience(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    // Update the experience
    await saveExperience(id, {
      order: order ?? existing.order,
      year: year ?? existing.year,
      title: title ?? existing.title,
      company: company ?? existing.company,
      description: description ?? existing.description,
      technologies: technologies ?? existing.technologies,
    });

    return NextResponse.json({
      success: true,
      experience: {
        slug: id,
        order: order ?? existing.order,
        year: year ?? existing.year,
        title: title ?? existing.title,
        company: company ?? existing.company,
        description: description ?? existing.description,
        technologies: technologies ?? existing.technologies,
      },
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// DELETE - Delete experience
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if experience exists
    const existing = await getExperience(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    await deleteExperience(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}

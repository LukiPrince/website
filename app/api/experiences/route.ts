import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getExperiences,
  saveExperience,
  generateExperienceFilename,
} from "@/lib/content";

// GET - List all experiences
export async function GET() {
  try {
    const experiences = await getExperiences();
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

// POST - Create new experience
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { year, title, company, description, technologies } = body;

    // Validate required fields
    if (!year || !title || !company) {
      return NextResponse.json(
        { error: "Year, title, and company are required" },
        { status: 400 }
      );
    }

    // Get current experiences to determine order
    const experiences = await getExperiences();
    const order = experiences.length + 1;

    // Generate filename
    const slug = generateExperienceFilename(order, title);

    // Save the experience
    await saveExperience(slug, {
      order,
      year,
      title,
      company,
      description: description || "",
      technologies: technologies || [],
    });

    return NextResponse.json({
      success: true,
      slug,
      experience: {
        order,
        year,
        title,
        company,
        description: description || "",
        technologies: technologies || [],
        slug,
      },
    });
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

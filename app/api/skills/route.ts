import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  getSkills,
  getSkillCategory,
  saveSkillCategory,
} from "@/lib/content";

// GET - Get all skills
export async function GET() {
  try {
    const skills = await getSkills();
    return NextResponse.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// PUT - Update skills (expects { category: string, data: SkillCategory })
export async function PUT(request: NextRequest) {
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
    const { category, data } = body;

    if (!category || !data) {
      return NextResponse.json(
        { error: "Category and data are required" },
        { status: 400 }
      );
    }

    const validCategories = ["frontend", "backend", "tools"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category. Must be frontend, backend, or tools" },
        { status: 400 }
      );
    }

    // Save the skill category
    await saveSkillCategory(category, {
      category: data.category || category,
      title: data.title || category,
      order: data.order || 0,
      skills: data.skills || [],
    });

    // Return updated skills
    const updatedSkills = await getSkills();

    return NextResponse.json({
      success: true,
      skills: updatedSkills,
    });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}

// PATCH - Update a specific skill within a category
export async function PATCH(request: NextRequest) {
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
    const { category, skillIndex, skill } = body;

    if (!category || skillIndex === undefined || !skill) {
      return NextResponse.json(
        { error: "Category, skillIndex, and skill are required" },
        { status: 400 }
      );
    }

    // Get existing category
    const existingCategory = await getSkillCategory(category);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Update the specific skill
    const updatedSkills = [...existingCategory.skills];
    if (skillIndex >= 0 && skillIndex < updatedSkills.length) {
      updatedSkills[skillIndex] = {
        ...updatedSkills[skillIndex],
        ...skill,
      };
    } else {
      return NextResponse.json(
        { error: "Invalid skill index" },
        { status: 400 }
      );
    }

    // Save the updated category
    await saveSkillCategory(category, {
      ...existingCategory,
      skills: updatedSkills,
    });

    return NextResponse.json({
      success: true,
      category: {
        ...existingCategory,
        skills: updatedSkills,
      },
    });
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { error: "Failed to update skill" },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock data - replace with actual database calls
const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming',
    duration: '8 weeks',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Advanced Web Development',
    description: 'Master modern web development',
    duration: '12 weeks',
    level: 'Advanced',
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // TODO: Implement course creation logic
    return NextResponse.json(
      { message: 'Course created successfully', course: body },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
} 
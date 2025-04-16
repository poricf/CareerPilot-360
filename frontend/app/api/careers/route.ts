import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock data - replace with actual database calls
const careers = [
  {
    id: 1,
    title: 'Software Engineer',
    description: 'Develop and maintain software applications',
    salary: '$80,000 - $120,000',
    requirements: ['Bachelor\'s degree', '2+ years experience'],
  },
  {
    id: 2,
    title: 'Data Scientist',
    description: 'Analyze and interpret complex data',
    salary: '$90,000 - $130,000',
    requirements: ['Master\'s degree', 'Python/R experience'],
  },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(careers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch careers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // TODO: Implement career creation logic
    return NextResponse.json(
      { message: 'Career created successfully', career: body },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create career' },
      { status: 500 }
    );
  }
} 
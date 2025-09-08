import { NextRequest, NextResponse } from 'next/server';
import { generateLegalAdvice } from '@/lib/openai';
import { validateQuery, sanitizeInput } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { query, jurisdiction } = await req.json();

    // Validate input
    if (!query || !jurisdiction) {
      return NextResponse.json(
        { error: 'Query and jurisdiction are required' },
        { status: 400 }
      );
    }

    const sanitizedQuery = sanitizeInput(query);
    
    if (!validateQuery(sanitizedQuery)) {
      return NextResponse.json(
        { error: 'Invalid query format' },
        { status: 400 }
      );
    }

    // Generate legal advice
    const advice = await generateLegalAdvice(sanitizedQuery, jurisdiction);

    return NextResponse.json({
      success: true,
      data: advice,
    });

  } catch (error) {
    console.error('Legal advice API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate legal advice' },
      { status: 500 }
    );
  }
}

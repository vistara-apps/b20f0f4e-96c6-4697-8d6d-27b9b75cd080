import { NextRequest, NextResponse } from 'next/server';
import { generateLegalAdvice, analyzeLegalQuery } from '@/lib/openai';
import { validateLegalQuery, sanitizeInput } from '@/utils/validation';
import { ERROR_MESSAGES } from '@/lib/constants';
import { LegalAdviceResponse, Jurisdiction } from '@/types';

// Handle POST requests for legal advice
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = validateLegalQuery(body);
    const { query, jurisdiction, userId } = validatedData;

    // Sanitize the input
    const sanitizedQuery = sanitizeInput(query);

    // Analyze the query first to determine complexity and category
    const analysis = await analyzeLegalQuery(sanitizedQuery);
    
    // Generate legal advice
    const advice = await generateLegalAdvice(sanitizedQuery, jurisdiction);
    
    // Add analysis metadata to the response
    const enhancedAdvice: LegalAdviceResponse & {
      analysis: typeof analysis;
      disclaimer: string;
    } = {
      ...advice,
      analysis,
      disclaimer: 'This is general legal information, not legal advice. Consult with a qualified attorney for specific legal matters.',
    };

    // Log the query for analytics (in production, use proper logging)
    console.log(`Legal query from user ${userId}:`, {
      category: analysis.category,
      complexity: analysis.complexity,
      jurisdiction,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(enhancedAdvice);
  } catch (error) {
    console.error('Error in POST /api/advice:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.message },
        { status: 400 }
      );
    }

    // Handle OpenAI API errors
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json(
        { error: 'AI service temporarily unavailable' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle GET requests - return available legal categories
export async function GET() {
  try {
    const categories = [
      {
        id: 'employment',
        name: 'Employment Law',
        description: 'Workplace rights, discrimination, wrongful termination',
        icon: '💼',
      },
      {
        id: 'tenant',
        name: 'Tenant Rights',
        description: 'Rental disputes, evictions, security deposits',
        icon: '🏠',
      },
      {
        id: 'consumer',
        name: 'Consumer Protection',
        description: 'Fraud, warranties, unfair business practices',
        icon: '🛒',
      },
      {
        id: 'contract',
        name: 'Contract Disputes',
        description: 'Breach of contract, terms and conditions',
        icon: '📄',
      },
      {
        id: 'small-claims',
        name: 'Small Claims',
        description: 'Debt collection, property damage, minor disputes',
        icon: '⚖️',
      },
      {
        id: 'family',
        name: 'Family Law',
        description: 'Divorce, custody, domestic relations',
        icon: '👨‍👩‍👧‍👦',
      },
      {
        id: 'immigration',
        name: 'Immigration',
        description: 'Visas, citizenship, deportation defense',
        icon: '🌍',
      },
      {
        id: 'criminal',
        name: 'Criminal Law',
        description: 'Arrests, charges, court proceedings',
        icon: '🚔',
      },
      {
        id: 'intellectual-property',
        name: 'Intellectual Property',
        description: 'Copyrights, trademarks, patents',
        icon: '💡',
      },
      {
        id: 'business',
        name: 'Business Law',
        description: 'Formation, compliance, commercial disputes',
        icon: '🏢',
      },
    ];

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error in GET /api/advice:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

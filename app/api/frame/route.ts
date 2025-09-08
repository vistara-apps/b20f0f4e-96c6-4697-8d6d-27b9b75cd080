import { NextRequest, NextResponse } from 'next/server';
import { generateLegalAdvice } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData } = body;
    
    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const buttonIndex = untrustedData.buttonIndex;
    
    // Handle different button actions
    switch (buttonIndex) {
      case 1: // Get Legal Advice
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/query`,
        });
        
      case 2: // Browse Topics
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/topics`,
        });
        
      default:
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}`,
        });
    }
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'LegalEase Frame API' });
}

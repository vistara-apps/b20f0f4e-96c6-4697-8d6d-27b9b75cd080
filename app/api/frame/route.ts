import { NextRequest, NextResponse } from 'next/server';
import { generateLegalAdvice } from '@/lib/openai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { untrustedData, trustedData } = body;
    
    if (!untrustedData) {
      return NextResponse.json({ error: 'Invalid frame data' }, { status: 400 });
    }

    const buttonIndex = untrustedData.buttonIndex;
    const inputText = untrustedData.inputText;
    const fid = trustedData?.messageBytes ? 
      JSON.parse(Buffer.from(trustedData.messageBytes, 'hex').toString()).fid : 
      null;
    
    // Handle different button actions
    switch (buttonIndex) {
      case 1: // Get Legal Advice
        if (inputText) {
          // Process the legal query
          try {
            const advice = await generateLegalAdvice(inputText, 'GENERAL');
            return NextResponse.json({
              type: 'frame',
              frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/advice?summary=${encodeURIComponent(advice.summary.slice(0, 100))}`,
            });
          } catch (error) {
            return NextResponse.json({
              type: 'frame',
              frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/error?message=Failed to generate advice`,
            });
          }
        } else {
          return NextResponse.json({
            type: 'frame',
            frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/query`,
          });
        }
        
      case 2: // Browse Topics
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/topics`,
        });

      case 3: // Templates
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/templates`,
        });

      case 4: // Payment/Premium
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/payment`,
        });
        
      default:
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/welcome`,
        });
    }
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      type: 'frame',
      frameUrl: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/og/error?message=System error`
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'LegalEase Frame API' });
}

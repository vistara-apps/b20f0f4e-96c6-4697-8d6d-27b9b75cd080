import { NextRequest, NextResponse } from 'next/server';
import { 
  parseFrameRequest, 
  validateFrameRequest, 
  createFrameResponse,
  createErrorFrame,
  generateWelcomeImage,
  generateJurisdictionImage,
  generateAdviceImage
} from '@/lib/frame';
import { generateLegalAdvice } from '@/lib/openai';
import { sanitizeInput } from '@/utils/validation';
import { ERROR_MESSAGES } from '@/lib/constants';
import { Jurisdiction } from '@/types';

// Handle GET requests - return the initial frame
export async function GET() {
  try {
    const frameResponse = createFrameResponse(
      generateWelcomeImage(),
      [
        { label: 'Get Legal Advice' },
        { label: 'Select Jurisdiction' },
        { label: 'Browse Templates' },
        { label: 'Learn More' }
      ],
      { text: 'Describe your legal situation...' },
      `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
    );

    return NextResponse.json(frameResponse);
  } catch (error) {
    console.error('Error in GET /api/frame:', error);
    return NextResponse.json(
      createErrorFrame('Failed to load frame'),
      { status: 500 }
    );
  }
}

// Handle POST requests - process frame interactions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const frameRequest = parseFrameRequest(body);

    // Validate the frame request
    if (!validateFrameRequest(frameRequest)) {
      return NextResponse.json(
        createErrorFrame('Invalid frame request'),
        { status: 400 }
      );
    }

    const { untrustedData } = frameRequest;
    const buttonIndex = untrustedData.buttonIndex;
    const inputText = untrustedData.inputText;
    const userId = untrustedData.fid.toString();

    // Handle different button actions
    switch (buttonIndex) {
      case 1: // Get Legal Advice
        return await handleLegalAdviceRequest(inputText, userId);
      
      case 2: // Select Jurisdiction
        return handleJurisdictionSelection();
      
      case 3: // Browse Templates
        return handleTemplatesBrowsing();
      
      case 4: // Learn More
        return handleLearnMore();
      
      default:
        return NextResponse.json(
          createErrorFrame('Invalid button selection'),
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in POST /api/frame:', error);
    return NextResponse.json(
      createErrorFrame(ERROR_MESSAGES.API_ERROR),
      { status: 500 }
    );
  }
}

// Handle legal advice requests
async function handleLegalAdviceRequest(inputText: string | undefined, userId: string) {
  if (!inputText || inputText.trim().length < 10) {
    return NextResponse.json(
      createErrorFrame(
        ERROR_MESSAGES.INVALID_INPUT,
        `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
      )
    );
  }

  try {
    // Sanitize input
    const sanitizedInput = sanitizeInput(inputText);
    
    // For now, use GENERAL jurisdiction - in a full implementation,
    // we'd track user's jurisdiction selection
    const jurisdiction: Jurisdiction = 'GENERAL';
    
    // Generate legal advice using OpenAI
    const advice = await generateLegalAdvice(sanitizedInput, jurisdiction);
    
    // Create response frame with advice
    const frameResponse = createFrameResponse(
      generateAdviceImage(advice.summary, advice.actionSteps, advice.jurisdiction),
      [
        { label: 'Get Template' },
        { label: 'New Question' },
        { label: 'Share' },
        { label: 'More Info' }
      ],
      undefined,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/advice`
    );

    return NextResponse.json(frameResponse);
  } catch (error) {
    console.error('Error generating legal advice:', error);
    return NextResponse.json(
      createErrorFrame(
        'Failed to generate legal advice. Please try again.',
        `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
      )
    );
  }
}

// Handle jurisdiction selection
function handleJurisdictionSelection() {
  const frameResponse = createFrameResponse(
    generateJurisdictionImage(),
    [
      { label: 'US - California' },
      { label: 'US - New York' },
      { label: 'UK' },
      { label: 'More Options' }
    ],
    undefined,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/jurisdiction`
  );

  return NextResponse.json(frameResponse);
}

// Handle templates browsing
function handleTemplatesBrowsing() {
  const frameResponse = createFrameResponse(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/image/templates`,
    [
      { label: 'Demand Letter' },
      { label: 'Cease & Desist' },
      { label: 'Notice to Quit' },
      { label: 'More Templates' }
    ],
    undefined,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/templates`
  );

  return NextResponse.json(frameResponse);
}

// Handle learn more
function handleLearnMore() {
  const frameResponse = createFrameResponse(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/image/info`,
    [
      { label: 'How It Works' },
      { label: 'Pricing' },
      { label: 'Legal Disclaimer' },
      { label: 'Back to Start' }
    ],
    undefined,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/frame/info`
  );

  return NextResponse.json(frameResponse);
}

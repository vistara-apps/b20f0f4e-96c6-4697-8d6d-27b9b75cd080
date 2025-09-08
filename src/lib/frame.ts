import { FrameRequest, FrameResponse, FrameButton } from '@/types';
import { FRAME_CONFIG } from './constants';

/**
 * Create a Frame response with proper metadata
 */
export function createFrameResponse(
  image: string,
  buttons?: FrameButton[],
  input?: { text: string },
  postUrl?: string
): FrameResponse {
  return {
    image,
    buttons: buttons?.slice(0, FRAME_CONFIG.maxButtons),
    input,
    postUrl,
    aspectRatio: FRAME_CONFIG.aspectRatio,
  };
}

/**
 * Generate Frame HTML metadata
 */
export function generateFrameHTML(response: FrameResponse): string {
  const metaTags = [
    '<meta property="fc:frame" content="vNext" />',
    `<meta property="fc:frame:image" content="${response.image}" />`,
    `<meta property="fc:frame:image:aspect_ratio" content="${response.aspectRatio || '1.91:1'}" />`,
  ];

  // Add input field if specified
  if (response.input) {
    metaTags.push(`<meta property="fc:frame:input:text" content="${response.input.text}" />`);
  }

  // Add buttons
  if (response.buttons) {
    response.buttons.forEach((button, index) => {
      const buttonIndex = index + 1;
      metaTags.push(`<meta property="fc:frame:button:${buttonIndex}" content="${button.label}" />`);
      
      if (button.action) {
        metaTags.push(`<meta property="fc:frame:button:${buttonIndex}:action" content="${button.action}" />`);
      }
      
      if (button.target) {
        metaTags.push(`<meta property="fc:frame:button:${buttonIndex}:target" content="${button.target}" />`);
      }
    });
  }

  // Add post URL
  if (response.postUrl) {
    metaTags.push(`<meta property="fc:frame:post_url" content="${response.postUrl}" />`);
  }

  return metaTags.join('\n');
}

/**
 * Parse Frame request data
 */
export function parseFrameRequest(body: any): FrameRequest {
  return {
    untrustedData: {
      fid: body.untrustedData?.fid || 0,
      url: body.untrustedData?.url || '',
      messageHash: body.untrustedData?.messageHash || '',
      timestamp: body.untrustedData?.timestamp || Date.now(),
      network: body.untrustedData?.network || 1,
      buttonIndex: body.untrustedData?.buttonIndex || 1,
      inputText: body.untrustedData?.inputText,
      castId: body.untrustedData?.castId,
    },
    trustedData: {
      messageBytes: body.trustedData?.messageBytes || '',
    },
  };
}

/**
 * Validate Frame request
 */
export function validateFrameRequest(request: FrameRequest): boolean {
  const { untrustedData } = request;
  
  // Basic validation
  if (!untrustedData.fid || untrustedData.fid <= 0) {
    return false;
  }
  
  if (!untrustedData.messageHash) {
    return false;
  }
  
  if (untrustedData.buttonIndex < 1 || untrustedData.buttonIndex > FRAME_CONFIG.maxButtons) {
    return false;
  }
  
  // Validate input text length if present
  if (untrustedData.inputText && untrustedData.inputText.length > FRAME_CONFIG.maxInputLength) {
    return false;
  }
  
  return true;
}

/**
 * Create an error Frame response
 */
export function createErrorFrame(message: string, postUrl?: string): FrameResponse {
  return createFrameResponse(
    generateErrorImage(message),
    [{ label: 'Try Again' }],
    undefined,
    postUrl
  );
}

/**
 * Create a loading Frame response
 */
export function createLoadingFrame(message: string = 'Processing...'): FrameResponse {
  return createFrameResponse(
    generateLoadingImage(message),
    [],
    undefined,
    undefined
  );
}

/**
 * Generate error image URL (placeholder - in production, generate actual images)
 */
function generateErrorImage(message: string): string {
  // In production, this would generate an actual image with the error message
  // For now, return a placeholder that includes the message in the URL
  const encodedMessage = encodeURIComponent(message);
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/image/error?message=${encodedMessage}`;
}

/**
 * Generate loading image URL (placeholder - in production, generate actual images)
 */
function generateLoadingImage(message: string): string {
  // In production, this would generate an actual image with the loading message
  const encodedMessage = encodeURIComponent(message);
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/image/loading?message=${encodedMessage}`;
}

/**
 * Generate success image URL with legal advice
 */
export function generateAdviceImage(
  summary: string,
  actionSteps: string[],
  jurisdiction: string
): string {
  const params = new URLSearchParams({
    summary: summary.substring(0, 200), // Limit length for URL
    steps: actionSteps.slice(0, 3).join('|'), // First 3 steps
    jurisdiction,
  });
  
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/image/advice?${params.toString()}`;
}

/**
 * Generate template image URL
 */
export function generateTemplateImage(
  title: string,
  description: string,
  jurisdiction: string
): string {
  const params = new URLSearchParams({
    title: title.substring(0, 100),
    description: description.substring(0, 200),
    jurisdiction,
  });
  
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/image/template?${params.toString()}`;
}

/**
 * Generate jurisdiction selector image
 */
export function generateJurisdictionImage(): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/image/jurisdiction`;
}

/**
 * Generate welcome/intro image
 */
export function generateWelcomeImage(): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/api/image/welcome`;
}

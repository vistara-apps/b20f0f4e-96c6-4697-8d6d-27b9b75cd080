import { NextRequest, NextResponse } from 'next/server';

// Generate welcome image for the Frame
export async function GET(request: NextRequest) {
  try {
    // In a production app, you would generate an actual image using a library like:
    // - @vercel/og for generating OG images
    // - canvas or sharp for custom image generation
    // - Or use a service like Bannerbear, Placid, etc.
    
    // For now, we'll return an SVG as a placeholder
    const svg = `
      <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:hsl(220, 80%, 50%);stop-opacity:1" />
            <stop offset="100%" style="stop-color:hsl(140, 50%, 60%);stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="600" height="400" fill="url(#bg)"/>
        
        <!-- Content -->
        <g transform="translate(50, 80)">
          <!-- Logo/Icon -->
          <circle cx="75" cy="60" r="30" fill="white" opacity="0.9"/>
          <text x="75" y="70" text-anchor="middle" fill="hsl(220, 80%, 50%)" font-size="24" font-weight="bold">⚖️</text>
          
          <!-- Title -->
          <text x="150" y="45" fill="white" font-size="32" font-weight="bold" font-family="system-ui">
            LegalEase Frame
          </text>
          
          <!-- Tagline -->
          <text x="150" y="75" fill="white" font-size="18" opacity="0.9" font-family="system-ui">
            Understand your rights, act with confidence
          </text>
          
          <!-- Description -->
          <text x="50" y="130" fill="white" font-size="14" opacity="0.8" font-family="system-ui">
            Get plain-language legal information and actionable guidance
          </text>
          <text x="50" y="150" fill="white" font-size="14" opacity="0.8" font-family="system-ui">
            for everyday legal situations through Farcaster Frames.
          </text>
          
          <!-- Features -->
          <g transform="translate(0, 180)">
            <text x="50" y="20" fill="white" font-size="12" opacity="0.7" font-family="system-ui">
              ✓ Jurisdiction-specific guidance
            </text>
            <text x="50" y="40" fill="white" font-size="12" opacity="0.7" font-family="system-ui">
              ✓ Legal document templates
            </text>
            <text x="280" y="20" fill="white" font-size="12" opacity="0.7" font-family="system-ui">
              ✓ Plain-language explanations
            </text>
            <text x="280" y="40" fill="white" font-size="12" opacity="0.7" font-family="system-ui">
              ✓ Actionable next steps
            </text>
          </g>
          
          <!-- CTA -->
          <rect x="200" y="260" width="200" height="40" rx="20" fill="white" opacity="0.9"/>
          <text x="300" y="285" text-anchor="middle" fill="hsl(220, 80%, 50%)" font-size="14" font-weight="bold" font-family="system-ui">
            Get Started →
          </text>
        </g>
        
        <!-- Disclaimer -->
        <text x="300" y="385" text-anchor="middle" fill="white" font-size="10" opacity="0.6" font-family="system-ui">
          General legal information only • Not legal advice • Consult an attorney for specific matters
        </text>
      </svg>
    `;

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating welcome image:', error);
    return new NextResponse('Error generating image', { status: 500 });
  }
}

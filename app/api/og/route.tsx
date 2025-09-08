import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'hsl(220, 15%, 95%)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                backgroundColor: 'hsl(220, 80%, 50%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
              }}
            >
              ⚖️
            </div>
            <div style={{ color: 'hsl(220, 15%, 20%)' }}>
              LegalEase Frame
            </div>
          </div>
          <div
            style={{
              fontSize: 24,
              color: 'hsl(220, 15%, 40%)',
              textAlign: 'center',
              maxWidth: 600,
              lineHeight: 1.4,
            }}
          >
            Understand your rights, act with confidence
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'hsl(220, 15%, 40%)',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Plain-language legal information • Jurisdiction-specific guidance
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
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
              marginBottom: 40,
            }}
          >
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'hsl(220, 80%, 50%)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                color: 'white',
                fontSize: 28,
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
              color: 'hsl(220, 15%, 40%)',
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 40,
              maxWidth: 500,
            }}
          >
            Understand your rights, act with confidence.
            Get plain-language legal guidance for everyday situations.
          </div>

          <div
            style={{
              display: 'flex',
              gap: 20,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'hsl(220, 80%, 50%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 16,
              }}
            >
              Get Legal Advice
            </div>
            <div
              style={{
                backgroundColor: 'hsl(140, 50%, 60%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 16,
              }}
            >
              Browse Topics
            </div>
            <div
              style={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                color: 'hsl(220, 15%, 20%)',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 16,
                border: '2px solid hsl(220, 15%, 80%)',
              }}
            >
              Templates
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

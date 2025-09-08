import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const summary = searchParams.get('summary') || 'Legal advice generated successfully';

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
            padding: 40,
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
                backgroundColor: 'hsl(140, 50%, 60%)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                color: 'white',
                fontSize: 28,
              }}
            >
              ✅
            </div>
            <div style={{ color: 'hsl(220, 15%, 20%)' }}>
              Legal Advice Generated
            </div>
          </div>
          
          <div
            style={{
              backgroundColor: 'hsl(0, 0%, 100%)',
              border: '2px solid hsl(140, 50%, 60%)',
              borderRadius: 12,
              padding: 30,
              maxWidth: 800,
              fontSize: 18,
              color: 'hsl(220, 15%, 20%)',
              textAlign: 'center',
              lineHeight: 1.4,
              marginBottom: 40,
            }}
          >
            {summary}
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
              View Full Details
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
              Get Template
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
              Ask Another Question
            </div>
          </div>

          <div
            style={{
              fontSize: 12,
              color: 'hsl(220, 15%, 40%)',
              marginTop: 30,
              textAlign: 'center',
              maxWidth: 600,
            }}
          >
            ⚠️ This is informational only and does not constitute legal advice.
            Consult with a qualified attorney for specific legal matters.
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

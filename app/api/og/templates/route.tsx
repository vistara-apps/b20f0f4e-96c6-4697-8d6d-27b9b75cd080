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
                backgroundColor: 'hsl(280, 60%, 50%)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                color: 'white',
                fontSize: 28,
              }}
            >
              📄
            </div>
            <div style={{ color: 'hsl(220, 15%, 20%)' }}>
              Legal Templates
            </div>
          </div>
          
          <div
            style={{
              color: 'hsl(220, 15%, 40%)',
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 40,
              maxWidth: 600,
            }}
          >
            Professional legal document templates for common situations.
            Customized for your jurisdiction and needs.
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '2px solid hsl(220, 15%, 80%)',
                borderRadius: 8,
                padding: '15px 25px',
                fontSize: 16,
                color: 'hsl(220, 15%, 20%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: 400,
              }}
            >
              <span>📋 Demand Letter</span>
              <span style={{ color: 'hsl(140, 50%, 60%)', fontWeight: 'bold' }}>0.02 ETH</span>
            </div>
            <div
              style={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '2px solid hsl(220, 15%, 80%)',
                borderRadius: 8,
                padding: '15px 25px',
                fontSize: 16,
                color: 'hsl(220, 15%, 20%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: 400,
              }}
            >
              <span>🏠 Lease Termination</span>
              <span style={{ color: 'hsl(140, 50%, 60%)', fontWeight: 'bold' }}>0.02 ETH</span>
            </div>
            <div
              style={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '2px solid hsl(220, 15%, 80%)',
                borderRadius: 8,
                padding: '15px 25px',
                fontSize: 16,
                color: 'hsl(220, 15%, 20%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                minWidth: 400,
              }}
            >
              <span>🚫 Cease & Desist</span>
              <span style={{ color: 'hsl(140, 50%, 60%)', fontWeight: 'bold' }}>0.03 ETH</span>
            </div>
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
                backgroundColor: 'hsl(280, 60%, 50%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 16,
              }}
            >
              Browse All Templates
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
              Custom Request
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

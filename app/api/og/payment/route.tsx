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
                backgroundColor: 'hsl(45, 90%, 50%)',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 20,
                color: 'white',
                fontSize: 28,
              }}
            >
              💳
            </div>
            <div style={{ color: 'hsl(220, 15%, 20%)' }}>
              Premium Features
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
            Unlock advanced legal tools and personalized guidance.
            Pay only for what you use with micro-transactions.
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginBottom: 40,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <div
              style={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '2px solid hsl(45, 90%, 50%)',
                borderRadius: 12,
                padding: 25,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 10, color: 'hsl(220, 15%, 20%)' }}>
                ⭐ Premium Advice
              </div>
              <div style={{ fontSize: 16, color: 'hsl(220, 15%, 40%)', marginBottom: 15 }}>
                Detailed analysis with case law references
              </div>
              <div style={{ fontSize: 24, color: 'hsl(45, 90%, 50%)', fontWeight: 'bold' }}>
                0.05 ETH
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '2px solid hsl(280, 60%, 50%)',
                borderRadius: 12,
                padding: 25,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 10, color: 'hsl(220, 15%, 20%)' }}>
                📄 Custom Templates
              </div>
              <div style={{ fontSize: 16, color: 'hsl(220, 15%, 40%)', marginBottom: 15 }}>
                Personalized legal documents for your situation
              </div>
              <div style={{ fontSize: 24, color: 'hsl(280, 60%, 50%)', fontWeight: 'bold' }}>
                0.08 ETH
              </div>
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
                backgroundColor: 'hsl(45, 90%, 50%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: 8,
                fontSize: 16,
              }}
            >
              Connect Wallet
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
              View Pricing
            </div>
          </div>

          <div
            style={{
              fontSize: 12,
              color: 'hsl(220, 15%, 40%)',
              marginTop: 30,
              textAlign: 'center',
            }}
          >
            💡 Secure payments on Base network • Low fees • Instant access
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

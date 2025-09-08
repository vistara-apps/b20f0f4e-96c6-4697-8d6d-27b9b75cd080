import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentRequest } from '@/utils/validation';
import { ERROR_MESSAGES } from '@/lib/constants';

// Handle POST requests for payment processing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the payment request
    const validatedData = validatePaymentRequest(body);
    const { amount, currency, userId, serviceType, metadata } = validatedData;

    // In a production app, you would:
    // 1. Create a payment intent with your payment processor
    // 2. Handle the payment flow (Stripe, Base network, etc.)
    // 3. Update user's payment status
    // 4. Grant access to premium features

    // For now, return a mock payment response
    const paymentResponse = {
      paymentId: `payment_${Date.now()}`,
      status: 'pending',
      amount,
      currency,
      serviceType,
      paymentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/confirm?id=payment_${Date.now()}`,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes
      metadata: {
        userId,
        serviceType,
        ...metadata,
      },
    };

    // Log the payment request for analytics
    console.log(`Payment request from user ${userId}:`, {
      amount,
      currency,
      serviceType,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(paymentResponse);
  } catch (error) {
    console.error('Error in POST /api/payment:', error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid payment data', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle GET requests - return payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // In a production app, you would fetch the actual payment status
    // from your payment processor or database
    
    // For now, return a mock status
    const paymentStatus = {
      paymentId,
      status: 'completed', // pending, completed, failed, expired
      amount: 0.05,
      currency: 'ETH',
      completedAt: new Date().toISOString(),
      transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
    };

    return NextResponse.json(paymentStatus);
  } catch (error) {
    console.error('Error in GET /api/payment:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

// Handle PUT requests - update payment status (webhooks)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, status, transactionHash, metadata } = body;

    // In a production app, you would:
    // 1. Verify the webhook signature
    // 2. Update the payment status in your database
    // 3. Grant/revoke access to premium features
    // 4. Send confirmation emails/notifications

    console.log(`Payment status update for ${paymentId}:`, {
      status,
      transactionHash,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'Payment status updated successfully' 
    });
  } catch (error) {
    console.error('Error in PUT /api/payment:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.API_ERROR },
      { status: 500 }
    );
  }
}

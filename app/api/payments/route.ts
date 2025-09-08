import { NextRequest, NextResponse } from 'next/server';
import { validatePaymentRequest, createError, generateId, isValidTransactionHash } from '@/lib/utils';
import { PaymentRequest, PaymentResponse } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate the payment request
    const validation = validatePaymentRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        createError('VALIDATION_ERROR', 'Invalid payment request', validation.errors),
        { status: 400 }
      );
    }

    const { amount, currency, description, queryId, templateId } = body as PaymentRequest;

    // In a real implementation, this would integrate with Base network
    // For now, we'll simulate the payment process
    const paymentId = generateId();
    const transactionHash = `0x${Math.random().toString(16).substring(2).padStart(64, '0')}`;

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create payment response
    const paymentResponse: PaymentResponse = {
      transactionHash,
      status: 'confirmed', // In real implementation, this would start as 'pending'
      amount,
      currency,
    };

    // Log the payment for analytics and accounting
    console.log(`Payment processed: ${amount} ${currency}`, {
      paymentId,
      transactionHash,
      description,
      queryId,
      templateId,
      timestamp: new Date(),
    });

    // In a real implementation, you would:
    // 1. Create a transaction on Base network
    // 2. Wait for confirmation
    // 3. Update payment status
    // 4. Unlock the requested service (legal advice, template, etc.)

    return NextResponse.json({
      success: true,
      data: paymentResponse,
      paymentId,
      message: 'Payment processed successfully',
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        createError('PAYMENT_ERROR', error.message),
        { status: 500 }
      );
    }

    return NextResponse.json(
      createError('INTERNAL_ERROR', 'Failed to process payment'),
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const transactionHash = searchParams.get('transactionHash');
    const paymentId = searchParams.get('paymentId');

    if (!transactionHash && !paymentId) {
      return NextResponse.json(
        createError('MISSING_PARAMETER', 'Either transactionHash or paymentId is required'),
        { status: 400 }
      );
    }

    // Validate transaction hash format if provided
    if (transactionHash && !isValidTransactionHash(transactionHash)) {
      return NextResponse.json(
        createError('INVALID_HASH', 'Invalid transaction hash format'),
        { status: 400 }
      );
    }

    // In a real implementation, this would query the blockchain or database
    // For now, we'll simulate a payment status check
    const paymentStatus = {
      transactionHash: transactionHash || `0x${Math.random().toString(16).substring(2).padStart(64, '0')}`,
      status: 'confirmed',
      amount: 0.05,
      currency: 'ETH',
      confirmations: 12,
      blockNumber: 12345678,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: paymentStatus,
      message: 'Payment status retrieved successfully',
    });

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json(
      createError('STATUS_CHECK_ERROR', 'Failed to check payment status'),
      { status: 500 }
    );
  }
}

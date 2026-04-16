import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are set
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({
        success: false,
        error: 'Razorpay credentials not configured',
        details: {
          keyId: keyId ? 'Set' : 'Missing',
          keySecret: keySecret ? 'Set' : 'Missing',
        }
      });
    }

    // Try to initialize Razorpay
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    // Try to create a test order
    const testOrder = await razorpay.orders.create({
      amount: 100, // ₹1 in paise
      currency: 'INR',
      receipt: `test_${Date.now()}`,
      notes: {
        test: 'true'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Razorpay is configured correctly!',
      testOrder: {
        id: testOrder.id,
        amount: testOrder.amount,
        currency: testOrder.currency,
        status: testOrder.status,
      },
      credentials: {
        keyId: keyId.substring(0, 10) + '...',
        keySecret: '***' + keySecret.substring(keySecret.length - 4),
      }
    });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Razorpay test failed',
      message: error.message,
      details: error.error || error,
    }, { status: 500 });
  }
}

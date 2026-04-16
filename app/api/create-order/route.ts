import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    // Hardcoded Razorpay credentials for immediate deployment
    const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_Rjvg7mjDAAKe1R';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '2KH3YutLCT2DW4AcHdvhXyg7';

    // Initialize Razorpay inside the function to avoid build-time errors
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const { amount, currency, items, shippingAddress, coinsUsed, isBuyNow } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const options = {
      amount: amount, // amount in paise
      currency: currency || 'INR',
      receipt: `order_${Date.now()}`,
      notes: {
        items: JSON.stringify(items),
        shippingAddress: JSON.stringify(shippingAddress),
        coinsUsed: coinsUsed || 0,
        isBuyNow: isBuyNow || false,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
      }
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create order' 
      },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';

// POST /api/payment/verify - Verify Razorpay payment
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

    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      type, // 'membership' or 'coin_topup' or 'order'
      userId 
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing payment verification data' },
        { status: 400 }
      );
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', keySecret)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const order = await razorpay.orders.fetch(razorpay_order_id);

    if (payment.status !== 'captured') {
      return NextResponse.json(
        { success: false, error: 'Payment not captured' },
        { status: 400 }
      );
    }

    // Process based on payment type
    if (type === 'membership') {
      // Handle membership upgrade
      const planType = order.notes?.planType;
      const planName = order.notes?.planName;
      
      // Here you would update the user's membership in your database
      console.log(`Upgrading user ${userId} to ${planType} membership`);
      
      return NextResponse.json({
        success: true,
        message: `Successfully upgraded to ${planName}!`,
        data: {
          membershipType: planType,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id
        }
      });
    } else if (type === 'order') {
      // Handle regular order payment (cart or buy now)
      console.log(`Processing order payment for user ${userId}`);
      
      return NextResponse.json({
        success: true,
        message: 'Order placed successfully!',
        data: {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amount: Number(payment.amount) / 100, // Convert paise to rupees
        }
      });
    } else if (type === 'coin_topup') {
      // Handle coin top-up
      const coinsToAdd = order.notes?.coinsToAdd ? parseInt(String(order.notes.coinsToAdd)) : 0;
      const bonusCoins = order.notes?.bonusCoins ? parseInt(String(order.notes.bonusCoins)) : 0;
      const totalCoins = order.notes?.totalCoins ? parseInt(String(order.notes.totalCoins)) : 0;
      
      // Here you would add coins to user's wallet in your database
      console.log(`Adding ${totalCoins} coins to user ${userId} wallet`);
      
      return NextResponse.json({
        success: true,
        message: `Successfully added ${totalCoins} coins to your wallet!`,
        data: {
          coinsAdded: coinsToAdd,
          bonusCoins: bonusCoins,
          totalCoins: totalCoins,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id
        }
      });
    }

    // Default response for unknown types
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully!',
      data: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      }
    });

  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}

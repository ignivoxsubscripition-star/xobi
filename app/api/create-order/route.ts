import { NextRequest, NextResponse } from 'next/server';
import { getJioPayClient } from '@/lib/jiopay';

export async function POST(request: NextRequest) {
  try {
    const jiopay = getJioPayClient();

    const { amount, customerEmail } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // amount arrives in paise (matching old Razorpay contract used by the
    // frontend) - JioPay expects a plain rupee string like "100.00"
    const amountInRupees = (amount / 100).toFixed(2);
    const merchantTxnNo = `order_${Date.now()}`;

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const result = await jiopay.initiateSale({
      merchantTxnNo,
      amount: amountInRupees,
      customerEmailID: customerEmail,
      returnURL: `${baseUrl}/api/payment/callback`,
    });

    // JioPay requires tranCtx to be sent along with the redirect to
    // redirectURI (not just the bare URL), so we append it as a query param.
    let redirectURI = result.redirectURI;
    if (redirectURI && result.tranCtx) {
      const separator = redirectURI.includes('?') ? '&' : '?';
      redirectURI = `${redirectURI}${separator}tranCtx=${encodeURIComponent(result.tranCtx)}`;
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: merchantTxnNo,
        redirectURI,
        amount,
        currency: 'INR',
      },
    });
  } catch (error: any) {
    console.error('Error creating JioPay order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
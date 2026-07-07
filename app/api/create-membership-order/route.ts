import { NextRequest, NextResponse } from 'next/server';
import { getJioPayClient } from '@/lib/jiopay';

export async function POST(request: NextRequest) {
  try {
    const jiopay = getJioPayClient();

    const { planId, amount, currency, customerEmail } = await request.json();

    const amountInRupees = (amount / 100).toFixed(2); // amount arrives in paise
    const merchantTxnNo = `membership_${planId}_${Date.now()}`;

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const result = await jiopay.initiateSale({
      merchantTxnNo,
      amount: amountInRupees,
      customerEmailID: customerEmail,
      returnURL: `${baseUrl}/api/payment/callback`,
    });

    return NextResponse.json({
      success: true,
      data: {
        orderId: merchantTxnNo,
        redirectURI: result.redirectURI,
        amount,
        currency: currency || 'INR',
      },
    });
  } catch (error: any) {
    console.error('Error creating JioPay membership order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create membership order' },
      { status: 500 }
    );
  }
}
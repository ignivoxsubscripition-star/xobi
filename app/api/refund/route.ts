import { NextRequest, NextResponse } from 'next/server';
import { getJioPayClient } from '@/lib/jiopay';

export async function POST(request: NextRequest) {
  try {
    const jiopay = getJioPayClient();
    const { orderId, amount } = await request.json();

    if (!orderId || !amount) {
      return NextResponse.json(
        { success: false, error: 'orderId and amount are required' },
        { status: 400 }
      );
    }

    const amountInRupees = (amount / 100).toFixed(2); // amount in paise, like other routes
    const result = await jiopay.refund(orderId, amountInRupees);

    if (result.responseCode !== 'R1000') {
      return NextResponse.json(
        { success: false, error: result.respDescription || 'Refund failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        refundTxnNo: result.merchantTxnNo,
        txnID: result.txnID,
      },
    });
  } catch (error: any) {
    console.error('Error processing refund:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Refund failed' },
      { status: 500 }
    );
  }
}
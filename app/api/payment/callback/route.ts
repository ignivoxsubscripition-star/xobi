import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  let payload: Record<string, any> = {};

  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        payload[key] = value;
      });
    }
  } catch (error) {
    console.error('Failed to parse JioPay callback payload:', error);
  }

  const { responseCode, merchantTxnNo, txnID } = payload;

  // NOTE: this is browser-controlled, not verified as source of truth.
  // Real confirmation happens in /api/payment/verify (the S2S webhook).
  const isSuccess = responseCode === '0000';

  const redirectUrl = isSuccess
    ? `${baseUrl}/order-success?order_id=${merchantTxnNo}&payment_id=${txnID}`
    : `${baseUrl}/checkout?error=payment_failed`;

  return NextResponse.redirect(redirectUrl, { status: 303 });
}
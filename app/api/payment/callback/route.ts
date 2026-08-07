import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  let payload: Record<string, any> = {};

  try {
    const contentType = request.headers.get('content-type') || '';
    console.log('=== RAW B2B CALLBACK RECEIVED === URL:', request.url, '| content-type:', contentType);
    if (contentType.includes('application/json')) {
      const rawBodyText = await request.text();
      console.log('=== RAW B2B CALLBACK BODY ===', rawBodyText);
      payload = JSON.parse(rawBodyText);
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      console.log('=== RAW B2B CALLBACK FORM DATA ===', JSON.stringify(payload));
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
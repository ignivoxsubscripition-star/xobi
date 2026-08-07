import { NextRequest, NextResponse } from 'next/server';
import { getJioPayClient } from '@/lib/jiopay';

export async function POST(request: NextRequest) {
  try {
    // const jiopay = getJioPayClient();
    // const payload = await request.json();
    const jiopay = getJioPayClient();
    const rawBodyText = await request.text();
    console.log('=== RAW S2S WEBHOOK RECEIVED ===', rawBodyText);
    const payload = JSON.parse(rawBodyText);

    const isValid = jiopay.verifySecureHash(payload);
    if (!isValid) {
      console.error('JioPay webhook: hash verification failed', payload);
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const { responseCode, merchantTxnNo, txnID, amount } = payload;
    const isSuccess = responseCode === '0000';

    if (!isSuccess) {
      console.log(`Payment failed for ${merchantTxnNo}: ${payload.respDescription}`);
      return NextResponse.json({ success: true }); // ack receipt either way
    }

    // merchantTxnNo prefix tells us what this payment was for, since
    // JioPay's webhook has no client-supplied "type"/"userId" fields
    // (unlike the old Razorpay flow where the frontend passed those in).
    if (merchantTxnNo?.startsWith('order_')) {
      console.log(`Order payment confirmed: ${merchantTxnNo}, txnID: ${txnID}, amount: ${amount}`);
      // TODO: mark order as paid in your order storage once that exists
    } else if (merchantTxnNo?.startsWith('membership_')) {
      console.log(`Membership payment confirmed: ${merchantTxnNo}, txnID: ${txnID}`);
      // TODO: upgrade user's membership
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error processing JioPay webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
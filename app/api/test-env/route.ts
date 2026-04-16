import { NextResponse } from 'next/server';

// GET /api/test-env - Test if environment variables are loaded
// This endpoint helps verify that Razorpay credentials are configured on AWS
export async function GET() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  return NextResponse.json({
    status: 'Environment Variables Check',
    razorpay: {
      hasKeyId: !!keyId,
      hasKeySecret: !!keySecret,
      hasPublicKey: !!publicKey,
      keyIdPrefix: keyId ? keyId.substring(0, 8) + '...' : 'NOT SET',
      // Never expose full credentials!
    },
    allConfigured: !!keyId && !!keySecret && !!publicKey,
    message: !!keyId && !!keySecret && !!publicKey 
      ? '✅ All Razorpay credentials are configured correctly!' 
      : '❌ Missing Razorpay credentials. Please set environment variables on AWS.',
    instructions: !keyId || !keySecret || !publicKey 
      ? 'See AWS_DEPLOYMENT_GUIDE.md for setup instructions'
      : null
  });
}

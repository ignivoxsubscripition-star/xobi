# 🚀 Quick Fix for AWS Payment Errors

## The Problem
All payment features showing errors on AWS:
- ❌ Buy Now: "Failed to create order: `key_id` or `oauthToken` is mandatory"
- ❌ Cart Checkout: "Payment failed. Please try again."
- ❌ Membership: "Something went wrong. Please try again."

## The Solution (5 Minutes)

### Step 1: Set Environment Variables on AWS

**If using AWS Elastic Beanstalk:**
1. Open AWS Console → Elastic Beanstalk
2. Select your environment
3. Click **Configuration** → **Software** → **Edit**
4. Add these 3 variables:

```
RAZORPAY_KEY_ID = rzp_test_Rjvg7mjDAAKe1R
RAZORPAY_KEY_SECRET = 2KH3YutLCT2DW4AcHdvhXyg7
NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_test_Rjvg7mjDAAKe1R
```

5. Click **Apply** and wait 2-3 minutes

**If using EC2 directly:**
```bash
# SSH into your server
ssh -i your-key.pem ubuntu@your-server-ip

# Go to your app folder
cd ~/xobikart

# Create .env.local file with ALL required variables
cat > .env.local << 'EOF'
RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
RAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
EKYC_API_USERNAME=<YOUR_EKYC_USERNAME>
EKYC_API_TOKEN=5cbf9f97ff8cd6ab1f1d48ce95a7adf9
EOF

# Verify the file was created correctly
cat .env.local

# Restart your app
pm2 restart all
# OR
npm run build && npm start
```

### Step 2: Verify It's Working

Visit this URL in your browser:
```
https://your-domain.com/api/test-env
```

**Should see:**
```json
{
  "allConfigured": true,
  "message": "✅ All Razorpay credentials are configured correctly!"
}
```

**If you see `"allConfigured": false`:**
- Environment variables not set correctly
- Application not restarted after setting variables
- Check AWS CloudWatch logs for errors

### Step 3: Test Payment Features

1. **Buy Now**: Go to any product → Click "Buy Now" → Should open Razorpay
2. **Cart**: Add items → Checkout → Should open Razorpay
3. **Membership**: Go to /membership → Upgrade → Should open Razorpay

## That's It! 🎉

All payment features should now work on AWS.

---

## For Production (When Going Live)

Replace test credentials with live ones:

1. Get live keys from: https://dashboard.razorpay.com (Live Mode)
2. Update environment variables with live keys:
   ```
   RAZORPAY_KEY_ID = rzp_live_XXXXXXXXXX
   RAZORPAY_KEY_SECRET = your_live_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_live_XXXXXXXXXX
   ```

## Need More Help?

See detailed guides:
- `AWS_DEPLOYMENT_GUIDE.md` - Complete AWS setup instructions
- `PAYMENT_FIXES_SUMMARY.md` - All fixes and testing checklist

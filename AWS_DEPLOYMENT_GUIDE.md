# AWS Deployment Guide - Environment Variables Setup

## Problem
You're seeing these errors on AWS:
- ❌ Failed to create order: `key_id` or `oauthToken` is mandatory
- Payment failed. Please try again.
- Something went wrong. Please try again.

## Root Cause
The `.env.local` file is not deployed to AWS (it's in `.gitignore`), so your Razorpay credentials are missing on the server.

## Solution: Set Environment Variables on AWS

### Option 1: Using AWS Elastic Beanstalk Console

1. **Go to your Elastic Beanstalk environment**
   - Open AWS Console → Elastic Beanstalk
   - Select your application and environment

2. **Configure Environment Properties**
   - Click "Configuration" in the left sidebar
   - Scroll to "Software" section
   - Click "Edit"

3. **Add Environment Variables**
   Add these three variables:
   ```
   Name: RAZORPAY_KEY_ID
   Value: rzp_test_Rjvg7mjDAAKe1R

   Name: RAZORPAY_KEY_SECRET
   Value: 2KH3YutLCT2DW4AcHdvhXyg7

   Name: NEXT_PUBLIC_RAZORPAY_KEY_ID
   Value: rzp_test_Rjvg7mjDAAKe1R
   ```

4. **Apply Changes**
   - Click "Apply" at the bottom
   - Wait for environment to update (2-3 minutes)

### Option 2: Using AWS CLI

```bash
# Set environment variables
aws elasticbeanstalk update-environment \
  --environment-name your-environment-name \
  --option-settings \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=RAZORPAY_KEY_ID,Value=rzp_test_Rjvg7mjDAAKe1R \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=RAZORPAY_KEY_SECRET,Value=2KH3YutLCT2DW4AcHdvhXyg7 \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=NEXT_PUBLIC_RAZORPAY_KEY_ID,Value=rzp_test_Rjvg7mjDAAKe1R
```

### Option 3: Using .ebextensions (Recommended for Production)

1. **Create configuration file**
   Create `.ebextensions/environment.config`:

```yaml
option_settings:
  aws:elasticbeanstalk:application:environment:
    RAZORPAY_KEY_ID: "rzp_test_Rjvg7mjDAAKe1R"
    RAZORPAY_KEY_SECRET: "2KH3YutLCT2DW4AcHdvhXyg7"
    NEXT_PUBLIC_RAZORPAY_KEY_ID: "rzp_test_Rjvg7mjDAAKe1R"
```

2. **Commit and deploy**
```bash
git add .ebextensions/environment.config
git commit -m "Add environment variables"
git push
```

### Option 4: Using EC2 Instance (if not using Elastic Beanstalk)

1. **SSH into your EC2 instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

2. **Navigate to your app directory**
```bash
cd /path/to/your/xobikart
```

3. **Create .env.local file**
```bash
nano .env.local
```

4. **Add these lines**
```
RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
RAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
```

5. **Save and restart your app**
```bash
# Save: Ctrl+X, then Y, then Enter

# Restart your Next.js app (depends on your setup)
pm2 restart all
# OR
npm run build && npm start
```

## Verification

After setting environment variables, test each feature:

1. **Test Buy Now**
   - Go to any product page
   - Click "Buy Now"
   - Fill shipping details
   - Click "Place Order"
   - Should open Razorpay payment modal

2. **Test Cart Checkout**
   - Add items to cart
   - Go to checkout
   - Fill shipping details
   - Click "Pay"
   - Should open Razorpay payment modal

3. **Test Membership Plans**
   - Go to /membership
   - Click "Upgrade" on any plan
   - Should open Razorpay payment modal

## Important Notes

### For Production (Live Razorpay Account)
When you're ready to go live:

1. **Get Live Credentials**
   - Login to https://dashboard.razorpay.com
   - Switch to "Live Mode" (top left)
   - Go to Settings → API Keys
   - Generate Live Keys

2. **Update Environment Variables**
   Replace test credentials with live ones:
   ```
   RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
   RAZORPAY_KEY_SECRET=your_live_secret_key
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXX
   ```

### Security Best Practices

1. **Never commit credentials to Git**
   - `.env.local` is already in `.gitignore`
   - Use `.env.example` for documentation only

2. **Use AWS Secrets Manager (Advanced)**
   For better security, store credentials in AWS Secrets Manager:
   ```bash
   aws secretsmanager create-secret \
     --name xobikart/razorpay \
     --secret-string '{"key_id":"rzp_test_xxx","key_secret":"xxx"}'
   ```

3. **Rotate Keys Regularly**
   - Change Razorpay keys every 3-6 months
   - Update environment variables after rotation

## Troubleshooting

### Still seeing errors after setting variables?

1. **Check if variables are loaded**
   Add this test endpoint temporarily:

   Create `app/api/test-env/route.ts`:
   ```typescript
   import { NextResponse } from 'next/server';

   export async function GET() {
     return NextResponse.json({
       hasKeyId: !!process.env.RAZORPAY_KEY_ID,
       hasKeySecret: !!process.env.RAZORPAY_KEY_SECRET,
       hasPublicKey: !!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
       // Don't expose actual values!
     });
   }
   ```

   Visit: `https://your-domain.com/api/test-env`
   Should return: `{"hasKeyId":true,"hasKeySecret":true,"hasPublicKey":true}`

2. **Restart your application**
   Environment variables are loaded at startup. After setting them:
   - Elastic Beanstalk: Restart environment
   - PM2: `pm2 restart all`
   - Docker: Restart container

3. **Check AWS CloudWatch Logs**
   Look for error messages:
   ```
   Razorpay credentials not configured
   ```

## Need Help?

If you're still facing issues:
1. Check which AWS service you're using (EB, EC2, ECS, etc.)
2. Verify environment variables are set correctly
3. Check application logs for specific error messages
4. Ensure you've restarted the application after setting variables

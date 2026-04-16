#!/bin/bash
# Quick fix script for AWS .env.local file
# Run this on your AWS server: bash fix-aws-env.sh

echo "🔧 Fixing .env.local file on AWS..."

# Backup existing .env.local
if [ -f .env.local ]; then
    cp .env.local .env.local.backup
    echo "✅ Backed up existing .env.local to .env.local.backup"
fi

# Create new .env.local with all required variables
cat > .env.local << 'EOF'
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
RAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R

# eKYC Configuration
EKYC_API_USERNAME=<YOUR_EKYC_USERNAME>
EKYC_API_TOKEN=5cbf9f97ff8cd6ab1f1d48ce95a7adf9
EOF

echo "✅ Created new .env.local file with all required variables"
echo ""
echo "📋 Current .env.local contents:"
cat .env.local
echo ""
echo "🔄 Now restart your application:"
echo "   pm2 restart all"
echo "   OR"
echo "   npm run build && npm start"
echo ""
echo "✅ After restart, test at: https://your-domain.com/api/test-env"

# Environment Variables - Before vs After

## ❌ BEFORE (Your Current AWS Setup - BROKEN)

```bash
ubuntu@ip-172-31-11-54:~/xobikart$ cat .env.local
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
RAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7
EKYC_API_USERNAME=<YOUR_EKYC_USERNAME>
EKYC_API_TOKEN=5cbf9f97ff8cd6ab1f1d48ce95a7adf9
```

**Problem:** Missing `RAZORPAY_KEY_ID` (line breaks also missing)

**Result:**
- ❌ Buy Now fails: "key_id or oauthToken is mandatory"
- ❌ Cart checkout fails: "Payment failed"
- ❌ Membership fails: "Something went wrong"

---

## ✅ AFTER (Correct Setup - WORKING)

```bash
ubuntu@ip-172-31-11-54:~/xobikart$ cat .env.local
RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
RAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
EKYC_API_USERNAME=<YOUR_EKYC_USERNAME>
EKYC_API_TOKEN=5cbf9f97ff8cd6ab1f1d48ce95a7adf9
```

**Fixed:** Added `RAZORPAY_KEY_ID` and proper line breaks

**Result:**
- ✅ Buy Now works
- ✅ Cart checkout works
- ✅ Membership works
- ✅ All payment features functional

---

## What Each Variable Does

| Variable | Used By | Purpose |
|----------|---------|---------|
| `RAZORPAY_KEY_ID` | **Backend API** | Create orders, verify payments (SERVER-SIDE) |
| `RAZORPAY_KEY_SECRET` | **Backend API** | Verify payment signatures (SERVER-SIDE) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | **Frontend** | Initialize Razorpay modal (CLIENT-SIDE) |
| `EKYC_API_USERNAME` | **Backend API** | Seller verification (optional) |
| `EKYC_API_TOKEN` | **Backend API** | Seller verification (optional) |

---

## Key Differences

### Your File (Broken)
```
Line 1: NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1RRAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7EKYC_API_USERNAME=<YOUR_EKYC_USERNAME>EKYC_API_TOKEN=5cbf9f97ff8cd6ab1f1d48ce95a7adf9
```
- All on one line (no line breaks)
- Missing `RAZORPAY_KEY_ID`
- Typo: `EKYC` instead of `EKYC`

### Correct File (Working)
```
Line 1: RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
Line 2: RAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7
Line 3: NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
Line 4: EKYC_API_USERNAME=<YOUR_EKYC_USERNAME>
Line 5: EKYC_API_TOKEN=5cbf9f97ff8cd6ab1f1d48ce95a7adf9
```
- Each variable on separate line
- All required variables present
- Correct variable names

---

## How to Fix

Run this on your AWS server:

```bash
cd ~/xobikart

# Backup old file
cp .env.local .env.local.broken

# Create correct file
cat > .env.local << 'EOF'
RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
RAZORPAY_KEY_SECRET=2KH3YutLCT2DW4AcHdvhXyg7
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_Rjvg7mjDAAKe1R
EKYC_API_USERNAME=<YOUR_EKYC_USERNAME>
EKYC_API_TOKEN=5cbf9f97ff8cd6ab1f1d48ce95a7adf9
EOF

# Verify
cat .env.local

# Restart
pm2 restart all
```

---

## Verification

After fixing, check:

```bash
# Should show 5 lines
cat .env.local | wc -l

# Should show all variables
cat .env.local
```

Then visit: `https://your-domain.com/api/test-env`

Should return:
```json
{
  "allConfigured": true,
  "message": "✅ All Razorpay credentials are configured correctly!"
}
```

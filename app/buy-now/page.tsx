'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useBuyNow } from '@/context/BuyNowContext';
import { useAuth } from '@/context/AuthContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import CoinPayment from '@/components/checkout/CoinPayment';
import { useMembership } from '@/context/MembershipContext';

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export default function BuyNowPage() {
  const { buyNowItem, clearBuyNowItem } = useBuyNow();
  const { user } = useAuth();
  const { getMembershipType, coinBalance } = useMembership();
  const { initiatePayment } = useRazorpay();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });

  const deliveryCharge = buyNowItem && buyNowItem.product.price * buyNowItem.quantity > 500 ? 0 : 50;
  const subtotal = buyNowItem ? buyNowItem.product.price * buyNowItem.quantity : 0;
  const totalAmount = subtotal + deliveryCharge;

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!buyNowItem) {
      router.push('/');
      return;
    }

    setFinalAmount(totalAmount);
  }, [user, buyNowItem, router, totalAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['fullName', 'address', 'city', 'state', 'pincode', 'phone'];
    return required.every(field => shippingAddress[field as keyof ShippingAddress].trim() !== '');
  };

  const handleCoinUsageChange = (coins: number, amount: number) => {
    setCoinsToUse(coins);
    setFinalAmount(amount);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!buyNowItem) return;

    setLoading(true);

    try {
      // Create order on backend
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount * 100, // Razorpay expects amount in paise
          currency: 'INR',
          items: [{
            id: buyNowItem.product.id,
            name: buyNowItem.product.name,
            price: buyNowItem.product.price,
            quantity: buyNowItem.quantity,
            image: buyNowItem.product.image
          }],
          shippingAddress: shippingAddress,
          coinsUsed: coinsToUse,
          isBuyNow: true,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Initiate Razorpay payment
      await initiatePayment({
        orderId: data.data.orderId,
        amount: data.data.amount,
        currency: data.data.currency,
        name: 'Xobikart Order',
        description: `Order for ${buyNowItem.product.name}`,
        type: 'order', // Changed to 'order' type
        onSuccess: (verifyResponse) => {
          console.log('Payment successful:', verifyResponse);
          clearBuyNowItem();
          // Redirect to order success page with correct parameter names
          window.location.href = `/order-success?order_id=${data.data.orderId}&payment_id=${verifyResponse.data?.paymentId || ''}`;
        },
        onError: (error) => {
          console.error('Payment failed:', error);
          alert(`❌ Payment failed: ${error.message}`);
          setLoading(false);
        },
      });
    } catch (error: any) {
      console.error('Order creation failed:', error);
      alert(`❌ Failed to create order: ${error.message}`);
      setLoading(false);
    }
  };

  if (!buyNowItem) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No item selected</h2>
            <button
              onClick={() => router.push('/')}
              className="bg-brand-gradient text-white px-6 py-3 rounded-xl hover:bg-secondary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <span className="text-gray-900 font-medium">Buy Now Checkout</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Purchase</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingAddress.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingAddress.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={shippingAddress.pincode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Coin Payment */}
              {coinBalance && coinBalance.balance > 0 && (
                <CoinPayment
                  orderAmount={totalAmount}
                  userCoinBalance={coinBalance.balance}
                  membershipType={getMembershipType()}
                  onCoinUsageChange={handleCoinUsageChange}
                />
              )}
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Product Item */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={buyNowItem.product.image}
                      alt={buyNowItem.product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {buyNowItem.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">Qty: {buyNowItem.quantity}</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      ₹{(buyNowItem.product.price * buyNowItem.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : ''}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  {coinsToUse > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Coins Used</span>
                      <span>-₹{coinsToUse}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>₹{finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-brand-gradient text-white py-4 rounded-xl font-bold text-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure Payment via Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
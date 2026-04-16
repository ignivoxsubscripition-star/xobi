'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState({
    paymentId: '',
    orderId: '',
    orderNumber: '',
    isValid: false,
  });
  const [loading, setLoading] = useState(true);

  // Generate a stable order number that doesn't change on re-renders
  const generateOrderNumber = useMemo(() => {
    return (id: string) => {
      // Extract numeric part from Razorpay order ID or use a hash of the ID
      const numericPart = id.replace(/[^0-9]/g, '').slice(-8) || 
                         Math.abs(id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)).toString().slice(-8);
      return `ORD-${numericPart.padStart(8, '0')}`;
    };
  }, []);

  useEffect(() => {
    let paymentId = searchParams.get('payment_id');
    let orderId = searchParams.get('order_id');
    
    // Check sessionStorage as backup
    if (!paymentId || !orderId) {
      const storedPayment = sessionStorage.getItem('payment_success');
      if (storedPayment) {
        try {
          const paymentData = JSON.parse(storedPayment);
          paymentId = paymentData.payment_id;
          orderId = paymentData.order_id;
        } catch (error) {
          console.error('Error parsing stored payment data:', error);
        }
      }
    }
    
    // Check if we have the required parameters
    if (paymentId && orderId) {
      setOrderDetails({
        paymentId,
        orderId,
        orderNumber: generateOrderNumber(orderId),
        isValid: true,
      });
      
      // Clear cart after successful order
      clearCart();
      
      // Clear the stored payment data
      sessionStorage.removeItem('payment_success');
    } else {
      // If no payment details, redirect to home after a delay
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
    
    setLoading(false);
  }, [searchParams, router, clearCart, generateOrderNumber]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your order...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no valid order details
  if (!orderDetails.isValid) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find your order details. This might happen if you navigated here directly or if the payment wasn&apos;t completed successfully.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-gradient text-white font-semibold rounded-full hover:bg-secondary transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium text-gray-900">{orderDetails.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-medium text-gray-900 text-sm">{orderDetails.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium text-gray-900">
                  {new Date().toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer:</span>
                <span className="font-medium text-gray-900">{user?.name}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What happens next?</h3>
            <div className="text-left space-y-2 text-blue-800">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Order confirmation email sent to {user?.email}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Your order will be processed within 24 hours</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>You&apos;ll receive tracking information once shipped</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span>Estimated delivery: 3-5 business days</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/orders"
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-gradient text-white font-semibold rounded-full hover:bg-secondary transition-colors"
            >
              View Order Details
            </a>
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </a>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help with your order?{' '}
              <a
                href="/contact"
                className="text-primary hover:text-secondary font-medium underline"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
'use client';

import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

interface RazorpayOptions {
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  type: 'membership' | 'coin_topup' | 'order';
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const { user } = useAuth();

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(async (options: RazorpayOptions) => {
    const isLoaded = await loadRazorpayScript();
    
    if (!isLoaded) {
      options.onError({ message: 'Failed to load Razorpay SDK' });
      return;
    }

    if (!user) {
      options.onError({ message: 'User not authenticated' });
      return;
    }

    const razorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Rjvg7mjDAAKe1R',
      amount: options.amount,
      currency: options.currency,
      name: 'Xobikart',
      description: options.description,
      order_id: options.orderId,
      handler: async (response: any) => {
        try {
          // Verify payment on server
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              type: options.type,
              userId: user.id,
            }),
          });

          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            options.onSuccess(verifyData);
          } else {
            options.onError({ message: verifyData.error || 'Payment verification failed' });
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          options.onError({ message: 'Payment verification failed' });
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#FF6B6B', // Your primary color
      },
      modal: {
        ondismiss: () => {
          options.onError({ message: 'Payment cancelled by user' });
        },
      },
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  }, [user, loadRazorpayScript]);

  return { initiatePayment };
};

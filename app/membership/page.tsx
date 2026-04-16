'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const plans = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        features: ['Access to marketplace', 'No bonus coins', 'Standard pricing', 'Standard Support'],
        color: 'gray',
        description: 'Perfect for getting started',
    },
    {
        id: 'silver',
        name: 'Silver',
        price: 99,
        features: ['Extra Coins on Top-up', 'Priority customer support', 'Early access to offers', 'Silver Badge'],
        color: 'blue',
        popular: true,
        description: 'Best value for regular shoppers',
    },
    {
        id: 'gold',
        name: 'Gold',
        price: 199,
        features: ['Higher Coin Rewards', 'Exclusive discounts', 'Faster refunds', 'Premium Support Badge'],
        color: 'yellow',
        description: 'For the ultimate shopping experience',
    },
];

export default function MembershipPage() {
    const { user, updateMembership, addCoins } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (plan: typeof plans[0]) => {
        if (!user) {
            router.push('/auth/login?redirect=/membership');
            return;
        }

        if (plan.id === 'free') {
            updateMembership('Free');
            alert('You are now on the Free plan.');
            return;
        }

        setLoading(true);

        try {
            // Load Razorpay Script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);

            await new Promise((resolve) => {
                script.onload = resolve;
            });

            if (!window.Razorpay) {
                throw new Error('Razorpay SDK failed to load');
            }

            // Create Order
            const response = await fetch('/api/create-membership-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planId: plan.id,
                    amount: plan.price,
                    currency: 'INR',
                }),
            });

            const order = await response.json();

            if (!order.id) throw new Error('Failed to create order');

            // Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_Rjvg7mjDAAKe1R',
                amount: order.amount,
                currency: order.currency,
                name: 'Xobikart Membership',
                description: `Upgrade to ${plan.name} Plan`,
                order_id: order.id,
                handler: async function (response: any) {
                    // Verify Payment (Simulated for now by trusting success callback)
                    // In real app, call backend to verify signature

                    // Update Context
                    // Update Context
                    if (plan.id === 'silver') {
                        updateMembership('Silver');
                        addCoins(100);
                        alert(`Welcome to ${plan.name} Membership! You've received 100 Bonus Coins!`);
                    }
                    if (plan.id === 'gold') {
                        updateMembership('Gold');
                        addCoins(300);
                        alert(`Welcome to ${plan.name} Membership! You've received 300 Bonus Coins!`);
                    }

                    router.push('/profile');
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.mobile,
                },
                theme: {
                    color: '#ec5039', // Xobikart Red
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
                        Choose Your Membership Plan
                    </h2>
                    <p className="text-xl text-gray-500 mb-12">
                        Unlock exclusive benefits and rewards with our premium tiers.
                    </p>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-8">
                        {plans.map((plan) => {
                            const isCurrent = user?.membershipTier?.toLowerCase() === plan.id;
                            const features = plan.features;

                            return (
                                <div
                                    key={plan.name}
                                    className={`relative bg-white rounded-2xl shadow-xl flex flex-col p-8 transition-transform hover:-translate-y-2 ${plan.popular ? 'border-2 border-primary ring-4 ring-primary/10' : 'border border-gray-200'
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 -mr-1 -mt-1 w-32 overflow-hidden h-20">
                                            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rotate-45 bg-brand-gradient text-white text-xs font-semibold py-1 w-[200px] text-center shadow-md">
                                                POPULAR
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                        <p className="mt-2 text-gray-500 text-sm">{plan.description}</p>
                                    </div>

                                    <div className="mb-6">
                                        <span className="text-4xl font-extrabold text-gray-900">
                                            {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                                        </span>
                                        {plan.price > 0 && <span className="text-gray-500 font-medium">/month</span>}
                                    </div>

                                    <ul className="mb-8 space-y-4 flex-1 text-left">
                                        {features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <svg
                                                    className="h-6 w-6 text-green-500 flex-shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="ml-3 text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleSubscribe(plan)}
                                        disabled={loading || isCurrent}
                                        className={`w-full py-3 px-6 rounded-full font-bold text-lg transition-all duration-200 shadow-md transform active:scale-95 ${isCurrent
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-brand-gradient text-white hover:brightness-110 hover:scale-[1.02] hover:shadow-lg'
                                            }`}
                                    >
                                        {isCurrent ? 'Current Plan' : loading ? 'Processing...' : plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

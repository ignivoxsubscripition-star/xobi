'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart, subtotal, discount, applyDiscount } = useCart();
    const { user } = useAuth();
    const [useCoins, setUseCoins] = useState(false);

    // Calculate max coins usable
    const maxCoinDiscount = subtotal * 0.5;
    const availableCoins = user?.coins || 0;
    const canRedeem = availableCoins > 0;

    const handleCoinToggle = () => {
        if (!useCoins) {
            // Turning ON
            const discountAmount = Math.min(availableCoins, maxCoinDiscount);
            applyDiscount(discountAmount);
            setUseCoins(true);
        } else {
            // Turning OFF
            applyDiscount(0);
            setUseCoins(false);
        }
    };

    if (items.length === 0) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white rounded-xl shadow-md p-12 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven&apos;t added anything to your cart yet.</p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-primary hover:bg-secondary transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 pt-12 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                        {/* Cart Items */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                <ul role="list" className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <li key={item.id} className="p-6 sm:flex sm:items-center">
                                            {/* Image */}
                                            <div className="flex-shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-2"
                                                    sizes="(max-width: 640px) 96px, 128px"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm cursor-pointer">
                                                                <Link href={item.link} className="font-medium text-gray-700 hover:text-primary">
                                                                    {item.name}
                                                                </Link>
                                                            </h3>
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">₹{item.price.toLocaleString('en-IN')}</p>
                                                        {item.originalPrice && (
                                                            <p className="mt-1 text-xs text-gray-500 line-through">₹{item.originalPrice.toLocaleString('en-IN')}</p>
                                                        )}
                                                    </div>

                                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                                        <div className="flex items-center border border-gray-300 rounded-xl max-w-min">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                                                                aria-label="Decrease quantity"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-3 py-1 text-gray-900 font-medium border-x border-gray-300 min-w-[3rem] text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                                                                aria-label="Increase quantity"
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <div className="absolute top-0 right-0">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500"
                                                            >
                                                                <span className="sr-only">Remove</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={clearCart}
                                    className="text-sm font-medium text-red-600 hover:text-red-500"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="mt-16 bg-white rounded-xl shadow-md p-6 lg:mt-0 lg:col-span-4 lg:sticky lg:top-24">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>

                            <dl className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</dt>
                                    <dd className="text-sm font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</dd>
                                </div>

                                {/* Coin Redemption Section */}
                                {user && canRedeem && (
                                    <div className="py-4 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-900 mr-2">Use Xobikart Coins</span>
                                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold">
                                                    Balance: {availableCoins.toFixed(1)}
                                                </span>
                                            </div>
                                            <button
                                                onClick={handleCoinToggle}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${useCoins ? 'bg-primary' : 'bg-gray-200'}`}
                                            >
                                                <span className={`${useCoins ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            You can save up to ₹{maxCoinDiscount.toLocaleString('en-IN')} (50% of order)
                                        </p>
                                    </div>
                                )}

                                {discount > 0 && (
                                    <div className="flex items-center justify-between text-primary">
                                        <dt className="text-sm font-medium">Coin Discount</dt>
                                        <dd className="text-sm font-bold">-₹{discount.toLocaleString('en-IN')}</dd>
                                    </div>
                                )}

                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-sm text-gray-600">Shipping Estimate</dt>
                                    <dd className="text-sm font-medium text-green-600">Free</dd>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900">Order Total</dt>
                                    <dd className="text-base font-bold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                {user ? (
                                    <Link
                                        href="/checkout"
                                        className="w-full bg-primary border border-transparent rounded-full shadow-md py-3 px-4 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary uppercase tracking-wider text-center block"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                ) : (
                                    <Link
                                        href="/auth/login"
                                        className="w-full bg-primary border border-transparent rounded-full shadow-md py-3 px-4 text-base font-medium text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary uppercase tracking-wider text-center block"
                                    >
                                        Login to Checkout
                                    </Link>
                                )}
                                <p className="mt-4 text-xs text-center text-gray-500">
                                    Delivery charges calculated at checkout step.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

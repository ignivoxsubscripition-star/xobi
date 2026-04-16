'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface SellerData {
    sellerId: string;
    name: string;
    email: string;
    mobile: string;
    storeName: string;
    businessType: string;
    gstNumber: string;
    panNumber?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    gstVerified: boolean;
    bankVerified: boolean;
    registrationDate: string;
    status: string;
}

export default function SellerDashboardPage() {
    const [sellerData, setSellerData] = useState<SellerData | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const data = localStorage.getItem('sm_new_seller');
        if (!data) {
            router.push('/seller/register');
        } else {
            setSellerData(JSON.parse(data));
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout from your seller account?')) {
            localStorage.removeItem('sm_new_seller');
            router.push('/');
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </>
        );
    }

    if (!sellerData) {
        return null;
    }

    const registrationDate = new Date(sellerData.registrationDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    Seller Dashboard
                                </h1>
                                <p className="text-gray-600">Welcome back, {sellerData.name}!</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Seller ID Card */}
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-6 shadow-xl">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-white/80 text-sm font-medium mb-1">Your Unique Seller ID</p>
                                <p className="text-2xl md:text-3xl font-bold text-white tracking-wider">
                                    {sellerData.sellerId}
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                    <span className="text-white font-semibold">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Products</p>
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                                    <p className="text-3xl font-bold text-gray-900">₹0</p>
                                </div>
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Seller Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Personal Information */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Full Name</p>
                                        <p className="font-semibold text-gray-900">{sellerData.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Email Address</p>
                                        <p className="font-semibold text-gray-900">{sellerData.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                                        <p className="font-semibold text-gray-900">{sellerData.mobile}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Registration Date</p>
                                        <p className="font-semibold text-gray-900">{registrationDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Business Information */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    Business Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Store Name</p>
                                        <p className="font-semibold text-gray-900">{sellerData.storeName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Business Type</p>
                                        <p className="font-semibold text-gray-900 capitalize">{sellerData.businessType}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-gray-500 mb-1">GST Number</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">{sellerData.gstNumber}</p>
                                            {sellerData.gstVerified && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {sellerData.panNumber && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">PAN Number</p>
                                            <p className="font-semibold text-gray-900">{sellerData.panNumber}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pickup Address */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Pickup Address
                                </h2>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-gray-900 font-medium">{sellerData.addressLine1}</p>
                                    {sellerData.addressLine2 && <p className="text-gray-900">{sellerData.addressLine2}</p>}
                                    <p className="text-gray-900 mt-2">{sellerData.city}, {sellerData.state}</p>
                                    <p className="text-gray-900">PIN: {sellerData.pincode}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Bank Details & Quick Actions */}
                        <div className="space-y-6">
                            {/* Bank Details */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                    <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Bank Details
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Account Holder</p>
                                        <p className="font-semibold text-gray-900">{sellerData.accountHolder}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Bank Name</p>
                                        <p className="font-semibold text-gray-900">{sellerData.bankName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Account Number</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">****{sellerData.accountNumber.slice(-4)}</p>
                                            {sellerData.bankVerified && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">IFSC Code</p>
                                        <p className="font-semibold text-gray-900">{sellerData.ifsc}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            {/* <div className="bg-white rounded-xl shadow-md p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left">
                                        <span className="font-medium text-gray-900">Add Product</span>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left">
                                        <span className="font-medium text-gray-900">View Orders</span>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left">
                                        <span className="font-medium text-gray-900">Manage Inventory</span>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                    <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left">
                                        <span className="font-medium text-gray-900">Payment History</span>
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

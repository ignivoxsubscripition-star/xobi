'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SellerRegistrationPage() {
    const [step, setStep] = useState(1);
    const [devMode, setDevMode] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1
        name: '',
        email: '',
        mobile: '',
        password: '',
        // Step 2
        storeName: '',
        businessType: 'individual',
        gstNumber: '',
        panNumber: '',
        // Step 3
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
        // Step 4
        accountHolder: '',
        bankName: '',
        accountNumber: '',
        ifsc: '',

    });
    const [loading, setLoading] = useState(false);
    const [gstVerified, setGstVerified] = useState(false);
    const [bankVerified, setBankVerified] = useState(false);
    const [verifyingGst, setVerifyingGst] = useState(false);
    const [verifyingBank, setVerifyingBank] = useState(false);
    const [gstMessage, setGstMessage] = useState({ type: '', text: '' });
    const [bankMessage, setBankMessage] = useState({ type: '', text: '' });
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [confirmAccuracy, setConfirmAccuracy] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Dev bypass: Check if storeName is "DEV_SKIP"
        if (name === 'storeName' && value === 'DEV_SKIP') {
            setDevMode(true);
            setGstVerified(true);
            setBankVerified(true);
            setGstMessage({ type: 'success', text: 'Developer bypass activated' });
            setBankMessage({ type: 'success', text: 'Developer bypass activated' });
        } else if (name === 'storeName' && devMode && value !== 'DEV_SKIP') {
            // Reset if user changes the store name from DEV_SKIP
            setDevMode(false);
            setGstVerified(false);
            setBankVerified(false);
            setGstMessage({ type: '', text: '' });
            setBankMessage({ type: '', text: '' });
        }
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const verifyGst = async () => {
        if (!formData.gstNumber) {
            setGstMessage({ type: 'error', text: 'Please enter GST Number' });
            return;
        }
        setVerifyingGst(true);
        setGstMessage({ type: '', text: '' });
        try {
            const res = await fetch(`/api/verification/gst?gst=${formData.gstNumber}`);
            const data = await res.json();
            if (data.status === 'Success') {
                setGstVerified(true);
                setGstMessage({ type: 'success', text: `Verified: ${data.legal_name_of_business}` });
            } else {
                setGstVerified(false);
                setGstMessage({ type: 'error', text: data.message || 'Verification failed' });
            }
        } catch (error) {
            setGstMessage({ type: 'error', text: 'Error connecting to verification service' });
        }
        setVerifyingGst(false);
    };

    const verifyBank = async () => {
        if (!formData.accountNumber || !formData.ifsc) {
            setBankMessage({ type: 'error', text: 'Please enter Account Number and IFSC' });
            return;
        }
        setVerifyingBank(true);
        setBankMessage({ type: '', text: '' });
        try {
            const res = await fetch(`/api/verification/bank?account_number=${formData.accountNumber}&ifsc=${formData.ifsc}`);
            const data = await res.json();
            if (data.status === 'Success') {
                setBankVerified(true);
                setBankMessage({ type: 'success', text: `Verified: ${data.nameAtBank}` });
            } else {
                setBankVerified(false);
                setBankMessage({ type: 'error', text: data.message || 'Verification failed' });
            }
        } catch (error) {
            setBankMessage({ type: 'error', text: 'Error connecting to verification service' });
        }
        setVerifyingBank(false);
    };

    const generateSellerId = () => {
        const randomNumbers = Math.floor(100000 + Math.random() * 900000);
        return `SHOMTX-IND-${randomNumbers}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        // Generate unique seller ID
        const sellerId = generateSellerId();
        
        // Store seller data in localStorage
        const sellerData = {
            sellerId,
            ...formData,
            gstVerified,
            bankVerified,
            registrationDate: new Date().toISOString(),
            status: 'active'
        };
        
        localStorage.setItem('sm_new_seller', JSON.stringify(sellerData));
        
        setLoading(false);
        setStep(5); // Success step
    };

    // Scroll to top when success page is shown
    useEffect(() => {
        if (step === 5) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [step]);

    const indianStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
        'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
        'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
        'Uttarakhand', 'West Bengal', 'Delhi', 'Mumbai'
    ];

    if (step === 5) {
        const sellerData = JSON.parse(localStorage.getItem('sm_new_seller') || '{}');
        
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Success Animation */}
                        <div className="text-center mb-8">
                            <div className="inline-flex w-24 h-24 bg-green-100 rounded-full items-center justify-center mb-6 shadow-lg shadow-green-200 animate-bounce">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-12 h-12 text-green-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                                🎉 Welcome to Xobikart!
                            </h1>
                            <p className="text-xl text-gray-600 mb-2">
                                Your seller account dashboard has been successfully created.
                            </p>
                        </div>

                        {/* Seller ID Card */}
                        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 mb-6 shadow-xl">
                            <div className="text-center">
                                <p className="text-white/80 text-sm font-medium mb-2">Your Unique Seller ID</p>
                                <p className="text-3xl md:text-4xl font-bold text-white tracking-wider mb-2">
                                    {sellerData.sellerId}
                                </p>
                                <p className="text-white/70 text-xs">Keep this ID safe for all future transactions</p>
                            </div>
                        </div>

                        {/* Seller Details Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Seller Details</h2>
                            
                            {/* Personal Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium text-gray-900">{sellerData.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium text-gray-900">{sellerData.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Mobile</p>
                                        <p className="font-medium text-gray-900">{sellerData.mobile}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Business Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Business Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Store Name</p>
                                        <p className="font-medium text-gray-900">{sellerData.storeName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Business Type</p>
                                        <p className="font-medium text-gray-900 capitalize">{sellerData.businessType}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">GST Number</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">{sellerData.gstNumber}</p>
                                            {sellerData.gstVerified && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {sellerData.panNumber && (
                                        <div>
                                            <p className="text-sm text-gray-500">PAN Number</p>
                                            <p className="font-medium text-gray-900">{sellerData.panNumber}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Pickup Address</h3>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-gray-900">{sellerData.addressLine1}</p>
                                    {sellerData.addressLine2 && <p className="text-gray-900">{sellerData.addressLine2}</p>}
                                    <p className="text-gray-900">{sellerData.city}, {sellerData.state} - {sellerData.pincode}</p>
                                </div>
                            </div>

                            {/* Bank Details */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Bank Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Account Holder</p>
                                        <p className="font-medium text-gray-900">{sellerData.accountHolder}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Bank Name</p>
                                        <p className="font-medium text-gray-900">{sellerData.bankName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Account Number</p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium text-gray-900">****{sellerData.accountNumber.slice(-4)}</p>
                                            {sellerData.bankVerified && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">IFSC Code</p>
                                        <p className="font-medium text-gray-900">{sellerData.ifsc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="text-center">
                            <Link
                                href="/seller-dashboard"
                                className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Go to Seller Dashboard
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] animate-pulse delay-1000" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Progress Bar */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D3436] text-center mb-12 tracking-tight">
                            Become a Seller
                            <span className="block text-lg font-normal text-gray-500 mt-2">Join our growing marketplace today</span>
                        </h1>
                        <div className="flex items-center justify-between relative max-w-3xl mx-auto px-4">
                            <div className="absolute left-0 top-6 transform -translate-y-1/2 w-full h-1.5 bg-gray-100 -z-10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700 ease-in-out" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
                            </div>

                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex flex-col items-center group cursor-default">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-bold text-lg md:text-xl shadow-lg transition-all duration-500 transform ${step >= i ? 'bg-brand-gradient text-white scale-110 shadow-primary/30 rotate-3' : 'bg-white text-gray-300 border-2 border-gray-100'}`}>
                                        {step > i ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            i
                                        )}
                                    </div>
                                    <span className={`text-xs md:text-sm font-semibold mt-3 uppercase tracking-wider transition-colors duration-300 ${step >= i ? 'text-primary' : 'text-gray-400'}`}>
                                        {i === 1 ? 'Basic' : i === 2 ? 'Business' : i === 3 ? 'Address' : 'Bank'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-white/50 ring-1 ring-gray-100">
                        <form onSubmit={handleSubmit} className="p-6 md:p-12">
                            {/* Step 1: Basic Details */}
                            {step === 1 && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="border-b border-gray-100 pb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Basic Details</h3>
                                        <p className="text-gray-500 text-sm mt-2">Let&apos;s get started with your personal information.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2 group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Full Name</label>
                                            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="Enter full name" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Email Address</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="Enter email" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Mobile Number</label>
                                            <input type="tel" name="mobile" required pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="10 digits" />
                                        </div>
                                        <div className="sm:col-span-2 group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Password</label>
                                            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="Create a strong password" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Business Info */}
                            {step === 2 && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="border-b border-gray-100 pb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Business Information</h3>
                                        <p className="text-gray-500 text-sm mt-2">Tell us about your business entity.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2 group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Store / Business Name</label>
                                            <input type="text" name="storeName" required value={formData.storeName} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="e.g. My Awesome Store" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Business Type</label>
                                            <div className="relative">
                                                <select name="businessType" value={formData.businessType} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300 appearance-none">
                                                    <option value="individual">Individual / Sole Proprietor</option>
                                                    <option value="partnership">Partnership</option>
                                                    <option value="pvtltd">Private Limited</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">GST Number <span className="text-red-500">*</span></label>
                                            <div className="flex gap-3">
                                                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={(e) => {
                                                    handleChange(e);
                                                    setGstVerified(false);
                                                    setGstMessage({ type: '', text: '' });
                                                }} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="GSTIN" />
                                                <button
                                                    type="button"
                                                    onClick={verifyGst}
                                                    disabled={verifyingGst || gstVerified}
                                                    className={`px-6 py-2 rounded-xl text-sm font-bold shadow-md transition-all duration-300 whitespace-nowrap ${gstVerified ? 'bg-green-500 text-white shadow-green-200' : 'bg-brand-gradient text-white hover:bg-primary-dark shadow-primary/30 hover:shadow-primary/50'}`}
                                                >
                                                    {verifyingGst ? (
                                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                    ) : gstVerified ? 'Verified' : 'Verify'}
                                                </button>
                                            </div>
                                            {gstMessage.text && (
                                                <p className={`mt-2 text-xs font-medium flex items-center ${gstMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                                    {gstMessage.type === 'success' && <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
                                                    {gstMessage.text}
                                                </p>
                                            )}
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">PAN Number (Optional)</label>
                                            <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="PAN for tax verification" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Address */}
                            {step === 3 && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="border-b border-gray-100 pb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Pickup Address</h3>
                                        <p className="text-gray-500 text-sm mt-2">Logistics partners will pick up from here.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2 group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Address Line 1</label>
                                            <input type="text" name="addressLine1" required value={formData.addressLine1} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="Building, Street, Area" />
                                        </div>
                                        <div className="sm:col-span-2 group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Address Line 2</label>
                                            <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="Landmark, etc." />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">City</label>
                                            <input type="text" name="city" required value={formData.city} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">State</label>
                                            <div className="relative">
                                                <select name="state" required value={formData.state} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300 appearance-none">
                                                    <option value="">Select State</option>
                                                    {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Pincode</label>
                                            <input type="text" name="pincode" required pattern="[0-9]{6}" value={formData.pincode} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Bank Details */}
                            {step === 4 && (
                                <div className="space-y-8 animate-fade-in-up">
                                    <div className="border-b border-gray-100 pb-6">
                                        <h3 className="text-2xl font-bold text-gray-900">Bank Details</h3>
                                        <p className="text-gray-500 text-sm mt-2">Securely link your bank account for payouts.</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                        <div className="sm:col-span-2 group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Account Holder Name</label>
                                            <input type="text" name="accountHolder" required value={formData.accountHolder} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" placeholder="Exactly as per bank records" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Bank Name</label>
                                            <input type="text" name="bankName" required value={formData.bankName} onChange={handleChange} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">Account Number</label>
                                            <input type="text" name="accountNumber" required value={formData.accountNumber} onChange={(e) => {
                                                handleChange(e);
                                                setBankVerified(false);
                                                setBankMessage({ type: '', text: '' });
                                            }} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-primary transition-colors">IFSC Code</label>
                                            <input type="text" name="ifsc" required value={formData.ifsc} onChange={(e) => {
                                                handleChange(e);
                                                setBankVerified(false);
                                                setBankMessage({ type: '', text: '' });
                                            }} className="block w-full border-gray-200 rounded-xl shadow-md focus:ring-4 focus:ring-primary/10 focus:border-primary sm:text-sm py-3.5 px-4 bg-gray-50/50 focus:bg-white transition-all duration-300" />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={verifyBank}
                                                    disabled={verifyingBank || bankVerified}
                                                    className={`px-8 py-3 rounded-xl text-sm font-bold shadow-md transition-all duration-300 transform hover:-translate-y-0.5 ${bankVerified ? 'bg-green-500 text-white shadow-green-200 cursor-default' : 'bg-brand-gradient text-white hover:bg-primary-dark shadow-primary/30 hover:shadow-primary/50'}`}
                                                >
                                                    {verifyingBank ? 'Verifying with Bank...' : bankVerified ? 'Account Verified' : 'Verify Account'}
                                                </button>
                                            </div>
                                            {bankMessage.text && (
                                                <p className={`mt-3 text-right text-sm font-medium flex items-center justify-end ${bankMessage.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                                                    {bankMessage.type === 'success' && <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>}
                                                    {bankMessage.text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Terms and Conditions Checkboxes - Only show on Step 4 */}
                            {step === 4 && (
                                <div className="mt-8 space-y-4">
                                    {/* Terms & Conditions Checkbox */}
                                    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
                                        <label className="flex items-start cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={agreeTerms}
                                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                                className="w-5 h-5 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                                            />
                                            <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                                                I agree to Xobikart&apos;s{' '}
                                                <Link href="/terms" target="_blank" className="text-primary font-semibold hover:underline">
                                                    Seller Terms & Conditions
                                                </Link>
                                            </span>
                                        </label>
                                    </div>

                                    {/* Accuracy Confirmation Checkbox */}
                                    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
                                        <label className="flex items-start cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={confirmAccuracy}
                                                onChange={(e) => setConfirmAccuracy(e.target.checked)}
                                                className="w-5 h-5 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                                            />
                                            <span className="ml-3 text-base text-gray-700 group-hover:text-gray-900 transition-colors">
                                                I confirm all information provided is accurate.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
                                {step > 1 ? (
                                    <button type="button" onClick={handleBack} className="flex items-center px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-300 shadow-md hover:shadow-md">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                        Back
                                    </button>
                                ) : <div />}

                                {step < 4 ? (
                                    <button type="button" onClick={handleNext} className="flex items-center px-8 py-3 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 transform hover:-translate-y-0.5">
                                        Next detailed step
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading || (!devMode && (!gstVerified || !bankVerified || !agreeTerms || !confirmAccuracy))}
                                        className="flex items-center px-10 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transform hover:-translate-y-0.5"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting Application...
                                            </>
                                        ) : 'Final Submit'}
                                    </button>
                                )}
                            </div>
                            
                            {step === 4 && (!gstVerified || !bankVerified || !agreeTerms || !confirmAccuracy) && !devMode && (
                                <div className="mt-4 text-center space-y-2">
                                    {(!gstVerified || !bankVerified) && (
                                        <div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Completion of GST and Bank Verification is mandatory
                                            </span>
                                        </div>
                                    )}
                                    {(!agreeTerms || !confirmAccuracy) && (
                                        <div>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                                Please accept terms and confirm information accuracy
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
    const [verificationId, setVerificationId] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const { sendLoginOtp, verifyLoginOtp } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setInfo('');

        if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        try {
            const data = await sendLoginOtp(mobile);
            if (data.success) {
                setVerificationId(data.verificationId);
                setStep('otp');
                setInfo(data.isMock ? 'Mock Mode: OTP code is 1234 (logged to console)' : 'OTP sent successfully!');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setInfo('');

        if (otp.length !== 4 || !/^\d+$/.test(otp)) {
            setError('Please enter a valid 4-digit OTP');
            return;
        }

        setLoading(true);
        try {
            const data = await verifyLoginOtp(verificationId, otp);
            if (data.success) {
                if (data.userExists) {
                    setInfo('Login successful! Redirecting...');
                    setTimeout(() => {
                        router.push('/');
                    }, 800);
                } else {
                    // Mobile verified but no account exists, redirect to signup
                    setError('No registered account found for this mobile number. Redirecting to sign up...');
                    setTimeout(() => {
                        router.push(`/auth/signup?mobile=${mobile}`);
                    }, 2000);
                }
            }
        } catch (err: any) {
            setError(err.message || 'Invalid OTP code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-gray-100">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {step === 'mobile' ? 'Welcome Back' : 'Verify Mobile'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {step === 'mobile' 
                                ? 'Sign in using phone number OTP' 
                                : `Enter the 4-digit OTP sent to +91 ${mobile}`}
                        </p>
                    </div>

                    {step === 'mobile' ? (
                        <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 text-sm font-semibold border-r border-gray-200 pr-2">
                                            +91
                                        </span>
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="tel"
                                            required
                                            maxLength={10}
                                            className="appearance-none rounded-xl relative block w-full pl-16 pr-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-semibold tracking-wide"
                                            placeholder="Enter 10-digit number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-all duration-300 uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    {loading ? 'Sending OTP...' : 'Send OTP'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                        Enter OTP Code
                                    </label>
                                    <input
                                        id="otp"
                                        name="otp"
                                        type="text"
                                        required
                                        maxLength={4}
                                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 font-bold tracking-widest text-center text-xl"
                                        placeholder="****"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    type="button"
                                    onClick={() => setStep('mobile')}
                                    className="font-medium text-primary hover:text-secondary transition-colors"
                                >
                                    ← Back to Mobile
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={loading}
                                    className="font-medium text-primary hover:text-secondary transition-colors disabled:opacity-50"
                                >
                                    Resend OTP
                                </button>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-all duration-300 uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    {loading ? 'Verifying...' : 'Verify & Login'}
                                </button>
                            </div>
                        </form>
                    )}

                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 text-red-500 text-sm text-center border border-red-100 transition-all duration-300">
                            {error}
                        </div>
                    )}

                    {info && (
                        <div className="p-3 rounded-xl bg-blue-50 text-blue-600 text-sm text-center border border-blue-100 transition-all duration-300">
                            {info}
                        </div>
                    )}

                    <div className="text-center text-sm pt-4 border-t border-gray-100 animate-fade-in">
                        <p className="text-gray-600">
                            New to Xobikart?{' '}
                            <Link
                                href="/auth/signup"
                                className="font-bold text-primary hover:text-secondary transition-colors"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

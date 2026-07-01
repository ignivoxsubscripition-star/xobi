'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

function SignupForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { sendSignupOtp, verifySignupOtp } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
    });
    
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'details' | 'otp'>('details');
    const [verificationId, setVerificationId] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    // Pre-fill mobile from query parameter if available
    useEffect(() => {
        const queryMobile = searchParams.get('mobile');
        if (queryMobile) {
            setFormData((prev) => ({ ...prev, mobile: queryMobile }));
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setInfo('');

        // Basic Validation
        if (!formData.name.trim()) {
            setError('Please enter your full name');
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setLoading(true);
        try {
            const data = await sendSignupOtp(formData.name, formData.email, formData.mobile);
            if (data.success) {
                setVerificationId(data.verificationId);
                setStep('otp');
                setInfo(data.isMock ? 'Mock Mode: OTP code is 1234 (logged to console)' : 'OTP sent successfully!');
            }
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
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
            const data = await verifySignupOtp(verificationId, otp);
            if (data.success) {
                setInfo('Account created successfully! Redirecting...');
                setTimeout(() => {
                    router.push('/');
                }, 800);
            }
        } catch (err: any) {
            setError(err.message || 'Invalid OTP code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl relative z-10 border border-gray-100">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {step === 'details' ? 'Create Account' : 'Verify Signup'}
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    {step === 'details'
                        ? 'Join Xobikart for the best shopping experience'
                        : `Enter the 4-digit OTP sent to +91 ${formData.mobile}`}
                </p>
            </div>

            {step === 'details' ? (
                <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
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
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center w-full">
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer shrink-0"
                            />
                            <label htmlFor="terms" className="ml-2 text-[13px] text-gray-700 cursor-pointer leading-tight">
                                I agree to the <Link href="/terms" className="text-primary hover:text-secondary font-semibold">Terms & Conditions</Link> and <Link href="/privacy-policy" className="text-primary hover:text-secondary font-semibold">Privacy Policy</Link>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-all duration-300 uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            {loading ? 'Sending OTP...' : 'Sign Up'}
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
                            onClick={() => setStep('details')}
                            className="font-medium text-primary hover:text-secondary transition-colors"
                        >
                            ← Back to Details
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
                            {loading ? 'Verifying...' : 'Verify & Register'}
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

            <div className="text-center text-sm pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link
                        href="/auth/login"
                        className="font-bold text-primary hover:text-secondary transition-colors"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <Suspense fallback={
                    <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl border border-gray-100 text-center">
                        <p className="text-gray-600">Loading form...</p>
                    </div>
                }>
                    <SignupForm />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}

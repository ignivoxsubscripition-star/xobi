'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetPassword, checkUserExists } = useAuth();
    const router = useRouter();

    const handleFindAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const exists = await checkUserExists(email);
            if (exists) {
                setStep(2);
            } else {
                setError('No account found with this email address.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email, newPassword);
            setStep(3); // Success step
        } catch (err: any) {
            setError(err.message || 'Failed to reset password. Please check your email.');
            setStep(1); // Go back if user not found
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
                            {step === 1 ? 'Forgot Password?' : step === 2 ? 'Reset Password' : 'Success!'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {step === 1
                                ? "No worries, we'll help you get back into your account."
                                : step === 2
                                    ? "Enter your new password below."
                                    : "Your password has been successfully updated."}
                        </p>
                    </div>

                    {step === 1 && (
                        <form className="mt-8 space-y-6" onSubmit={handleFindAccount}>
                            <div className="space-y-4">
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
                                        placeholder="Enter your registered email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-all duration-300 uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    {loading ? 'Processing...' : 'Find Account'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        required
                                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-all duration-300 uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    {loading ? 'Updating...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="mt-8 space-y-6">
                            <div className="flex justify-center">
                                <div className="rounded-full bg-green-100 p-3">
                                    <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 uppercase tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Back to Sign In
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-500 text-sm text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="text-center text-sm pt-4 border-t border-gray-100 mt-6">
                        <Link
                            href="/auth/login"
                            className="font-bold text-primary hover:text-secondary transition-colors"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

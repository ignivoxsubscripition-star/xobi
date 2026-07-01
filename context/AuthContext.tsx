'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Seller } from '@/components/types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: Omit<User, 'id' | 'role'>, password: string) => Promise<void>;
    logout: () => void;
    resetPassword: (email: string, newPassword: string) => Promise<void>;
    isAuthenticated: boolean;
    updateMembership: (tier: 'Free' | 'Silver' | 'Gold') => void;
    deductCoins: (amount: number) => void;
    addCoins: (amount: number) => void;
    checkUserExists: (email: string) => Promise<boolean>;
    sendLoginOtp: (mobile: string) => Promise<{ success: boolean; verificationId: string; userExists?: boolean; isMock?: boolean }>;
    verifyLoginOtp: (verificationId: string, code: string) => Promise<{ success: boolean; userExists: boolean; token?: string; user?: User }>;
    sendSignupOtp: (name: string, email: string, mobile: string) => Promise<{ success: boolean; verificationId: string; isMock?: boolean }>;
    verifySignupOtp: (verificationId: string, code: string) => Promise<{ success: boolean; token?: string; user?: User }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const verifySession = async () => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('xobikart_token');
                const storedUser = localStorage.getItem('xobikart_user');
                
                if (token && storedUser) {
                    try {
                        setUser(JSON.parse(storedUser));

                        const res = await fetch(`${API_URL}/api/auth/me`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        if (res.ok) {
                            const data = await res.json();
                            if (data.success && data.user) {
                                setUser(data.user);
                                localStorage.setItem('xobikart_user', JSON.stringify(data.user));
                            }
                        } else {
                            localStorage.removeItem('xobikart_token');
                            localStorage.removeItem('xobikart_user');
                            setUser(null);
                        }
                    } catch (error) {
                        console.error('Error verifying user session:', error);
                    }
                }
            }
            setIsLoading(false);
        };
        verifySession();
    }, []);

    const syncProfile = async (updates: { membershipTier?: string; coins?: number }) => {
        if (typeof window === 'undefined') return;
        const token = localStorage.getItem('xobikart_token');
        if (!token) return;
        try {
            const res = await fetch(`${API_URL}/api/auth/update-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            if (!res.ok) {
                console.error('Failed to sync profile with backend');
            }
        } catch (err) {
            console.error('Error syncing profile:', err);
        }
    };

    const login = async (email: string, password: string) => {
        throw new Error('Please use OTP login instead.');
    };

    const register = async (userData: Omit<User, 'id' | 'role'>, password: string) => {
        throw new Error('Please use OTP signup instead.');
    };

    const resetPassword = async (email: string, newPassword: string) => {
        throw new Error('Password reset is not supported. Please authenticate with OTP.');
    };

    const sendLoginOtp = async (mobile: string) => {
        const res = await fetch(`${API_URL}/api/auth/login/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Failed to send login OTP');
        }
        return data;
    };

    const verifyLoginOtp = async (verificationId: string, code: string) => {
        const res = await fetch(`${API_URL}/api/auth/login/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationId, code })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Failed to verify login OTP');
        }

        if (data.success && data.verified && data.userExists) {
            setUser(data.user);
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_token', data.token);
                localStorage.setItem('xobikart_user', JSON.stringify(data.user));
            }
        }
        return data;
    };

    const sendSignupOtp = async (name: string, email: string, mobile: string) => {
        const res = await fetch(`${API_URL}/api/auth/signup/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, mobile })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Failed to send signup OTP');
        }
        return data;
    };

    const verifySignupOtp = async (verificationId: string, code: string) => {
        const res = await fetch(`${API_URL}/api/auth/signup/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationId, code })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Failed to verify signup OTP');
        }

        if (data.success && data.user) {
            setUser(data.user);
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_token', data.token);
                localStorage.setItem('xobikart_user', JSON.stringify(data.user));
            }
        }
        return data;
    };

    const updateMembership = (tier: 'Free' | 'Silver' | 'Gold') => {
        setUser((prev) => {
            if (!prev) return null;
            const updatedUser = { ...prev, membershipTier: tier };
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_user', JSON.stringify(updatedUser));
            }
            syncProfile({ membershipTier: tier });
            return updatedUser;
        });
    };

    const deductCoins = (amount: number) => {
        setUser((prev) => {
            if (!prev || (prev.coins || 0) < amount) return prev;
            const updatedCoins = (prev.coins || 0) - amount;
            const updatedUser = { ...prev, coins: updatedCoins };
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_user', JSON.stringify(updatedUser));
            }
            syncProfile({ coins: updatedCoins });
            return updatedUser;
        });
    };

    const addCoins = (amount: number) => {
        setUser((prev) => {
            if (!prev) return null;
            const updatedCoins = (prev.coins || 0) + amount;
            const updatedUser = { ...prev, coins: updatedCoins };
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_user', JSON.stringify(updatedUser));
            }
            syncProfile({ coins: updatedCoins });
            return updatedUser;
        });
    };

    const checkUserExists = async (email: string) => {
        try {
            const res = await fetch(`${API_URL}/api/auth/check-user?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            return !!data.exists;
        } catch {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('xobikart_user');
            localStorage.removeItem('xobikart_token');
        }
        router.push('/');
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                resetPassword,
                isAuthenticated: !!user,
                updateMembership,
                deductCoins,
                addCoins,
                checkUserExists,
                sendLoginOtp,
                verifyLoginOtp,
                sendSignupOtp,
                verifySignupOtp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

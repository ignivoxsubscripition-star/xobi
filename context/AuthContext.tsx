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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_LIST_KEY = 'xobikart_users_list';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        // Check for existing session only after mounting
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('xobikart_user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    // Ensure defaults exist for legacy data
                    if (!parsedUser.membershipTier || parsedUser.coins === undefined) {
                        const updatedUser = {
                            ...parsedUser,
                            membershipTier: parsedUser.membershipTier || 'Free',
                            coins: parsedUser.coins ?? 0
                        };
                        setUser(updatedUser);
                        localStorage.setItem('xobikart_user', JSON.stringify(updatedUser));
                    } else {
                        setUser(parsedUser);
                    }
                } catch (error) {
                    console.error('Error parsing stored user:', error);
                    localStorage.removeItem('xobikart_user');
                }
            }
        }
        setIsLoading(false);
    }, []);

    const getUsers = (): any[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(USERS_LIST_KEY);
        let users = stored ? JSON.parse(stored) : [];

        // Ensure demo user exists
        const demoEmail = 'demo@xobikart.com';
        if (!users.some((u: any) => u.email === demoEmail)) {
            const demoUser = {
                id: 'demo-id',
                name: 'Demo User',
                email: demoEmail,
                password: 'demo123',
                mobile: '1234567890',
                role: 'user',
                membershipTier: 'Silver',
                coins: 500,
            };
            users.push(demoUser);
            saveUsers(users);
        }

        return users;
    };

    const saveUsers = (users: any[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(USERS_LIST_KEY, JSON.stringify(users));
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = getUsers();
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (!foundUser) {
            setIsLoading(false);
            throw new Error('Invalid credentials');
        }

        const userToLogin: User = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            mobile: foundUser.mobile,
            role: foundUser.role,
            membershipTier: foundUser.membershipTier,
            coins: foundUser.coins,
        };

        setUser(userToLogin);
        if (typeof window !== 'undefined') {
            localStorage.setItem('xobikart_user', JSON.stringify(userToLogin));
        }
        setIsLoading(false);
    };

    const register = async (userData: Omit<User, 'id' | 'role'>, password: string) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = getUsers();
        if (users.some(u => u.email === userData.email)) {
            setIsLoading(false);
            throw new Error('User already exists');
        }

        const newUser: User = {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            role: 'user',
            membershipTier: 'Free',
            coins: 0
        };

        // Save to persistent list including password
        users.push({ ...newUser, password });
        saveUsers(users);

        setUser(newUser);
        if (typeof window !== 'undefined') {
            localStorage.setItem('xobikart_user', JSON.stringify(newUser));
        }
        setIsLoading(false);
    };

    const resetPassword = async (email: string, newPassword: string) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const users = getUsers();
        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex === -1) {
            setIsLoading(false);
            throw new Error('User not found');
        }

        users[userIndex].password = newPassword;
        saveUsers(users);
        setIsLoading(false);
    };

    const updateMembership = (tier: 'Free' | 'Silver' | 'Gold') => {
        setUser((prev) => {
            if (!prev) return null;
            const updatedUser = { ...prev, membershipTier: tier };
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_user', JSON.stringify(updatedUser));
                // Also update in persistent list
                const users = getUsers();
                const idx = users.findIndex(u => u.id === prev.id);
                if (idx !== -1) {
                    users[idx].membershipTier = tier;
                    saveUsers(users);
                }
            }
            return updatedUser;
        });
    };

    const deductCoins = (amount: number) => {
        setUser((prev) => {
            if (!prev || (prev.coins || 0) < amount) return prev;
            const updatedUser = { ...prev, coins: (prev.coins || 0) - amount };
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_user', JSON.stringify(updatedUser));
                // Also update in persistent list
                const users = getUsers();
                const idx = users.findIndex(u => u.id === prev.id);
                if (idx !== -1) {
                    users[idx].coins = updatedUser.coins;
                    saveUsers(users);
                }
            }
            return updatedUser;
        });
    };

    const addCoins = (amount: number) => {
        setUser((prev) => {
            if (!prev) return null;
            const updatedUser = { ...prev, coins: (prev.coins || 0) + amount };
            if (typeof window !== 'undefined') {
                localStorage.setItem('xobikart_user', JSON.stringify(updatedUser));
                // Also update in persistent list
                const users = getUsers();
                const idx = users.findIndex(u => u.id === prev.id);
                if (idx !== -1) {
                    users[idx].coins = updatedUser.coins;
                    saveUsers(users);
                }
            }
            return updatedUser;
        });
    };

    const checkUserExists = async (email: string) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        const users = getUsers();
        const exists = users.some(u => u.email === email);
        setIsLoading(false);
        return exists;
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('xobikart_user');
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

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserMembership, XobikartCoin } from '@/lib/types/membership';
import { useAuth } from './AuthContext';

interface MembershipContextType {
  membership: UserMembership | null;
  coinBalance: XobikartCoin | null;
  isLoading: boolean;
  refreshMembershipData: () => Promise<void>;
  getMembershipType: () => 'FREE' | 'SILVER' | 'GOLD';
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined);

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [membership, setMembership] = useState<UserMembership | null>(null);
  const [coinBalance, setCoinBalance] = useState<XobikartCoin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Mock membership data - replace with actual API calls
  const mockMembership: UserMembership = {
    id: 'membership_1',
    userId: user?.id || '1',
    planId: 'plan_silver',
    plan: {
      id: 'plan_silver',
      name: 'Silver Plan',
      type: 'SILVER',
      price: 99,
      duration: 30,
      currency: 'INR',
      coinBonusPercentage: 5,
      maxCoinUsagePercentage: 40,
      isActive: true,
      features: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isActive: true,
    autoRenew: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockCoinBalance: XobikartCoin = {
    id: 'coin_1',
    userId: user?.id || '1',
    balance: 1250,
    totalEarned: 3500,
    totalSpent: 2250,
    lastUpdated: new Date()
  };

  const refreshMembershipData = async () => {
    if (!isAuthenticated || !user) {
      setMembership(null);
      setCoinBalance(null);
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would fetch from your API:
      // const membershipResponse = await fetch(`/api/membership?userId=${user.id}`);
      // const coinResponse = await fetch(`/api/coins?userId=${user.id}`);
      
      // For now, use mock data
      setMembership(mockMembership);
      setCoinBalance(mockCoinBalance);
    } catch (error) {
      console.error('Error fetching membership data:', error);
      // Set default free membership on error
      setMembership(null);
      setCoinBalance(mockCoinBalance);
    } finally {
      setIsLoading(false);
    }
  };

  const getMembershipType = (): 'FREE' | 'SILVER' | 'GOLD' => {
    if (!membership || !membership.isActive) return 'FREE';
    return membership.plan.type;
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      refreshMembershipData();
    } else {
      setMembership(null);
      setCoinBalance(null);
    }
  }, [isAuthenticated, user]);

  return (
    <MembershipContext.Provider
      value={{
        membership,
        coinBalance,
        isLoading,
        refreshMembershipData,
        getMembershipType,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembership() {
  const context = useContext(MembershipContext);
  if (context === undefined) {
    throw new Error('useMembership must be used within a MembershipProvider');
  }
  return context;
}

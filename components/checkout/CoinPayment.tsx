'use client';

import { useState, useEffect } from 'react';
import { CoinService, MembershipService } from '@/lib/membership';

interface CoinPaymentProps {
  orderAmount: number;
  userCoinBalance: number;
  membershipType: 'FREE' | 'SILVER' | 'GOLD';
  onCoinUsageChange: (coinsToUse: number, finalAmount: number) => void;
}

export default function CoinPayment({ 
  orderAmount, 
  userCoinBalance, 
  membershipType,
  onCoinUsageChange 
}: CoinPaymentProps) {
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [maxCoinsAllowed, setMaxCoinsAllowed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const maxAllowed = MembershipService.calculateMaxCoinUsage(orderAmount, membershipType);
    setMaxCoinsAllowed(Math.min(maxAllowed, userCoinBalance));
  }, [orderAmount, userCoinBalance, membershipType]);

  useEffect(() => {
    // Validate coin usage whenever it changes
    if (coinsToUse > 0) {
      const validation = CoinService.validateCoinUsage(
        coinsToUse,
        userCoinBalance,
        orderAmount,
        membershipType
      );

      if (!validation.isValid) {
        setError(validation.error || 'Invalid coin usage');
        onCoinUsageChange(0, orderAmount);
      } else {
        setError(null);
        const coinValue = CoinService.coinsToINR(coinsToUse);
        const finalAmount = orderAmount - coinValue;
        onCoinUsageChange(coinsToUse, finalAmount);
      }
    } else {
      setError(null);
      onCoinUsageChange(0, orderAmount);
    }
  }, [coinsToUse, userCoinBalance, orderAmount, membershipType, onCoinUsageChange]);

  const handleCoinChange = (value: number) => {
    const clampedValue = Math.max(0, Math.min(value, maxCoinsAllowed));
    setCoinsToUse(clampedValue);
  };

  const handleQuickSelect = (percentage: number) => {
    const quickAmount = Math.floor((maxCoinsAllowed * percentage) / 100);
    setCoinsToUse(quickAmount);
  };

  const coinValue = CoinService.coinsToINR(coinsToUse);
  const finalAmount = orderAmount - coinValue;
  const savingsPercentage = orderAmount > 0 ? ((coinValue / orderAmount) * 100).toFixed(1) : '0';

  if (userCoinBalance === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="text-center">
          <div className="text-4xl mb-4">🪙</div>
          <h3 className="font-semibold mb-2">No Xobikart Coins</h3>
          <p className="text-gray-600 text-sm mb-4">
            You don&apos;t have any coins in your wallet. Start earning coins by shopping or top up your wallet.
          </p>
          <a 
            href="/coins"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-sm hover:bg-blue-700 transition-colors"
          >
            Add Coins
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">🪙</div>
          <div>
            <h3 className="font-semibold">Use Xobikart Coins</h3>
            <p className="text-sm text-gray-600">Available: {userCoinBalance} coins (₹{userCoinBalance})</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Max Usage</div>
          <div className="font-semibold text-blue-600">
            {MembershipService.getPlanByType(membershipType)?.maxCoinUsagePercentage}% of order
          </div>
        </div>
      </div>

      {/* Coin Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Coins to use (Max: {maxCoinsAllowed})
        </label>
        <div className="relative">
          <input
            type="number"
            value={coinsToUse}
            onChange={(e) => handleCoinChange(Number(e.target.value))}
            min="0"
            max={maxCoinsAllowed}
            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter coins to use"
          />
          <div className="absolute right-3 top-3 text-gray-500 text-sm">coins</div>
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}
      </div>

      {/* Quick Select Buttons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {[25, 50, 75, 100].map((percentage) => {
          const amount = Math.floor((maxCoinsAllowed * percentage) / 100);
          return (
            <button
              key={percentage}
              onClick={() => handleQuickSelect(percentage)}
              className={`p-2 rounded-xl border text-sm transition-all ${
                coinsToUse === amount
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {percentage}%
              <div className="text-xs text-gray-500">{amount}</div>
            </button>
          );
        })}
      </div>

      {/* Coin Usage Summary */}
      {coinsToUse > 0 && !error && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Coins to use:</span>
              <span className="font-medium">{coinsToUse} coins</span>
            </div>
            <div className="flex justify-between">
              <span>Coin value:</span>
              <span className="font-medium">₹{coinValue}</span>
            </div>
            <div className="flex justify-between">
              <span>You save:</span>
              <span className="font-medium text-green-600">{savingsPercentage}% (₹{coinValue})</span>
            </div>
            <div className="border-t border-green-200 pt-2 flex justify-between font-semibold">
              <span>Final amount:</span>
              <span>₹{finalAmount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Membership Benefits */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">
            {membershipType === 'GOLD' ? '👑' : membershipType === 'SILVER' ? '🥈' : '👤'} 
            {membershipType} Member Benefits
          </span>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <div>• Use up to {MembershipService.getPlanByType(membershipType)?.maxCoinUsagePercentage}% coins on orders</div>
          <div>• Earn {MembershipService.getPlanByType(membershipType)?.coinBonusPercentage}% bonus on wallet top-ups</div>
          {membershipType === 'FREE' && (
            <div className="mt-2">
              <a href="/membership" className="text-blue-600 hover:underline">
                Upgrade membership to use more coins →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

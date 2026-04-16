// Membership Types and Interfaces
export interface MembershipPlan {
  id: string;
  name: string;
  type: 'FREE' | 'SILVER' | 'GOLD';
  price: number;
  duration: number; // in days
  currency: 'INR';
  features: MembershipFeature[];
  coinBonusPercentage: number;
  maxCoinUsagePercentage: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MembershipFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  isHighlight: boolean;
}

export interface UserMembership {
  id: string;
  userId: string;
  planId: string;
  plan: MembershipPlan;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  autoRenew: boolean;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface XobikartCoin {
  id: string;
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  lastUpdated: Date;
}

export interface CoinTransaction {
  id: string;
  userId: string;
  type: 'EARNED' | 'SPENT' | 'BONUS' | 'REFUND';
  amount: number;
  description: string;
  orderId?: string;
  membershipBonusPercentage?: number;
  createdAt: Date;
}

export interface MembershipBenefit {
  type: 'COIN_BONUS' | 'PRIORITY_SUPPORT' | 'EARLY_ACCESS' | 'EXCLUSIVE_DISCOUNT' | 'FASTER_REFUND';
  value: number | string;
  description: string;
}

// Predefined Membership Plans
export const MEMBERSHIP_PLANS: Omit<MembershipPlan, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Free Plan',
    type: 'FREE',
    price: 0,
    duration: 365, // 1 year
    currency: 'INR',
    coinBonusPercentage: 0,
    maxCoinUsagePercentage: 30,
    isActive: true,
    features: [
      {
        id: 'free-1',
        name: 'Marketplace Access',
        description: 'Full access to browse and purchase products',
        icon: '🛍️',
        isHighlight: false
      },
      {
        id: 'free-2',
        name: 'Standard Pricing',
        description: 'Regular product prices',
        icon: '💰',
        isHighlight: false
      },
      {
        id: 'free-3',
        name: 'Basic Support',
        description: 'Email support within 48 hours',
        icon: '📧',
        isHighlight: false
      }
    ]
  },
  {
    name: 'Silver Plan',
    type: 'SILVER',
    price: 99,
    duration: 30, // 1 month
    currency: 'INR',
    coinBonusPercentage: 5,
    maxCoinUsagePercentage: 40,
    isActive: true,
    features: [
      {
        id: 'silver-1',
        name: 'Extra Xobikart Coins',
        description: '5% bonus coins on wallet top-ups',
        icon: '🪙',
        isHighlight: true
      },
      {
        id: 'silver-2',
        name: 'Priority Support',
        description: 'Priority customer support within 24 hours',
        icon: '⚡',
        isHighlight: true
      },
      {
        id: 'silver-3',
        name: 'Early Access',
        description: 'Early access to sales and new offers',
        icon: '🎯',
        isHighlight: true
      },
      {
        id: 'silver-4',
        name: 'Free Delivery',
        description: 'Free delivery on orders above ₹299',
        icon: '🚚',
        isHighlight: false
      }
    ]
  },
  {
    name: 'Gold Plan',
    type: 'GOLD',
    price: 199,
    duration: 30, // 1 month
    currency: 'INR',
    coinBonusPercentage: 10,
    maxCoinUsagePercentage: 50,
    isActive: true,
    features: [
      {
        id: 'gold-1',
        name: 'Higher Coin Rewards',
        description: '10% bonus coins on all transactions',
        icon: '💎',
        isHighlight: true
      },
      {
        id: 'gold-2',
        name: 'Exclusive Discounts',
        description: 'Member-only discounts up to 15%',
        icon: '🏷️',
        isHighlight: true
      },
      {
        id: 'gold-3',
        name: 'Faster Refunds',
        description: 'Instant refunds to Xobikart wallet',
        icon: '💸',
        isHighlight: true
      },
      {
        id: 'gold-4',
        name: 'Premium Support',
        description: '24/7 premium support with dedicated agent',
        icon: '👑',
        isHighlight: true
      },
      {
        id: 'gold-5',
        name: 'Free Express Delivery',
        description: 'Free express delivery on all orders',
        icon: '🚀',
        isHighlight: false
      },
      {
        id: 'gold-6',
        name: 'VIP Access',
        description: 'VIP access to flash sales and limited offers',
        icon: '⭐',
        isHighlight: false
      }
    ]
  }
];

export const COIN_EARNING_RULES = {
  PURCHASE_PERCENTAGE: 1, // 1% of order value as coins
  REFERRAL_BONUS: 100, // 100 coins for successful referral
  REVIEW_BONUS: 10, // 10 coins for product review
  WALLET_TOPUP_BASE: 0, // Base percentage for wallet topup (enhanced by membership)
};

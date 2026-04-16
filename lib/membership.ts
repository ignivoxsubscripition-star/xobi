// Membership Business Logic
import { MembershipPlan, UserMembership, XobikartCoin, CoinTransaction, MEMBERSHIP_PLANS, COIN_EARNING_RULES } from './types/membership';

export class MembershipService {
  // Get all available membership plans
  static getAvailablePlans(): MembershipPlan[] {
    return MEMBERSHIP_PLANS.map(plan => ({
      ...plan,
      id: `plan_${plan.type.toLowerCase()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  // Get plan by type
  static getPlanByType(type: 'FREE' | 'SILVER' | 'GOLD'): MembershipPlan | null {
    const plans = this.getAvailablePlans();
    return plans.find(plan => plan.type === type) || null;
  }

  // Calculate coin bonus based on membership
  static calculateCoinBonus(amount: number, membershipType: 'FREE' | 'SILVER' | 'GOLD'): number {
    const plan = this.getPlanByType(membershipType);
    if (!plan) return 0;
    
    return Math.floor((amount * plan.coinBonusPercentage) / 100);
  }

  // Calculate maximum coins that can be used for payment
  static calculateMaxCoinUsage(orderAmount: number, membershipType: 'FREE' | 'SILVER' | 'GOLD'): number {
    const plan = this.getPlanByType(membershipType);
    if (!plan) return 0;
    
    return Math.floor((orderAmount * plan.maxCoinUsagePercentage) / 100);
  }

  // Calculate coins earned from purchase
  static calculatePurchaseCoins(orderAmount: number, membershipType: 'FREE' | 'SILVER' | 'GOLD'): number {
    const baseCoins = Math.floor((orderAmount * COIN_EARNING_RULES.PURCHASE_PERCENTAGE) / 100);
    const bonusCoins = this.calculateCoinBonus(baseCoins, membershipType);
    return baseCoins + bonusCoins;
  }

  // Check if membership is active
  static isMembershipActive(membership: UserMembership): boolean {
    const now = new Date();
    return membership.isActive && membership.endDate > now;
  }

  // Get membership benefits description
  static getMembershipBenefits(type: 'FREE' | 'SILVER' | 'GOLD'): string[] {
    const plan = this.getPlanByType(type);
    if (!plan) return [];
    
    return plan.features.map(feature => feature.description);
  }

  // Calculate membership savings (for display purposes)
  static calculateMembershipSavings(membershipType: 'SILVER' | 'GOLD', monthlySpending: number): number {
    if (membershipType === 'SILVER') {
      // Assume 5% average savings from early access + priority support value
      return Math.floor(monthlySpending * 0.05);
    } else if (membershipType === 'GOLD') {
      // Assume 10% average savings from exclusive discounts + faster refunds
      return Math.floor(monthlySpending * 0.10);
    }
    return 0;
  }

  // Generate Razorpay order for membership
  static generateMembershipOrder(planType: 'SILVER' | 'GOLD', userId: string) {
    const plan = this.getPlanByType(planType);
    if (!plan) throw new Error('Invalid plan type');

    return {
      amount: plan.price * 100, // Razorpay expects amount in paise
      currency: plan.currency,
      receipt: `membership_${userId}_${Date.now()}`,
      notes: {
        planType: plan.type,
        planName: plan.name,
        userId: userId,
        duration: plan.duration
      }
    };
  }
}

export class CoinService {
  // Calculate wallet topup bonus
  static calculateWalletTopupBonus(amount: number, membershipType: 'FREE' | 'SILVER' | 'GOLD'): number {
    return MembershipService.calculateCoinBonus(amount, membershipType);
  }

  // Format coin display
  static formatCoins(amount: number): string {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toString();
  }

  // Convert coins to INR (1 coin = ₹1)
  static coinsToINR(coins: number): number {
    return coins;
  }

  // Convert INR to coins (₹1 = 1 coin)
  static INRToCoins(amount: number): number {
    return amount;
  }

  // Validate coin usage for order
  static validateCoinUsage(coinsToUse: number, availableCoins: number, orderAmount: number, membershipType: 'FREE' | 'SILVER' | 'GOLD'): {
    isValid: boolean;
    maxAllowed: number;
    error?: string;
  } {
    const maxAllowed = MembershipService.calculateMaxCoinUsage(orderAmount, membershipType);
    
    if (coinsToUse > availableCoins) {
      return {
        isValid: false,
        maxAllowed,
        error: 'Insufficient coins in wallet'
      };
    }
    
    if (coinsToUse > maxAllowed) {
      return {
        isValid: false,
        maxAllowed,
        error: `Maximum ${maxAllowed} coins can be used for this order`
      };
    }
    
    return {
      isValid: true,
      maxAllowed
    };
  }
}

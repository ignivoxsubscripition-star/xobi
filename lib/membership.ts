// Membership Business Logic
import { MembershipPlan, UserMembership, MEMBERSHIP_PLANS } from './types/membership';

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


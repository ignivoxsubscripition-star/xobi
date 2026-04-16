'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { MembershipProvider } from '@/context/MembershipContext';
import { BuyNowProvider } from '@/context/BuyNowContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <MembershipProvider>
                <CartProvider>
                    <BuyNowProvider>
                        {children}
                    </BuyNowProvider>
                </CartProvider>
            </MembershipProvider>
        </AuthProvider>
    );
}

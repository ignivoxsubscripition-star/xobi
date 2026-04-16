'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/components/types';

interface BuyNowItem {
  product: Product;
  quantity: number;
}

interface BuyNowContextType {
  buyNowItem: BuyNowItem | null;
  setBuyNowItem: (product: Product, quantity: number) => void;
  clearBuyNowItem: () => void;
  getBuyNowTotal: () => number;
}

const BuyNowContext = createContext<BuyNowContextType | undefined>(undefined);

export function BuyNowProvider({ children }: { children: React.ReactNode }) {
  const [buyNowItem, setBuyNowItemState] = useState<BuyNowItem | null>(null);

  const setBuyNowItem = (product: Product, quantity: number) => {
    setBuyNowItemState({ product, quantity });
  };

  const clearBuyNowItem = () => {
    setBuyNowItemState(null);
  };

  const getBuyNowTotal = () => {
    if (!buyNowItem) return 0;
    return buyNowItem.product.price * buyNowItem.quantity;
  };

  return (
    <BuyNowContext.Provider
      value={{
        buyNowItem,
        setBuyNowItem,
        clearBuyNowItem,
        getBuyNowTotal,
      }}
    >
      {children}
    </BuyNowContext.Provider>
  );
}

export function useBuyNow() {
  const context = useContext(BuyNowContext);
  if (context === undefined) {
    throw new Error('useBuyNow must be used within a BuyNowProvider');
  }
  return context;
}
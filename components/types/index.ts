// Core Data Models

export interface ProductTag {
  label: string;
  type: 'best-seller' | 'new-arrival' | 'combo-offer' | 'discount';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  images?: string[];
  tags?: ProductTag[];
  link: string;
  category: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  seller?: string;
  inStock?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string; // Added slug for routing
  image: string;
  link: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  role: 'user' | 'seller' | 'admin';
  membershipTier?: 'Free' | 'Silver' | 'Gold';
  coins?: number;
}

export interface Seller {
  id: string;
  storeName: string;
  ownerName: string;
  email: string;
  mobile: string;
  businessType: string;
  gstNumber?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  bankDetails?: {
    accountHolder: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
  };
  status: 'pending' | 'active' | 'rejected';
}

export interface CartItem extends Product {
  quantity: number;
}

// Component Props Interfaces

export interface HeaderProps {
  // No props needed for static version
}

export interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
}

export interface CategoriesProps {
  categories: Category[];
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  products: Product[];
}

export interface SubscribeFormProps {
  onSubmit?: (email: string) => void;
}

export interface FooterProps {
  // No props needed for static version
}

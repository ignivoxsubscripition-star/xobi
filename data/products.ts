import { Product, Category } from '@/components/types';

export const categories: Category[] = [
    {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        image: '/assets/generated.avif',
        link: '/category/electronics',
        description: 'Latest gadgets, mobiles, and electronic devices',
    },
    {
        id: '2',
        name: 'Fashion & Apparel',
        slug: 'fashion',
        image: '/assets/generated.avif',
        link: '/category/fashion',
        description: 'Trendy clothing, footwear, and accessories',
    },
    {
        id: '3',
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        image: '/assets/generated.avif',
        link: '/category/home-kitchen',
        description: 'Essentials for your home and kitchen',
    },
    {
        id: '4',
        name: 'Mobile Accessories',
        slug: 'mobile-accessories',
        image: '/assets/generated.avif',
        link: '/category/mobile-accessories',
        description: 'Cases, Chargers, and more for your smartphone',
    },
    {
        id: '5',
        name: 'Beauty & Personal Care',
        slug: 'beauty',
        image: '/assets/generated.avif',
        link: '/category/beauty',
        description: 'Skincare, makeup, and personal grooming',
    },
];

export const products: Product[] = [
    // Electronics
    {
        id: 'e1',
        name: 'boAt Airdopes 141 Bluetooth Earbuds',
        price: 1299,
        originalPrice: 4490,
        discountPercentage: 71,
        image: '/assets/generated.avif',
        link: '/product/boat-airdopes-141',
        category: 'electronics',
        description: 'True Wireless Earbuds with 42H Playtime, Beast Mode, ENx Tech, ASAP Charge, IWP, IPX4 Water Resistance.',
        rating: 4.2,
        reviewCount: 15400,
        seller: 'Sharma Electronics',
        inStock: true,
        tags: [{ label: 'BEST SELLER', type: 'best-seller' }],
    },
    {
        id: 'e2',
        name: 'Samsung 4K UHD Smart LED TV 43 inch',
        price: 29990,
        originalPrice: 47900,
        discountPercentage: 37,
        image: '/assets/generated.avif',
        link: '/product/samsung-4k-tv-43',
        category: 'electronics',
        description: 'Crystal 4K Series Ultra HD Smart LED TV with HDR 10+, PurColor, and Symphony Sound.',
        rating: 4.5,
        reviewCount: 3200,
        seller: 'Cloudtail India',
        inStock: true,
    },
    {
        id: 'e3',
        name: 'Redmi Note 13 Pro 5G',
        price: 24999,
        originalPrice: 28999,
        discountPercentage: 14,
        image: '/assets/generated.avif',
        link: '/product/redmi-note-13-pro',
        category: 'electronics',
        description: '200MP Camera, 67W Turbo Charge, 120Hz AMOLED Display, Snapdragon 7s Gen 2.',
        rating: 4.3,
        reviewCount: 8900,
        seller: 'Mobile Junction',
        inStock: true,
        tags: [{ label: 'NEW ARRIVAL', type: 'new-arrival' }],
    },
    {
        id: 'e4',
        name: 'Realme Fast Charging Adapter 33W',
        price: 999,
        originalPrice: 1999,
        discountPercentage: 50,
        image: '/assets/generated.avif',
        link: '/product/realme-33w-adapter',
        category: 'mobile-accessories',
        description: 'SuperVOOC 33W Fast Charger compatible with Realme devices.',
        rating: 4.4,
        reviewCount: 1200,
        seller: 'Gadget World',
        inStock: true,
    },

    // Fashion
    {
        id: 'f1',
        name: 'Men’s Cotton Kurta Set',
        price: 899,
        originalPrice: 2499,
        discountPercentage: 64,
        image: '/assets/generated.avif',
        link: '/product/mens-kurta-set',
        category: 'fashion',
        description: '100% Cotton Printed Kurta with Pyjama, ideal for festivals and casual wear.',
        rating: 4.0,
        reviewCount: 560,
        seller: 'Trendy Fashions',
        inStock: true,
    },
    {
        id: 'f2',
        name: 'Women’s Anarkali Kurti',
        price: 1299,
        originalPrice: 3599,
        discountPercentage: 64,
        image: '/assets/generated.avif',
        link: '/product/womens-anarkali-kurti',
        category: 'fashion',
        description: 'Rayon Gold Printed Anarkali Kurti with Dupatta set.',
        rating: 4.1,
        reviewCount: 890,
        seller: 'Ethnic Vibes',
        inStock: true,
        tags: [{ label: 'TRENDING', type: 'best-seller' }],
    },

    // Home & Kitchen
    {
        id: 'hk1',
        name: 'Prestige Non-Stick Fry Pan',
        price: 750,
        originalPrice: 1100,
        discountPercentage: 32,
        image: '/assets/generated.avif',
        link: '/product/prestige-fry-pan',
        category: 'home-kitchen',
        description: 'Omega Deluxe Granite Fry Pan, 240mm, Black.',
        rating: 4.3,
        reviewCount: 2100,
        seller: 'Home Essentials',
        inStock: true,
    },
    {
        id: 'hk2',
        name: 'Milton Thermosteel Water Bottle',
        price: 850,
        originalPrice: 1095,
        discountPercentage: 22,
        image: '/assets/generated.avif',
        link: '/product/milton-thermosteel',
        category: 'home-kitchen',
        description: '24 Hours Hot or Cold, 1000ml, Stainless Steel Bottle.',
        rating: 4.6,
        reviewCount: 4500,
        seller: 'Smart Mart',
        inStock: true,
    },

    // Mobile Accessories
    {
        id: 'ma1',
        name: 'Spigen Back Cover for iPhone 14',
        price: 999,
        originalPrice: 1499,
        discountPercentage: 33,
        image: '/assets/generated.avif',
        link: '/product/spigen-iphone-case',
        category: 'mobile-accessories',
        description: 'Liquid Air Back Cover Case compatible with iPhone 14, Matte Black.',
        rating: 4.7,
        reviewCount: 1560,
        seller: 'Tech Guards',
        inStock: true,
    },
    {
        id: 'ma2',
        name: 'OnePlus Type-C Cable',
        price: 499,
        originalPrice: 999,
        discountPercentage: 50,
        image: '/assets/generated.avif',
        link: '/product/oneplus-cable',
        category: 'mobile-accessories',
        description: 'Warp Charge Type-C to Type-C Cable, 100cm, Red.',
        rating: 4.5,
        reviewCount: 2300,
        seller: 'OnePlus Store',
        inStock: true,
    },

    // Beauty
    {
        id: 'b1',
        name: 'Mamaearth Onion Hair Oil',
        price: 399,
        originalPrice: 419,
        discountPercentage: 5,
        image: '/assets/generated.avif',
        link: '/product/mamaearth-hair-oil',
        category: 'beauty',
        description: 'For Hair Growth & Hair Fall Control, with Redensyl.',
        rating: 4.1,
        reviewCount: 3400,
        seller: 'Mamaearth Direct',
        inStock: true,
    },
    {
        id: 'b2',
        name: 'Himalaya Neem Face Wash 150ml',
        price: 180,
        originalPrice: 220,
        discountPercentage: 18,
        image: '/assets/generated.avif',
        link: '/product/himalaya-neem-facewash',
        category: 'beauty',
        description: 'Purifying Neem Face Wash for Acne / Pimples.',
        rating: 4.4,
        reviewCount: 6700,
        seller: 'Himalaya Wellness',
        inStock: true,
    },
];

// API functions for frontend
export const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return products; // Fallback to static data
  }
};

export const fetchCategories = async () => {
  try {
    // For now, return static categories
    // You can implement categories API later if needed
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return categories;
  }
};
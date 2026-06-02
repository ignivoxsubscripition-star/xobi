import { Product, Category } from '@/components/types';

export const categories: Category[] = [
    {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        image: '/assets/generic/tv.png',
        link: '/category/electronics',
        description: 'Latest gadgets, mobiles, and electronic devices',
    },
    {
        id: '2',
        name: 'Fashion & Apparel',
        slug: 'fashion',
        image: '/assets/generic/backpack.png',
        link: '/category/fashion',
        description: 'Trendy clothing, footwear, and accessories',
    },
    {
        id: '3',
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        image: '/assets/generic/kitchen.png',
        link: '/category/home-kitchen',
        description: 'Essentials for your home and kitchen',
    },
    {
        id: '4',
        name: 'Mobile Accessories',
        slug: 'mobile-accessories',
        image: '/assets/generic/charger_cable.png',
        link: '/category/mobile-accessories',
        description: 'Cases, Chargers, and more for your smartphone',
    },
    {
        id: '5',
        name: 'Beauty & Personal Care',
        slug: 'beauty',
        image: '/assets/generic/home.png',
        link: '/category/beauty',
        description: 'Skincare, makeup, and personal grooming',
    },
];

export const products: Product[] = [
    // Electronics
    {
        id: 'e1',
        name: 'Wireless Bluetooth Earbuds',
        price: 1299,
        originalPrice: 4490,
        discountPercentage: 71,
        image: '/assets/generic/tws2.jpg',
        link: '/product/wireless-earbuds-141',
        category: 'electronics',
        description: 'True Wireless Earbuds with 42H Playtime, Low Latency Mode, Noise Cancellation, Fast Charge, Auto Connect, IPX4 Water Resistance.',
        rating: 4.2,
        reviewCount: 15400,
        seller: 'Sharma Electronics',
        inStock: true,
        tags: [{ label: 'BEST SELLER', type: 'best-seller' }],
    },
    {
        id: 'e4',
        name: 'Fast Charging Adapter 33W',
        price: 999,
        originalPrice: 1999,
        discountPercentage: 50,
        image: '/assets/generic/charger.png',
        link: '/product/fast-charger-33w',
        category: 'mobile-accessories',
        description: 'SuperVOOC Fast Charger compatible with Smart Phone devices.',
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
        image: '/assets/generic/home.png',
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
        image: '/assets/generic/home.png',
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
        name: 'Deluxe Non-Stick Fry Pan',
        price: 750,
        originalPrice: 1100,
        discountPercentage: 32,
        image: '/assets/generic/pan.png',
        link: '/product/non-stick-fry-pan',
        category: 'home-kitchen',
        description: 'Omega Deluxe Granite Fry Pan, 240mm, Black.',
        rating: 4.3,
        reviewCount: 2100,
        seller: 'Home Essentials',
        inStock: true,
    },
    {
        id: 'hk2',
        name: 'Thermosteel Vacuum Insulated Water Bottle',
        price: 850,
        originalPrice: 1095,
        discountPercentage: 22,
        image: '/assets/generic/thermosteel_waterbottle.png',
        link: '/product/thermosteel-bottle',
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
        name: 'Rugged Back Cover for Premium Phone 14',
        price: 999,
        originalPrice: 1499,
        discountPercentage: 33,
        image: '/assets/generic/peripherals.png',
        link: '/product/rugged-phone-case',
        category: 'mobile-accessories',
        description: 'Liquid Air Back Cover Case compatible with Premium Phone 14, Matte Black.',
        rating: 4.7,
        reviewCount: 1560,
        seller: 'Tech Guards',
        inStock: true,
    },
    {
        id: 'ma2',
        name: 'Fast Charging Type-C Cable 1m',
        price: 499,
        originalPrice: 999,
        discountPercentage: 50,
        image: '/assets/generic/charger_cable.png',
        link: '/product/fast-charging-cable',
        category: 'mobile-accessories',
        description: 'Fast Charge Type-C to Type-C Cable, 100cm, Red.',
        rating: 4.5,
        reviewCount: 2300,
        seller: 'Accessories Store',
        inStock: true,
    },

    // Beauty
    {
        id: 'b1',
        name: 'Onion Hair Oil',
        price: 399,
        originalPrice: 419,
        discountPercentage: 5,
        image: '/assets/generic/home.png',
        link: '/product/hair-oil',
        category: 'beauty',
        description: 'For Hair Growth & Hair Fall Control, with Hair Growth Actives.',
        rating: 4.1,
        reviewCount: 3400,
        seller: 'Wellness Store Direct',
        inStock: true,
    },
    {
        id: 'b2',
        name: 'Purifying Neem Face Wash 150ml',
        price: 180,
        originalPrice: 220,
        discountPercentage: 18,
        image: '/assets/generic/home.png',
        link: '/product/neem-facewash',
        category: 'beauty',
        description: 'Purifying Neem Face Wash for Acne / Pimples.',
        rating: 4.4,
        reviewCount: 6700,
        seller: 'Wellness Store',
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
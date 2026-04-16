'use client';

import { Product } from '@/components/types';
import Image from 'next/image';
import Link from 'next/link';

interface BudgetProductsProps {
  products: Product[];
}

export default function BudgetProducts({ products }: BudgetProductsProps) {
  // Filter products between ₹100 - ₹200
  const budgetProducts = products.filter(
    (product) => product.price >= 100 && product.price <= 200
  );

  if (budgetProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-2">
              Everyday Wins Under ₹200
            </h2>
            <p className="text-gray-600">Best value for money deals</p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center text-primary hover:text-secondary font-medium transition-colors"
          >
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {budgetProducts.slice(0, 10).map((product) => (
            <Link
              key={product.id}
              href={product.link}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                
                {/* Discount Badge */}
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <div className="absolute top-2 left-2 bg-brand-gradient text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    {product.discountPercentage}% OFF
                  </div>
                )}
                
                {/* Quick View on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    Quick View
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4">
                {/* Product Name */}
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating || 0)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({product.reviewCount || 0})
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-dark">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-400 font-medium italic">Currently Unavailable</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button (Mobile) */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-gradient text-white font-medium rounded-xl hover:bg-secondary transition-colors shadow-md hover:shadow-lg"
          >
            View All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

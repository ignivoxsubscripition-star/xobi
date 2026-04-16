'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductCardProps } from '@/components/types';
import { useCart } from '@/context/CartContext';
import { useBuyNow } from '@/context/BuyNowContext';

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { setBuyNowItem } = useBuyNow();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBuyNowItem(product, 1);
    router.push('/buy-now');
  };

  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group block h-full">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col relative">
        {/* Product Image with Hover Zoom Effect */}
        <Link href={product.link} className="relative aspect-square overflow-hidden bg-gray-50 block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          {/* Product Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] font-bold px-3 py-1 bg-black/90 text-white uppercase tracking-wider rounded-full shadow-md backdrop-blur-sm"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </Link>

        {/* Quick Buy Button (visible on hover) */}
        <button
          onClick={handleBuyNow}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20 bg-brand-gradient text-white p-2 rounded-full shadow-lg hover:bg-secondary focus:outline-none"
          title="Buy Now"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>


        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
          <Link href={product.link} className="mb-2 block flex-grow">
            <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[18px] font-bold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </p>
              )}
              {discount > 0 && (
                <span className="text-xs font-bold text-green-600">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Mobile Buttons */}
            <div className="flex gap-2 md:hidden">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2 rounded-xl border border-primary text-primary font-semibold text-xs hover:bg-primary hover:text-white transition-colors uppercase tracking-wide"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-2 rounded-xl bg-brand-gradient text-white font-semibold text-xs hover:bg-secondary transition-colors uppercase tracking-wide"
              >
                Buy Now
              </button>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex flex-col gap-2">
              <button
                onClick={handleBuyNow}
                className="w-full py-2 rounded-xl bg-brand-gradient text-white font-medium text-sm hover:bg-secondary transition-colors"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full py-2 rounded-xl bg-gray-50 text-gray-800 font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

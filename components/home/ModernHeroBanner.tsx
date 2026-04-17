'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Product } from '@/components/types';

interface ModernHeroBannerProps {
  products: Product[];
}

export default function ModernHeroBanner({ products }: ModernHeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const carouselProducts = products.slice(0, 10);

  const goToSlide = useCallback(
    (index: number, dir: 'left' | 'right' = 'right') => {
      if (isAnimating || carouselProducts.length === 0) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating, carouselProducts.length]
  );

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % carouselProducts.length;
    goToSlide(next, 'right');
  }, [currentIndex, carouselProducts.length, goToSlide]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + carouselProducts.length) % carouselProducts.length;
    goToSlide(prev, 'left');
  }, [currentIndex, carouselProducts.length, goToSlide]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(goNext, 5000);
  }, [goNext]);

  useEffect(() => {
    if (carouselProducts.length === 0) return;
    startAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [startAutoPlay, carouselProducts.length]);

  if (carouselProducts.length === 0) {
    return (
      <section className="w-full bg-white flex items-center justify-center" style={{ minHeight: 'calc(100vh - 96px)' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </section>
    );
  }

  const product = carouselProducts[currentIndex];

  const slideClass = isAnimating
    ? direction === 'right'
      ? 'opacity-0 translate-x-4'
      : 'opacity-0 -translate-x-4'
    : 'opacity-100 translate-x-0';

  return (
    <section className="w-full bg-white overflow-hidden flex flex-col" style={{ minHeight: 'calc(100vh - 96px)' }}>

      {/* ─── DESKTOP LAYOUT ─────────────────────────────── */}
      <div className="hidden lg:flex flex-1 w-full items-center">

        {/* Left: Text Content — half viewport */}
        <div
          className={`w-1/2 flex flex-col justify-center px-16 xl:px-24 py-12 space-y-6 transition-all duration-350 ease-in-out ${slideClass}`}
          key={`text-${currentIndex}`}
        >
          {/* Product Name */}
          <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-semibold text-gray-800 leading-tight tracking-tight">
            {product.name}
          </h1>

          {/* Category Badge */}
          <div>
            <span className="inline-block bg-brand-gradient text-white text-sm font-medium px-5 py-2 rounded-lg tracking-wide uppercase shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Price / Discount */}
          <div className="space-y-1">
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Save</p>
                <p className="text-3xl xl:text-4xl font-semibold text-gray-800">
                  Up to{' '}
                  <span className="text-primary">{product.discountPercentage}%</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">From</p>
                <p className="text-3xl xl:text-4xl font-semibold text-gray-800">
                  <span className="text-lg font-normal text-gray-500 mr-1">Rs.</span>
                  {product.price.toLocaleString('en-IN')}
                </p>
              </>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">
                Was ₹{product.originalPrice.toLocaleString('en-IN')}
              </p>
            )}
          </div>

          {/* CTA */}
          <div>
            <Link
              href={product.link}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-gradient text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110 shadow-md hover:shadow-lg"
            >
              Start Buying
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right: Product Image — half viewport, fills height */}
        <div
          className={`w-1/2 flex items-center justify-center py-12 pr-12 xl:pr-20 transition-all duration-350 ease-in-out ${slideClass}`}
          key={`img-${currentIndex}`}
        >
          <div className="relative w-full h-full" style={{ minHeight: '420px' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="50vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* ─── MOBILE LAYOUT ───────────────────────────────── */}
      <div className="lg:hidden flex flex-col flex-1 w-full">

        {/* Top: Text — fills top half */}
        <div
          className={`flex flex-col items-center text-center px-6 pt-10 pb-6 space-y-4 transition-all duration-350 ease-in-out ${slideClass}`}
          key={`mob-text-${currentIndex}`}
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-tight tracking-tight">
            {product.name}
          </h1>

          <span className="inline-block bg-brand-gradient text-white text-xs font-medium px-4 py-1.5 rounded-lg tracking-wide uppercase shadow-sm">
            {product.category}
          </span>

          <div className="space-y-1">
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Save</p>
                <p className="text-2xl font-semibold text-gray-800">
                  Up to{' '}
                  <span className="text-primary">{product.discountPercentage}%</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">From</p>
                <p className="text-2xl font-semibold text-gray-800">
                  <span className="text-base font-normal text-gray-500 mr-1">Rs.</span>
                  {product.price.toLocaleString('en-IN')}
                </p>
              </>
            )}
          </div>

          <Link
            href={product.link}
            className="inline-flex items-center justify-center px-8 py-3 bg-brand-gradient text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:brightness-110 shadow-md"
          >
            Start Buying
          </Link>
        </div>

        {/* Bottom: Product Image — fills remaining space */}
        <div
          className={`flex-1 flex items-center justify-center px-8 pb-6 transition-all duration-350 ease-in-out ${slideClass}`}
          key={`mob-img-${currentIndex}`}
          style={{ minHeight: '280px' }}
        >
          <div className="relative w-full h-full" style={{ minHeight: '260px' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
        </div>
      </div>

      {/* ─── DOTS ─────────────────────────────────────────── */}
      <div className="w-full flex items-center justify-center gap-2 py-6 bg-white">
        {carouselProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { goToSlide(idx, idx > currentIndex ? 'right' : 'left'); startAutoPlay(); }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-7 h-2.5 bg-primary'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

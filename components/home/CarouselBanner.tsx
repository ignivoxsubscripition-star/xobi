'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface CarouselBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  images: string[];
}

export default function CarouselBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  images,
}: CarouselBannerProps) {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section
      className="relative w-full h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] min-h-[400px] sm:min-h-[500px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt={`Banner ${index + 1}`}
              fill
              priority={index === 0}
              className="object-contain"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content - Always Visible */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 z-10 pointer-events-none">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 text-center max-w-2xl w-full mx-auto border border-white/10 shadow-2xl pointer-events-auto">
          <h1 className="text-white font-bold text-[28px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight mb-3 sm:mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed mb-6 sm:mb-8 font-medium drop-shadow-md">
            {subtitle}
          </p>
          {!user && (
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-brand-gradient text-white text-[14px] sm:text-[16px] font-semibold rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4 sm:w-6 sm:h-6 transform group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 sm:w-12 h-2 sm:h-3 bg-white'
                : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-20 bg-black/30 backdrop-blur-sm text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
        {currentIndex + 1} / {images.length}
      </div>
    </section>
  );
}

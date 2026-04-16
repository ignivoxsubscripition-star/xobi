'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HeroBannerProps } from '@/components/types';
import { useAuth } from '@/context/AuthContext';

export default function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
}: HeroBannerProps) {
  const { user } = useAuth();

  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Hero banner background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="bg-black/30 backdrop-blur-md rounded-3xl px-12 py-16 text-center max-w-2xl w-full mx-auto border border-white/10 shadow-2xl">
          <h1 className="text-white font-bold text-[48px] sm:text-[56px] md:text-[64px] leading-tight mb-4">
            {title}
          </h1>
          <p className="text-white/90 text-[18px] sm:text-[20px] leading-relaxed mb-8 font-light">
            {subtitle}
          </p>
          {!user && (
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-gradient text-white text-[16px] font-semibold rounded-full hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/components/types';

interface ModernHeroBannerProps {
  products: Product[];
}

export default function ModernHeroBanner({ products }: ModernHeroBannerProps) {
  const { user } = useAuth();

  // Filter products between ₹100-200
  const budgetProducts = products.filter(
    (product) => product.price >= 100 && product.price <= 200
  ).slice(2, 8);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-white opacity-50"></div>

      {/* Floating E-commerce Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Side Icons */}
        <div className="absolute top-[15%] left-[8%] animate-float-slow opacity-20">
          <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4v14a2 2 0 002 2h12a2 2 0 002-2V6h-4zm-6-2h4v2h-4V4zm10 16H4V8h16v12z" />
          </svg>
        </div>

        {/* Left-Top-Middle Dense Fill */}
        <div className="absolute top-[8%] left-[18%] animate-float-medium opacity-18 rotate-[12deg]">
          <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[12%] left-[22%] animate-pulse opacity-22">
          <svg className="w-7 h-7 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-[18%] left-[20%] animate-float-fast opacity-20 rotate-[-8deg]">
          <svg className="w-9 h-9 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>

        <div className="absolute top-[22%] left-[28%] animate-float-slow opacity-18 rotate-[15deg]">
          <svg className="w-7 h-7 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
          </svg>
        </div>

        <div className="absolute top-[28%] left-[24%] animate-float-medium opacity-20 rotate-[-12deg]">
          <svg className="w-8 h-8 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4v14a2 2 0 002 2h12a2 2 0 002-2V6h-4zm-6-2h4v2h-4V4zm10 16H4V8h16v12z" />
          </svg>
        </div>

        <div className="absolute top-[32%] left-[19%] animate-pulse opacity-22">
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[10%] left-[26%] animate-float-fast opacity-18 rotate-[10deg]">
          <svg className="w-7 h-7 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
          </svg>
        </div>

        <div className="absolute top-[16%] left-[30%] animate-float-slow opacity-20 rotate-[-15deg]">
          <svg className="w-8 h-8 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        </div>

        <div className="absolute top-[26%] left-[32%] animate-float-medium opacity-18 rotate-[8deg]">
          <svg className="w-7 h-7 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-[34%] left-[26%] animate-ping opacity-20">
          <svg className="w-6 h-6 text-lime-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z" />
          </svg>
        </div>

        <div className="absolute top-[14%] left-[18%] animate-float-fast opacity-18 rotate-[-10deg]">
          <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5832L18.59 3.9955l1.4142 1.4143L5.4167 19.9974zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>

        <div className="absolute top-[30%] left-[30%] animate-float-slow opacity-20 rotate-[18deg]">
          <svg className="w-7 h-7 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[20%] left-[32%] animate-pulse opacity-22">
          <svg className="w-6 h-6 text-fuchsia-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
          </svg>
        </div>

        {/* Left-Top-Middle Fill - Better Spacing */}
        <div className="absolute top-[10%] left-[22%] animate-float-slow opacity-22 rotate-[10deg]">
          <svg className="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-[16%] left-[27%] animate-pulse opacity-22">
          <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z" />
          </svg>
        </div>

        <div className="absolute top-[22%] left-[20%] animate-float-medium opacity-20 rotate-[-10deg]">
          <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4v14a2 2 0 002 2h12a2 2 0 002-2V6h-4zm-6-2h4v2h-4V4zm10 16H4V8h16v12z" />
          </svg>
        </div>

        <div className="absolute top-[28%] left-[25%] animate-float-fast opacity-18 rotate-[12deg]">
          <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
          </svg>
        </div>

        <div className="absolute top-[34%] left-[30%] animate-pulse opacity-22">
          <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z" />
          </svg>
        </div>

        <div className="absolute top-[13%] left-[19%] animate-float-fast opacity-20 rotate-[-6deg]">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>

        <div className="absolute top-[19%] left-[31%] animate-float-slow opacity-18 rotate-[14deg]">
          <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[31%] left-[19%] animate-float-medium opacity-20 rotate-[-8deg]">
          <svg className="w-6 h-6 text-lime-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4v14a2 2 0 002 2h12a2 2 0 002-2V6h-4zm-6-2h4v2h-4V4zm10 16H4V8h16v12z" />
          </svg>
        </div>

        <div className="absolute top-[45%] left-[5%] animate-float-medium opacity-15 rotate-12">
          <svg className="w-10 h-10 text-secondary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
          </svg>
        </div>

        <div className="absolute top-[70%] left-[10%] animate-float-fast opacity-20 -rotate-6">
          <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
          </svg>
        </div>

        <div className="absolute top-[25%] left-[15%] animate-pulse opacity-25">
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[55%] left-[2%] animate-float-slow opacity-15 rotate-[-15deg]">
          <svg className="w-9 h-9 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-[35%] left-[12%] animate-float-medium opacity-20 rotate-6">
          <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>

        <div className="absolute top-[80%] left-[7%] animate-ping opacity-30">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z" />
          </svg>
        </div>

        <div className="absolute top-[10%] left-[3%] animate-float-fast opacity-25 rotate-12">
          <svg className="w-11 h-11 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5832L18.59 3.9955l1.4142 1.4143L5.4167 19.9974zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>

        {/* Right Side Icons */}
        <div className="absolute top-[20%] right-[8%] animate-float-medium opacity-20 rotate-[-12deg]">
          <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        </div>

        <div className="absolute top-[50%] right-[5%] animate-float-slow opacity-18 rotate-[8deg]">
          <svg className="w-9 h-9 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
          </svg>
        </div>

        <div className="absolute top-[75%] right-[10%] animate-float-fast opacity-22 rotate-[-8deg]">
          <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[12%] right-[15%] animate-pulse opacity-28">
          <svg className="w-7 h-7 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </div>

        <div className="absolute top-[40%] right-[12%] animate-float-medium opacity-20 rotate-[15deg]">
          <svg className="w-11 h-11 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
          </svg>
        </div>

        <div className="absolute top-[65%] right-[3%] animate-float-slow opacity-18 rotate-[-10deg]">
          <svg className="w-9 h-9 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
        </div>

        <div className="absolute top-[85%] right-[8%] animate-ping opacity-25">
          <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z" />
          </svg>
        </div>

        {/* Center/Middle Area - Dense Fill */}
        <div className="absolute top-[5%] left-[45%] animate-float-fast opacity-20 rotate-[20deg]">
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
          </svg>
        </div>

        <div className="absolute top-[18%] left-[38%] animate-float-slow opacity-18 rotate-[-10deg]">
          <svg className="w-7 h-7 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[28%] left-[42%] animate-pulse opacity-22">
          <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-[38%] left-[35%] animate-float-medium opacity-20 rotate-[8deg]">
          <svg className="w-9 h-9 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>

        <div className="absolute top-[48%] left-[40%] animate-float-fast opacity-18 rotate-[-15deg]">
          <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4v14a2 2 0 002 2h12a2 2 0 002-2V6h-4zm-6-2h4v2h-4V4zm10 16H4V8h16v12z" />
          </svg>
        </div>

        <div className="absolute top-[58%] left-[36%] animate-float-slow opacity-20 rotate-[12deg]">
          <svg className="w-7 h-7 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 00-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
          </svg>
        </div>

        <div className="absolute top-[68%] left-[43%] animate-pulse opacity-25">
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[78%] left-[38%] animate-float-medium opacity-18 rotate-[-8deg]">
          <svg className="w-8 h-8 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
          </svg>
        </div>

        <div className="absolute top-[88%] left-[48%] animate-float-medium opacity-22 rotate-[-18deg]">
          <svg className="w-7 h-7 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
          </svg>
        </div>

        {/* More Middle Right */}
        <div className="absolute top-[15%] left-[52%] animate-float-fast opacity-20 rotate-[15deg]">
          <svg className="w-7 h-7 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <div className="absolute top-[32%] left-[55%] animate-float-slow opacity-18 rotate-[-12deg]">
          <svg className="w-8 h-8 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
          </svg>
        </div>

        <div className="absolute top-[45%] left-[50%] animate-pulse opacity-22">
          <svg className="w-6 h-6 text-lime-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[62%] left-[53%] animate-float-medium opacity-20 rotate-[10deg]">
          <svg className="w-9 h-9 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4v14a2 2 0 002 2h12a2 2 0 002-2V6h-4zm-6-2h4v2h-4V4zm10 16H4V8h16v12z" />
          </svg>
        </div>

        <div className="absolute top-[75%] left-[48%] animate-float-fast opacity-18 rotate-[-10deg]">
          <svg className="w-7 h-7 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.5 11C9.43 11 11 9.43 11 7.5S9.43 4 7.5 4 4 5.57 4 7.5 5.57 11 7.5 11zm0-5C8.33 6 9 6.67 9 7.5S8.33 9 7.5 9 6 8.33 6 7.5 6.67 6 7.5 6zM4.0025 18.5832L18.59 3.9955l1.4142 1.4143L5.4167 19.9974zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
          </svg>
        </div>

        {/* Additional scattered middle icons */}
        <div className="absolute top-[22%] left-[48%] animate-float-slow opacity-16 rotate-[18deg]">
          <svg className="w-6 h-6 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16.8 5.6 21.2 8 14l-6-4.8h7.6z" />
          </svg>
        </div>

        <div className="absolute top-[52%] left-[45%] animate-ping opacity-20">
          <svg className="w-5 h-5 text-fuchsia-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[82%] left-[52%] animate-float-medium opacity-18 rotate-[-20deg]">
          <svg className="w-7 h-7 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Bottom Icons */}
        <div className="absolute top-[92%] left-[20%] animate-pulse opacity-20">
          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="absolute top-[90%] right-[25%] animate-float-slow opacity-18 rotate-[12deg]">
          <svg className="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-2 lg:py-4 gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium">New Arrivals Daily</span>
            </div>

            {/* Headline */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                Easy on pockets,
                <br />
                <span className="text-primary">
                  Heavy on value.
                </span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                Discover amazing deals on electronics, fashion, home essentials & more.
                <span className="font-semibold text-primary"> Quality products at unbeatable prices.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <Link
                href="/shop"
                className="group inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3.5 bg-brand-gradient text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-secondary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-auto max-w-[200px] sm:max-w-none mx-auto sm:mx-0"
              >
                Shop Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {!user && (
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3.5 bg-white border-2 border-primary !text-black text-sm sm:text-base font-bold rounded-xl hover:bg-brand-gradient hover:text-white hover:border-transparent transition-all duration-300 shadow-md hover:shadow-lg w-auto max-w-[200px] sm:max-w-none mx-auto sm:mx-0"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:items-center lg:gap-6 justify-center lg:justify-start pt-4 border-t border-gray-200">
              <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2 text-gray-700">
                <div className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 bg-primary/10 rounded-xl">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                  </svg>
                </div>
                <span className="text-xs lg:text-sm font-medium text-center lg:text-left">Timely Delivery</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2 text-gray-700">
                <div className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 bg-primary/10 rounded-xl">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs lg:text-sm font-medium text-center lg:text-left">Easy Returns</span>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2 text-gray-700">
                <div className="flex items-center justify-center w-8 h-8 lg:w-9 lg:h-9 bg-primary/10 rounded-xl">
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs lg:text-sm font-medium text-center lg:text-left">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Right Products Grid */}
          <div className="flex-1 relative w-full lg:max-w-3xl lg:-ml-2">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl"></div>

              {/* Products Grid */}
              <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
                {budgetProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={product.link}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 300px"
                        priority={index < 3}
                      />
                      {/* Discount Badge */}
                      {product.discountPercentage && product.discountPercentage > 0 && (
                        <div className="absolute top-1.5 left-1.5 lg:top-2.5 lg:left-2.5 bg-brand-gradient text-white text-[10px] lg:text-sm font-bold px-2 lg:px-3 py-0.5 lg:py-1 rounded-full shadow-lg">
                          {product.discountPercentage}% OFF
                        </div>
                      )}
                    </div>

                    {/* Product Info - Fixed Height */}
                    <div className="p-2.5 lg:p-4 bg-white flex flex-col flex-1">
                      <h3 className="text-xs lg:text-base font-bold !text-black mb-1.5 lg:mb-2 line-clamp-2 min-h-[2rem] lg:min-h-[3rem] group-hover:!text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 lg:gap-2 mt-auto">
                        <span className="text-base lg:text-xl font-bold text-primary">
                          ₹{product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-[10px] lg:text-sm text-gray-400 line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View More Link */}
              <div className="mt-5 text-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-brand-gradient text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  View More Deals
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

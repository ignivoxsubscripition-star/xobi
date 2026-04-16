'use client';

import Link from 'next/link';
import { FooterProps } from '@/components/types';

export default function Footer({ }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6 py-12 pb-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-white">Xobikart</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delivering essentials from local stores to your doorstep. Simple, fast, and reliable shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              {/* <li>
                <Link href="/seller/register" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Seller Onboarding
                </Link>
              </li> */}
              <li>
                <Link href="/about" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {/* <li>
                <Link href="/about" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li> */}
              <li>
                <Link href="/terms" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/chargeback-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Chargeback Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="text-gray-400 text-sm hover:text-primary transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-gray-400 text-sm">Send us a Message</span>
              </li> */}
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm">help@xobikart.com</span>
              </li>

              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-gray-400 text-sm">
                  <p>XOBICO TECHNOLOGIES PRIVATE LIMITED</p>
                  <p>104, Emarat Firdaus, Exibition Road,</p>
                  <p>Patna, Bihar - 80001</p>
                  <p>Contact: (+91) 76440 97773</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-white/10 mt-8 pt-4">
          <p className="text-center text-gray-400 text-xs">
            © {new Date().getFullYear()} Xobikart • XOBICO TECHNOLOGIES PRIVATE LIMITED • Patna
          </p>
        </div>
      </div>
    </footer>
  );
}

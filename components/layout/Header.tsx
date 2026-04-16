'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HeaderProps, NavItem } from '@/components/types';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const allNavigationItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Mobile Accessories', href: '/category/mobile-accessories' },
  { label: 'Home Appliance', href: '/category/home-kitchen' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

// Filter out specified navigation items as per requirements 2.1, 2.2, 2.3
const navigationItems: NavItem[] = allNavigationItems.filter(
  item => item.label !== 'Mobile Accessories' && item.label !== 'Home Appliance'
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  // Check if user is a seller
  useEffect(() => {
    const checkSellerStatus = () => {
      const sellerData = localStorage.getItem('sm_new_seller');
      setIsSeller(!!sellerData);
    };

    checkSellerStatus();

    // Listen for storage changes
    window.addEventListener('storage', checkSellerStatus);
    return () => window.removeEventListener('storage', checkSellerStatus);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="relative flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-20 hover:opacity-90 transition-opacity flex items-center">
            <Image
              src="/assets/logo.jpeg"
              alt="Xobikart Logo"
              width={180}
              height={48}
              priority
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
            />
          </Link>

          {/* Navigation and Right Actions - Combined */}
          <div className="hidden lg:flex items-center space-x-8 ml-auto">
            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[15px] font-medium text-gray-700 hover:text-primary transition-colors duration-300 relative group tracking-wide"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gradient transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Coin Balance */}


              {/* Cart Icon */}
              <Link
                href="/cart"
                className="p-2 text-gray-700 hover:text-primary transition-colors relative group"
                aria-label="Shopping Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Auth / Profile */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary focus:outline-none"
                  >
                    <div className="flex items-center space-x-3 mr-1">
                      {/* Coins Pill */}
                      {user.coins !== undefined && (
                        <div className="flex items-center space-x-1 bg-[#FFFBEA] border border-[#FFD700] px-3 py-1 rounded-full shadow-md">
                          <span className="text-xl">💰</span>
                          <span className="text-[#B7791F] font-bold text-sm">{user.coins.toFixed(1)}</span>
                        </div>
                      )}

                      {/* Membership Badge Pill */}
                      {/* Membership Badge Pill */}
                      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full shadow-md border ${(user.membershipTier || 'Free') === 'Gold' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                        (user.membershipTier || 'Free') === 'Silver' ? 'bg-gray-100 border-gray-300 text-gray-700' :
                          'bg-gray-50 border-gray-200 text-gray-600'
                        }`}>
                        <span className="text-lg">
                          {(user.membershipTier || 'Free') === 'Gold' ? '🥇' : (user.membershipTier || 'Free') === 'Silver' ? '🥈' : '🏷️'}
                        </span>
                        <span className="font-bold text-sm tracking-wide">{user.membershipTier || 'Free'}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="text-sm font-medium mr-2">{user.name.split(' ')[0]}</span>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold uppercase ring-2 ring-white shadow-md">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Signed in as<br />
                        <span className="font-bold truncate">{user.name}</span>
                      </div>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Your Profile
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Orders
                      </Link>
                      <Link href="/membership" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Membership Plans
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Seller Button */}
              {isSeller ? (
                <Link
                  href="/seller-dashboard"
                  className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-brand-gradient text-white text-[14px] font-semibold rounded-xl hover:scale-[1.02] hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                >
                  Seller Dashboard
                </Link>
              ) : false /* Hide Become a Seller for now: !user */ && (
                <Link
                  href="/seller/register"
                  className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-brand-gradient text-white text-[14px] font-semibold rounded-xl hover:scale-[1.02] hover:brightness-110 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                >
                  Become a Seller
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Cart Icon and Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className="p-2 text-gray-700 hover:text-primary transition-colors relative"
              aria-label="Shopping Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-gray-700 hover:text-primary transition-colors z-20"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-y-auto transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[calc(100vh-96px)] opacity-100 py-4 border-t border-gray-100' : 'max-h-0 opacity-0'
            }`}
        >
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[15px] text-gray-700 hover:text-primary hover:bg-gray-50 hover:pl-2 font-medium py-3 px-2 rounded-xl transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Cart Button */}
            <Link
              href="/cart"
              className="flex items-center justify-between text-[15px] text-gray-700 hover:text-primary hover:bg-gray-50 hover:pl-2 font-medium py-3 px-2 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span>Shopping Cart</span>
              </div>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile Section */}
            {user ? (
              <div className="pt-2 mt-2 border-t border-gray-200">
                {/* User Info */}
                <div className="flex items-center space-x-3 px-2 py-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{user.email}</p>

                    {/* Mobile Stats Pills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.coins !== undefined && (
                        <div className="flex items-center space-x-1 bg-[#FFFBEA] border border-[#FFD700] px-2 py-0.5 rounded-full shadow-md">
                          <span className="text-sm">💰</span>
                          <span className="text-[#B7791F] font-bold text-xs">{user.coins.toFixed(1)}</span>
                        </div>
                      )}

                      {/* Membership Badge Pill */}
                      <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full shadow-md border ${(user.membershipTier || 'Free') === 'Gold' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                        (user.membershipTier || 'Free') === 'Silver' ? 'bg-gray-100 border-gray-300 text-gray-700' :
                          'bg-gray-50 border-gray-200 text-gray-600'
                        }`}>
                        <span className="text-sm">{(user.membershipTier || 'Free') === 'Gold' ? '🥇' : (user.membershipTier || 'Free') === 'Silver' ? '🥈' : '🏷️'}</span>
                        <span className="font-bold text-xs tracking-wide">{user.membershipTier || 'Free'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Links */}
                <Link
                  href="/profile"
                  className="flex items-center space-x-3 text-[15px] text-gray-700 hover:text-primary hover:bg-gray-50 hover:pl-2 font-medium py-3 px-2 rounded-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <span>Your Profile</span>
                </Link>

                <Link
                  href="/orders"
                  className="flex items-center space-x-3 text-[15px] text-gray-700 hover:text-primary hover:bg-gray-50 hover:pl-2 font-medium py-3 px-2 rounded-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span>Your Orders</span>
                </Link>

                <Link
                  href="/membership"
                  className="flex items-center space-x-3 text-[15px] text-gray-700 hover:text-primary hover:bg-gray-50 hover:pl-2 font-medium py-3 px-2 rounded-xl transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.563.045.853.776.475 1.189l-4.169 4.381a.563.563 0 00-.153.554l1.18 5.666c.15.563-.591 1.056-1.07.662l-4.544-2.812a.563.563 0 00-.47 0l-4.544 2.811c-.48.335-1.222-.249-1.07-1.111l1.18-5.666a.563.563 0 00-.153-.554l-4.169-4.381c-.378-.413-.088-1.144.475-1.189l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <span>Membership Plans</span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center space-x-3 text-[15px] text-red-600 hover:text-red-700 hover:bg-red-50 hover:pl-2 font-medium py-3 px-2 rounded-xl transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 mt-2 border-t border-gray-200 space-y-2">
                <Link
                  href="/auth/login"
                  className="flex w-full items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                {isSeller ? (
                  <Link
                    href="/seller-dashboard"
                    className="flex w-full items-center justify-center px-4 py-3 bg-brand-gradient text-white text-[14px] font-bold uppercase tracking-wider rounded-xl hover:scale-[1.02] hover:brightness-110 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Seller Dashboard
                  </Link>
                ) : false /* Hide Become a Seller for now */ && (
                  <Link
                    href="/seller/register"
                    className="flex w-full items-center justify-center px-4 py-3 bg-brand-gradient text-white text-[14px] font-bold uppercase tracking-wider rounded-xl hover:scale-[1.02] hover:brightness-110 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Become a Seller
                  </Link>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
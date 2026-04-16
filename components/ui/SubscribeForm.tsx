'use client';

import { useState, FormEvent } from 'react';
import { SubscribeFormProps } from '@/components/types';

export default function SubscribeForm({ onSubmit }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(email);
    }

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      alert('Thank you for subscribing!');
    }, 500);
  };

  return (
    <section className="py-20 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Stay in the Loop
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive access to new product launches, special offers, and shopping tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative">
            <div className="flex-1 w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full bg-white/10 text-white text-[15px] border border-white/20 focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-gray-500 shadow-inner"
                aria-label="Email address"
                aria-invalid={error ? 'true' : 'false'}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-brand-gradient text-white text-[15px] font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? '...' : 'Get Notified'}
            </button>

            {error && (
              <p className="absolute -bottom-8 left-6 text-red-500 text-xs">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

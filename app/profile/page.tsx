'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F8F9FA] relative overflow-hidden flex flex-col">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="flex-grow flex items-center justify-center py-12 px-4 relative z-10">
          <div className="max-w-2xl w-full">
            {/* Main Profile Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 overflow-hidden">
              {/* Card Header with Gradient */}
              <div className="h-48 bg-gradient-to-r from-primary via-primary/90 to-secondary relative">
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-2xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
                      <div className="h-full w-full rounded-[1.25rem] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-primary text-4xl font-black">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 border-4 border-white rounded-full shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="pt-20 pb-12 px-8 text-center">
                <div className="mb-8">
                  <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">{user.name}</h1>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full">
                      {user.role === 'user' ? 'Member' : user.role}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                    <span className="text-sm font-medium text-gray-500 italic">{user.email}</span>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                  <div className="group p-5 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white rounded-xl shadow-md text-primary group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Full Name</p>
                        <p className="text-sm font-bold text-gray-800">{user.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-5 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white rounded-xl shadow-md text-primary group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Email Address</p>
                        <p className="text-sm font-bold text-gray-800">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group p-5 bg-gray-50/50 hover:bg-white rounded-2xl border border-transparent hover:border-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white rounded-xl shadow-md text-primary group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Mobile Number</p>
                        <p className="text-sm font-bold text-gray-800">{user.mobile || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
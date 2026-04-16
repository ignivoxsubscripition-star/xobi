'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Categories from '@/components/home/Categories';
import { Category } from '@/components/types';

export default function ShopPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse our collections and find exactly what you&apos;re looking for.</p>
                    </div> */}

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <Categories categories={categories} />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

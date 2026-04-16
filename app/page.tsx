'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ModernHeroBanner from '@/components/home/ModernHeroBanner';
import BudgetProducts from '@/components/home/BudgetProducts';
import Categories from '@/components/home/Categories';
import ProductGrid from '@/components/home/ProductGrid';
import SubscribeForm from '@/components/ui/SubscribeForm';
import { Category } from '@/components/types';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { products, loading: productsLoading } = useProducts();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Modern Hero Section */}
        <ModernHeroBanner products={products} />

        {/* Categories Section */}
        {categoriesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Categories categories={categories} />
        )}

        {/* Budget Products Section */}
        {productsLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <BudgetProducts products={products} />
        )}

        {/* Featured Products Section */}
        <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl sm:text-4xl text-dark mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">Handpicked deals just for you</p>
          </div>
          {productsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ProductGrid products={products.slice(0, 5)} />
          )}
        </section>

        {/* Newsletter Subscription Section */}
        <SubscribeForm />
      </main>
      <Footer />
    </>
  );
}

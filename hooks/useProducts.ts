'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/components/types';
import { products as staticProducts } from '@/data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/products', {
        cache: 'no-store', // Ensure we always get fresh data
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || staticProducts);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
      // Fallback to static products
      setProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refreshProducts,
  };
};
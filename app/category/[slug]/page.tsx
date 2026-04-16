'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { notFound, useParams } from 'next/navigation';
import { products as staticProducts } from '@/data/products';
import { Product, Category } from '@/components/types';
import ProductGrid from '@/components/home/ProductGrid';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [products, setProducts] = useState<Product[]>(staticProducts);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setCategoriesLoading(true);
                
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch('/api/products', { cache: 'no-store' }),
                    fetch('/api/categories', { cache: 'no-store' })
                ]);
                
                if (productsResponse.ok) {
                    const productsData = await productsResponse.json();
                    setProducts(productsData.products || staticProducts);
                } else {
                    setProducts(staticProducts);
                }

                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    const foundCategory = categoriesData.categories?.find((c: Category) => 
                        c.slug === slug || c.link.endsWith(`/${slug}`)
                    );
                    setCategory(foundCategory || null);
                } else {
                    setCategory(null);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setProducts(staticProducts);
                setCategory(null);
            } finally {
                setLoading(false);
                setCategoriesLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (categoriesLoading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </>
        );
    }

    if (!category) {
        return notFound();
    }

    // Filter products
    const categoryProducts = products.filter(p =>
        p.category.toLowerCase() === category.slug.toLowerCase() ||
        p.category.toLowerCase() === category.name.toLowerCase() ||
        (category.slug === 'fashion' && p.category === 'fashion') || // Fallback
        (category.slug === 'home-kitchen' && p.category === 'home-kitchen') ||
        (category.slug === 'mobile-accessories' && p.category === 'mobile-accessories')
    );

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
                        {category.description && (
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{category.description}</p>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : categoryProducts.length > 0 ? (
                        <ProductGrid products={categoryProducts} />
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

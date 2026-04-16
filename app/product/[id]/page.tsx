'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { products as staticProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useBuyNow } from '@/context/BuyNowContext';
import { useState, useEffect } from 'react';
import { Product } from '@/components/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage() {
    const params = useParams();
    const { addToCart } = useCart();
    const { setBuyNowItem } = useBuyNow();
    const router = useRouter();
    const [qty, setQty] = useState(1);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const productSlug = params.id as string;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                
                // First try to fetch from API
                const response = await fetch('/api/products', {
                    cache: 'no-store',
                });
                
                let products = staticProducts; // fallback
                
                if (response.ok) {
                    const data = await response.json();
                    products = data.products || staticProducts;
                }
                
                // Find product by slug or ID
                const foundProduct = products.find(p => 
                    p.link.endsWith(`/${productSlug}`) || p.id === productSlug
                );
                
                setProduct(foundProduct || null);
                
                // Get related products (same category or similar price range)
                if (foundProduct) {
                    const related = products
                        .filter(p => 
                            p.id !== foundProduct.id && (
                                p.category === foundProduct.category ||
                                Math.abs(p.price - foundProduct.price) < 100
                            )
                        )
                        .slice(0, 4);
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                // Fallback to static products
                const foundProduct = staticProducts.find(p => 
                    p.link.endsWith(`/${productSlug}`) || p.id === productSlug
                );
                setProduct(foundProduct || null);
                
                if (foundProduct) {
                    const related = staticProducts
                        .filter(p => 
                            p.id !== foundProduct.id && (
                                p.category === foundProduct.category ||
                                Math.abs(p.price - foundProduct.price) < 100
                            )
                        )
                        .slice(0, 4);
                    setRelatedProducts(related);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productSlug]);

    if (loading) {
        return (
            <>
                <Header />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </>
        );
    }

    if (!product) {
        return notFound();
    }

    const discount = product.originalPrice && product.price
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-primary">Shop</Link>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{product.category}</span>
                    </nav>

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden lg:flex gap-8 p-6 lg:p-8">
                        {/* Image Section */}
                        <div className="lg:w-1/2">
                            {/* Main Image */}
                            <div className="bg-gray-50 rounded-xl relative aspect-square overflow-hidden group">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {discount > 0 && (
                                    <div className="absolute top-4 left-4 bg-brand-gradient text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20">
                                        {discount}% OFF
                                    </div>
                                )}
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <svg className="w-6 h-6 text-primary mb-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-700">Timely Delivery</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <svg className="w-6 h-6 text-primary mb-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-700">Easy Returns</span>
                                </div>
                                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                    <svg className="w-6 h-6 text-primary mb-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-700">Secure Pay</span>
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="lg:w-1/2 flex flex-col mt-6 lg:mt-0">
                            {/* Category & Seller */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                                    {product.category}
                                </span>
                                {product.seller && (
                                    <span className="text-sm text-gray-600">
                                        by <span className="font-semibold text-gray-900">{product.seller}</span>
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>

                            {/* Rating & Reviews */}
                            {product.rating && (
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center bg-green-600 text-white px-2.5 py-1 rounded-xl text-sm font-bold">
                                            {product.rating} ★
                                        </div>
                                        <span className="text-gray-600 text-sm font-medium">
                                            {product.reviewCount?.toLocaleString()} ratings
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                                                }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price Section */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-xl text-gray-400 line-through">
                                                ₹{product.originalPrice.toLocaleString('en-IN')}
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                                Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">Inclusive of all taxes</p>
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.inStock ? (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold">In Stock</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold text-sm">Currently Unavailable</span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Product Details</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {product.description || 'High-quality product with excellent features. Perfect for your needs with great value for money.'}
                                </p>
                            </div>

                            {/* Quantity & Actions */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-gray-900">Quantity:</span>
                                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => setQty(Math.max(1, qty - 1))}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-50 font-bold transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-6 py-2 text-gray-900 font-bold border-x-2 border-gray-200 min-w-[4rem] text-center bg-gray-50">
                                            {qty}
                                        </span>
                                        <button
                                            onClick={() => setQty(qty + 1)}
                                            className="px-4 py-2 text-gray-700 hover:bg-gray-50 font-bold transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => addToCart(product, qty)}
                                        disabled={!product.inStock}
                                        className="flex-1 bg-brand-gradient text-white rounded-xl py-3.5 px-6 text-base font-bold hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => {
                                            setBuyNowItem(product, qty);
                                            router.push('/buy-now');
                                        }}
                                        disabled={!product.inStock}
                                        className="flex-1 bg-white border-2 border-primary text-primary rounded-xl py-3.5 px-6 text-base font-bold hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Buy Now
                                    </button>
                                </div>

                                {/* Wishlist Button */}
                                <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl text-gray-700 font-semibold hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-12">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
                                <Link href="/shop" className="text-primary hover:text-secondary font-semibold text-sm flex items-center gap-1">
                                    View All
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <Link
                                        key={relatedProduct.id}
                                        href={relatedProduct.link}
                                        className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        {/* Product Image */}
                                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                            <Image
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                fill
                                                className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            />
                                            {relatedProduct.discountPercentage && relatedProduct.discountPercentage > 0 && (
                                                <div className="absolute top-2 left-2 bg-brand-gradient text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                                                    {relatedProduct.discountPercentage}% OFF
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-3">
                                            <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                                                {relatedProduct.name}
                                            </h3>

                                            {/* Rating */}
                                            {relatedProduct.rating && (
                                                <div className="flex items-center gap-1 mb-2">
                                                    <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                                                        {relatedProduct.rating} ★
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        ({relatedProduct.reviewCount})
                                                    </span>
                                                </div>
                                            )}

                                            {/* Price */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-gray-900">
                                                    ₹{relatedProduct.price}
                                                </span>
                                                {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        ₹{relatedProduct.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <>
            <Header />
            <div className="bg-white">
                {/* Hero Section */}
                <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90 z-10" />
                    <Image
                        src="/assets/generated.avif"
                        alt="About Xobikart"
                        fill
                        className="object-cover"
                    />
                    <div className="relative z-20 text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                            About Xobikart
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light">
                            Redefining the online shopping experience for modern India.
                        </p>
                    </div>
                </section>

                <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
                        <div className="max-w-3xl mx-auto">
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
                                At Xobikart, we believe in the power of technology to connect people with the products they love.
                                Founded in 2024, we started with a simple goal: to make premium e-commerce accessible, reliable,
                                and enjoyable for everyone in India.
                            </p>
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-12">
                                We are obsessed with customer delight. From our carefully curated product selection to our
                                lightning-fast delivery network, every aspect of Xobikart is designed with you in mind.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-12 max-w-2xl mx-auto">
                            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">1M+</h3>
                                <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">Happy Customers</p>
                            </div>
                            <div className="bg-secondary/5 p-8 rounded-2xl border border-secondary/10">
                                <h3 className="text-4xl md:text-5xl font-bold text-secondary mb-2">50k+</h3>
                                <p className="text-gray-500 font-medium tracking-wide uppercase text-sm">Products</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">We don&apos;t just sell products; we deliver promises.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: 'Quality Assurance', icon: '✨', desc: 'Every product is handpicked and quality checked.' },
                                { title: 'Fast Delivery', icon: '🚀', desc: 'We deliver across 20,000+ pincodes in India.' },
                                { title: '24/7 Support', icon: '🎧', desc: 'Our support team is always here to help you.' },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow-md duration-300 border border-gray-100">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-3xl mb-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto bg-gradient-to-r from-dark to-gray-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start shopping?</h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">Join thousands of satisfied customers and experience the Xobikart difference today.</p>
                            <Link href="/shop" className="inline-block bg-brand-gradient text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                Explore Products
                            </Link>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

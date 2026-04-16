import Image from 'next/image';
import Link from 'next/link';
import { CategoriesProps } from '@/components/types';

export default function Categories({ categories }: CategoriesProps) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-base md:text-lg">Browse our collections</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-16 max-w-6xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group relative h-[240px] sm:h-[260px] md:h-[280px] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-8 text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide drop-shadow-lg">
                  {category.name}
                </span>
                <div className="h-1 w-12 bg-primary rounded-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />

                <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-white hover:text-primary transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 delay-200">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

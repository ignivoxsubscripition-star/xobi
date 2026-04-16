import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Category } from '@/components/types';

const CATEGORIES_FILE = join(process.cwd(), 'data', 'categories.json');

// Initialize categories file if it doesn't exist
function initializeCategoriesFile() {
  if (!existsSync(CATEGORIES_FILE)) {
    const defaultCategories: Category[] = [
      {
        id: '1',
        name: 'Electronics',
        slug: 'electronics',
        image: '/assets/generated.avif',
        link: '/category/electronics',
        description: 'Latest gadgets, mobiles, and electronic devices',
      },
      {
        id: '2',
        name: 'Fashion & Apparel',
        slug: 'fashion',
        image: '/assets/generated.avif',
        link: '/category/fashion',
        description: 'Trendy clothing, footwear, and accessories',
      },
      {
        id: '3',
        name: 'Home & Kitchen',
        slug: 'home-kitchen',
        image: '/assets/generated.avif',
        link: '/category/home-kitchen',
        description: 'Essentials for your home and kitchen',
      },
      {
        id: '4',
        name: 'Mobile Accessories',
        slug: 'mobile-accessories',
        image: '/assets/generated.avif',
        link: '/category/mobile-accessories',
        description: 'Cases, Chargers, and more for your smartphone',
      },
    ];
    writeFileSync(CATEGORIES_FILE, JSON.stringify({ categories: defaultCategories }, null, 2));
  }
}

function readCategories(): Category[] {
  try {
    initializeCategoriesFile();
    const data = readFileSync(CATEGORIES_FILE, 'utf8');
    const parsed = JSON.parse(data);
    return parsed.categories || [];
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

function writeCategories(categories: Category[]) {
  try {
    writeFileSync(CATEGORIES_FILE, JSON.stringify({ categories }, null, 2));
  } catch (error) {
    console.error('Error writing categories:', error);
    throw error;
  }
}

// GET - Fetch all categories
export async function GET() {
  try {
    const categories = readCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, image, description } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const categories = readCategories();
    
    // Check if slug already exists
    if (categories.some(cat => cat.slug === slug)) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      slug,
      image: image || '/assets/generated.avif',
      link: `/category/${slug}`,
      description: description || '',
    };

    categories.push(newCategory);
    writeCategories(categories);

    return NextResponse.json({ category: newCategory }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
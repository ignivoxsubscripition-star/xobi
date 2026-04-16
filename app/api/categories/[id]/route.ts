import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { Category } from '@/components/types';

const CATEGORIES_FILE = join(process.cwd(), 'data', 'categories.json');

function readCategories(): Category[] {
  try {
    if (!existsSync(CATEGORIES_FILE)) {
      return [];
    }
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

// GET - Fetch single category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categories = readCategories();
    const category = categories.find(cat => cat.id === params.id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ category });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const categoryIndex = categories.findIndex(cat => cat.id === params.id);
    
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if slug already exists (excluding current category)
    if (categories.some(cat => cat.slug === slug && cat.id !== params.id)) {
      return NextResponse.json(
        { error: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    const updatedCategory: Category = {
      ...categories[categoryIndex],
      name,
      slug,
      image: image || categories[categoryIndex].image,
      link: `/category/${slug}`,
      description: description || '',
    };

    categories[categoryIndex] = updatedCategory;
    writeCategories(categories);

    return NextResponse.json({ category: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const categories = readCategories();
    const categoryIndex = categories.findIndex(cat => cat.id === params.id);
    
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    categories.splice(categoryIndex, 1);
    writeCategories(categories);

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
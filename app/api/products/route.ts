import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/database';
import { Product } from '@/components/types';

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const products = getAllProducts();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'price', 'category'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Create product data
    const productData: Omit<Product, 'id'> = {
      name: body.name,
      price: Number(body.price),
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      discountPercentage: body.originalPrice && body.price 
        ? Math.round(((Number(body.originalPrice) - Number(body.price)) / Number(body.originalPrice)) * 100)
        : undefined,
      image: body.image || '/assets/generated.avif',
      images: body.images || [],
      category: body.category,
      description: body.description || '',
      rating: body.rating ? Number(body.rating) : undefined,
      reviewCount: body.reviewCount ? Number(body.reviewCount) : undefined,
      seller: body.seller || 'Admin Store',
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : true,
      tags: body.tags || [],
      link: '', // Will be set by createProduct function
    };
    
    const newProduct = createProduct(productData);
    
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
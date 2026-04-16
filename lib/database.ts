import fs from 'fs';
import path from 'path';
import { Product, Category } from '@/components/types';

interface DatabaseData {
  products: Product[];
  categories: Category[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'products.json');

// Ensure the data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read data from JSON file
export const readDatabase = (): DatabaseData => {
  try {
    ensureDataDirectory();
    
    if (!fs.existsSync(DB_PATH)) {
      // Create initial empty database
      const initialData: DatabaseData = { products: [], categories: [] };
      writeDatabase(initialData);
      return initialData;
    }
    
    const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading database:', error);
    return { products: [], categories: [] };
  }
};

// Write data to JSON file
export const writeDatabase = (data: DatabaseData): void => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database:', error);
    throw new Error('Failed to write to database');
  }
};

// Product operations
export const getAllProducts = (): Product[] => {
  const data = readDatabase();
  return data.products;
};

export const getProductById = (id: string): Product | null => {
  const data = readDatabase();
  return data.products.find(product => product.id === id) || null;
};

export const createProduct = (product: Omit<Product, 'id'>): Product => {
  const data = readDatabase();
  
  // Generate unique ID
  const newId = `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newProduct: Product = {
    ...product,
    id: newId,
    link: `/product/${newId}`,
  };
  
  data.products.push(newProduct);
  writeDatabase(data);
  
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const data = readDatabase();
  const productIndex = data.products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return null;
  }
  
  // Update product while preserving ID
  data.products[productIndex] = {
    ...data.products[productIndex],
    ...updates,
    id, // Ensure ID doesn't change
  };
  
  writeDatabase(data);
  return data.products[productIndex];
};

export const deleteProduct = (id: string): boolean => {
  const data = readDatabase();
  const initialLength = data.products.length;
  
  data.products = data.products.filter(product => product.id !== id);
  
  if (data.products.length < initialLength) {
    writeDatabase(data);
    return true;
  }
  
  return false;
};

// Category operations
export const getAllCategories = (): Category[] => {
  const data = readDatabase();
  return data.categories;
};

export const createCategory = (category: Omit<Category, 'id'>): Category => {
  const data = readDatabase();
  
  const newId = `c_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newCategory: Category = {
    ...category,
    id: newId,
  };
  
  data.categories.push(newCategory);
  writeDatabase(data);
  
  return newCategory;
};

export const updateCategory = (id: string, updates: Partial<Category>): Category | null => {
  const data = readDatabase();
  const categoryIndex = data.categories.findIndex(category => category.id === id);
  
  if (categoryIndex === -1) {
    return null;
  }
  
  data.categories[categoryIndex] = {
    ...data.categories[categoryIndex],
    ...updates,
    id,
  };
  
  writeDatabase(data);
  return data.categories[categoryIndex];
};

export const deleteCategory = (id: string): boolean => {
  const data = readDatabase();
  const initialLength = data.categories.length;
  
  data.categories = data.categories.filter(category => category.id !== id);
  
  if (data.categories.length < initialLength) {
    writeDatabase(data);
    return true;
  }
  
  return false;
};
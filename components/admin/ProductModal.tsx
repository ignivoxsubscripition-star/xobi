'use client';

import { useState, useEffect, useRef } from 'react';
import { Product, ProductTag } from '@/components/types';
import Image from 'next/image';

interface ProductModalProps {
  product?: Product | null;
  onClose: () => void;
  onSave: () => void;
}

export default function ProductModal({ product, onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    seller: '',
    rating: '',
    reviewCount: '',
    inStock: true,
    image: '',
    tags: [] as ProductTag[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showPasteHint, setShowPasteHint] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home-kitchen', label: 'Home & Kitchen' },
    { value: 'mobile-accessories', label: 'Mobile Accessories' },
    { value: 'beauty', label: 'Beauty' },
  ];

  const tagTypes = [
    { value: 'best-seller', label: 'Best Seller' },
    { value: 'new-arrival', label: 'New Arrival' },
    { value: 'combo-offer', label: 'Combo Offer' },
    { value: 'discount', label: 'Discount' },
  ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || '',
        category: product.category,
        description: product.description || '',
        seller: product.seller || '',
        rating: product.rating?.toString() || '',
        reviewCount: product.reviewCount?.toString() || '',
        inStock: product.inStock ?? true,
        image: product.image,
        tags: product.tags || [],
      });
    }
  }, [product]);

  // Add global paste event listener when modal is open
  useEffect(() => {
    const handleGlobalPaste = async (e: ClipboardEvent) => {
      // Only handle paste if modal is focused or if target is the drop area
      const target = e.target as HTMLElement;
      if (target.closest('.image-drop-area') || target.closest('.modal-content')) {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.indexOf('image') !== -1) {
            e.preventDefault();
            const file = item.getAsFile();
            if (file) {
              await handleFileUpload(file);
              return;
            }
          }
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        setShowPasteHint(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) {
        setShowPasteHint(false);
      }
    };

    document.addEventListener('paste', handleGlobalPaste);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('paste', handleGlobalPaste);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price.trim()) newErrors.price = 'Price is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.image) newErrors.image = 'Product image is required';

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) newErrors.price = 'Price must be a valid positive number';

    if (formData.originalPrice) {
      const originalPrice = parseFloat(formData.originalPrice);
      if (isNaN(originalPrice) || originalPrice <= 0) {
        newErrors.originalPrice = 'Original price must be a valid positive number';
      } else if (originalPrice <= price) {
        newErrors.originalPrice = 'Original price must be greater than current price';
      }
    }

    if (formData.rating) {
      const rating = parseFloat(formData.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        newErrors.rating = 'Rating must be between 0 and 5';
      }
    }

    if (formData.reviewCount) {
      const reviewCount = parseInt(formData.reviewCount);
      if (isNaN(reviewCount) || reviewCount < 0) {
        newErrors.reviewCount = 'Review count must be a valid positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const url = product ? `/api/products/${product.id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
          category: formData.category,
          description: formData.description,
          seller: formData.seller,
          rating: formData.rating ? parseFloat(formData.rating) : undefined,
          reviewCount: formData.reviewCount ? parseInt(formData.reviewCount) : undefined,
          inStock: formData.inStock,
          image: formData.image,
          tags: formData.tags,
        }),
      });

      if (response.ok) {
        onSave();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({ ...prev, image: data.url }));
        setErrors(prev => ({ ...prev, image: '' }));
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const items = e.clipboardData?.items;
    
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Check if the item is an image
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          await handleFileUpload(file);
          return;
        }
      }
    }
    
    // If no image found in clipboard, show a helpful message
    alert('No image found in clipboard. Please copy an image first.');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const addTag = (type: string, label: string) => {
    const newTag: ProductTag = { type: type as any, label };
    if (!formData.tags.some(tag => tag.type === type)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="modal-content bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-primary ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-primary ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-primary ${
                      errors.originalPrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-primary ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              {/* Seller */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller
                </label>
                <input
                  type="text"
                  value={formData.seller}
                  onChange={(e) => setFormData(prev => ({ ...prev, seller: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                  placeholder="Enter seller name"
                />
              </div>

              {/* Rating and Review Count */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-primary ${
                      errors.rating ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="4.5"
                    min="0"
                    max="5"
                    step="0.1"
                  />
                  {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Count
                  </label>
                  <input
                    type="number"
                    value={formData.reviewCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviewCount: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-xl focus:outline-none focus:border-primary ${
                      errors.reviewCount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="100"
                    min="0"
                  />
                  {errors.reviewCount && <p className="text-red-500 text-sm mt-1">{errors.reviewCount}</p>}
                </div>
              </div>

              {/* Stock Status */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">In Stock</span>
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image *
                </label>
                <div
                  className={`image-drop-area border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                    dragActive || showPasteHint
                      ? 'border-primary bg-primary/5' 
                      : errors.image 
                        ? 'border-red-500' 
                        : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onPaste={handlePaste}
                  tabIndex={0}
                >
                  {formData.image ? (
                    <div className="space-y-4">
                      <Image
                        src={formData.image}
                        alt="Product preview"
                        width={200}
                        height={200}
                        className="mx-auto rounded-xl object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-primary hover:text-secondary font-medium"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {uploading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <>
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-primary hover:text-secondary font-medium"
                            >
                              Upload an image
                            </button>
                            <p className="text-gray-500">drag and drop, or paste from clipboard</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500">PNG, JPG, WebP, AVIF up to 5MB</p>
                            <p className={`text-xs font-medium transition-colors ${
                              showPasteHint ? 'text-primary animate-pulse' : 'text-blue-600'
                            }`}>
                              💡 Copy image from Google → Paste here (Ctrl+V)
                            </p>
                            {showPasteHint && (
                              <p className="text-xs text-primary font-bold animate-bounce">
                                🎯 Ready to paste! Press V to paste image
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Tags
                </label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-gradient text-white"
                      >
                        {tag.label}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="ml-2 text-white hover:text-gray-200"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tagTypes.map(tagType => (
                      <button
                        key={tagType.value}
                        type="button"
                        onClick={() => addTag(tagType.value, tagType.label)}
                        disabled={formData.tags.some(tag => tag.type === tagType.value)}
                        className="px-3 py-1 text-xs border border-gray-300 rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        + {tagType.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-primary resize-vertical"
                  placeholder="Enter product description..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="px-6 py-2 bg-brand-gradient text-white rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
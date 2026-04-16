'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import productsData from '@/data/products.json';

const products = productsData.products;

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-12-10',
    status: 'delivered',
    total: products[0].price + products[3].price,
    items: [
      {
        id: products[0].id,
        name: products[0].name,
        image: products[0].image,
        price: products[0].price,
        quantity: 1,
      },
      {
        id: products[3].id,
        name: products[3].name,
        image: products[3].image,
        price: products[3].price,
        quantity: 1,
      },
    ],
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-12-08',
    status: 'shipped',
    total: products[1].price,
    items: [
      {
        id: products[1].id,
        name: products[1].name,
        image: products[1].image,
        price: products[1].price,
        quantity: 1,
      },
    ],
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-12-05',
    status: 'processing',
    total: products[5].price * 2,
    items: [
      {
        id: products[5].id,
        name: products[5].name,
        image: products[5].image,
        price: products[5].price,
        quantity: 2,
      },
    ],
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return 'Delivered';
    case 'shipped':
      return 'Shipped';
    case 'processing':
      return 'Processing';
    case 'pending':
      return 'Pending';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
    if (user) {
      // Simulate API call to fetch orders
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    }
  }, [user, isLoading, router]);

  if (isLoading || loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600 mt-1">Track and manage your orders</p>
              </div>
              <Link
                href="/shop"
                className="px-6 py-3 bg-brand-gradient text-white rounded-xl hover:bg-secondary transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">You haven&apos;t placed any orders yet. Start shopping to see your orders here.</p>
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-brand-gradient text-white rounded-xl hover:bg-secondary transition-colors font-medium"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusText(order.status)}
                        </span>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">₹{order.total.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-xl overflow-hidden relative">
                            <Image
                              src={item.image || '/assets/generated.avif'}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        {order.status === 'delivered' && (
                          <button className="text-sm text-primary hover:text-secondary font-medium">
                            Write Review
                          </button>
                        )}
                        {(order.status === 'pending' || order.status === 'processing') && (
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                            Cancel Order
                          </button>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                          View Details
                        </button>
                        {order.status === 'shipped' && (
                          <button className="text-sm text-primary hover:text-secondary font-medium">
                            Track Order
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className="text-sm text-primary hover:text-secondary font-medium">
                            Buy Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Back to Profile */}
          <div className="mt-8 text-center">
            <Link
              href="/profile"
              className="inline-flex items-center text-primary hover:text-secondary font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
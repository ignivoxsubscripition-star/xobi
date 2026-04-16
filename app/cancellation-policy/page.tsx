'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CancellationPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Cancellation Policy
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

              <div className="mb-10">
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Xobikart, we understand that plans change. This Cancellation Policy explains how you can cancel your order and the conditions that apply.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">1. Order Cancellation by Customer</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.1 Before Dispatch</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can cancel your order free of charge before it is dispatched. To cancel:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Log in to your Xobikart account</li>
                  <li>Go to &quot;My Orders&quot;</li>
                  <li>Select the order you wish to cancel</li>
                  <li>Click on &quot;Cancel Order&quot; and select a reason</li>
                  <li>Confirm cancellation</li>
                </ol>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once cancelled, you will receive a confirmation email, and the refund will be processed within 3-5 business days.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.2 After Dispatch</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once an order is dispatched, it cannot be cancelled. However, you can refuse delivery at the time of delivery or initiate a return after receiving the product as per our Refund Policy.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.3 Partial Cancellation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For orders containing multiple items, you can cancel individual items before dispatch. The refund will be processed for the cancelled items only.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">2. Order Cancellation by Xobikart</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to cancel orders in the following situations:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Product is out of stock or unavailable</li>
                  <li>Pricing or product information errors</li>
                  <li>Payment verification issues or failed transactions</li>
                  <li>Delivery address is unserviceable</li>
                  <li>Suspected fraudulent activity</li>
                  <li>Force majeure events (natural disasters, strikes, etc.)</li>
                  <li>Seller is unable to fulfill the order</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If we cancel your order, you will be notified via email/SMS, and a full refund will be processed within 3-5 business days.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">3. Refund for Cancelled Orders</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.1 Refund Timeline</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Refunds for cancelled orders will be processed as follows:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>UPI/Net Banking:</strong> 3-5 business days</li>
                  <li><strong>Credit/Debit Card:</strong> 5-7 business days</li>
                  <li><strong>Digital Wallets:</strong> 2-4 business days</li>
                  <li><strong>Cash on Delivery:</strong> Not applicable (no payment made)</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.2 Refund Amount</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The full order amount, including any applicable taxes and shipping charges, will be refunded to your original payment method.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">4. Non-Cancellable Orders</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Certain orders cannot be cancelled once placed:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Customized or personalized products</li>
                  <li>Perishable goods already prepared for delivery</li>
                  <li>Digital products and gift cards</li>
                  <li>Products marked as &quot;non-cancellable&quot; at the time of purchase</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">5. Cancellation Charges</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Xobikart does not charge any cancellation fees for orders cancelled before dispatch. However, excessive cancellations may result in account restrictions or suspension.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">6. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For assistance with order cancellations, please contact us:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> help@xobikart.com</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> (+91) 76440 97773</p>
                  <p className="text-gray-700"><strong>Address:</strong> XOBICO TECHNOLOGIES PRIVATE LIMITED, 104, Emarat Firdaus, Exibition Road, Patna, Bihar - 80001</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

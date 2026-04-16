'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Shipping & Delivery Policy
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

              <div className="mb-10">
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Xobikart, we are committed to delivering your orders safely and on time. This policy outlines our shipping and delivery procedures.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">1. Shipping Coverage</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We currently deliver to most locations across India. During checkout, you can verify if we deliver to your area by entering your PIN code. Some remote or restricted areas may not be serviceable.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">2. Delivery Timeline</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">2.1 Standard Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Standard delivery typically takes 3-7 business days depending on your location:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>Metro Cities:</strong> 3-4 business days</li>
                  <li><strong>Tier 2 Cities:</strong> 4-6 business days</li>
                  <li><strong>Tier 3 Cities & Rural Areas:</strong> 5-7 business days</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">2.2 Express Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Express delivery is available in select cities for an additional charge. Orders placed before 12 PM can be delivered within 1-2 business days. Express delivery availability will be shown during checkout.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">2.3 Same-Day Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Same-day delivery is available for select products in limited areas. Orders must be placed before 10 AM for same-day delivery. This service is subject to product and location availability.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">3. Shipping Charges</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Shipping charges are calculated based on:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Product weight and dimensions</li>
                  <li>Delivery location</li>
                  <li>Delivery speed (standard/express)</li>
                  <li>Order value</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Free Shipping:</strong> Orders above ₹499 qualify for free standard shipping to most locations. Some products or sellers may offer free shipping regardless of order value.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">4. Order Processing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Orders are typically processed within 1-2 business days. Processing time may vary based on:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Product availability</li>
                  <li>Seller location and processing capacity</li>
                  <li>Payment verification</li>
                  <li>Customization requirements</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You will receive an email/SMS notification once your order is dispatched with tracking details.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">5. Order Tracking</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once your order is dispatched, you can track it in real-time:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Log in to your Xobikart account</li>
                  <li>Go to &quot;My Orders&quot;</li>
                  <li>Click on &quot;Track Order&quot; for the specific order</li>
                  <li>View real-time tracking updates</li>
                </ol>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You will also receive SMS/email updates at key delivery milestones.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">6. Delivery Process</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.1 Delivery Attempts</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our delivery partner will make up to 3 delivery attempts. If all attempts fail, the order will be returned to the seller, and you will be notified. You may need to place a new order or contact customer support for assistance.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.2 Delivery Verification</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At the time of delivery:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Verify the package is sealed and undamaged</li>
                  <li>Check the product against your order details</li>
                  <li>Sign the delivery receipt or provide OTP for verification</li>
                  <li>Report any issues immediately to the delivery person</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.3 Contactless Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We offer contactless delivery where the package is left at your doorstep. You will receive an OTP or photo confirmation of delivery.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">7. Delivery Address</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Please ensure your delivery address is complete and accurate:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Include house/flat number, building name, and landmark</li>
                  <li>Provide correct PIN code</li>
                  <li>Add a working phone number for delivery coordination</li>
                  <li>Specify delivery instructions if needed (e.g., gate code, floor number)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Address changes are not possible once the order is dispatched. Incorrect addresses may result in delivery delays or failed deliveries.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">8. Delivery Delays</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  While we strive for timely delivery, delays may occur due to:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Weather conditions or natural disasters</li>
                  <li>Political unrest or strikes</li>
                  <li>Customs clearance (for international shipments)</li>
                  <li>Incorrect or incomplete address</li>
                  <li>Recipient unavailability</li>
                  <li>High order volumes during sale periods</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We will keep you informed of any significant delays and work to resolve them as quickly as possible.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">9. Damaged or Missing Items</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you receive a damaged or incorrect product, or if items are missing from your order:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Do not accept the delivery if the package is visibly damaged</li>
                  <li>If already accepted, take photos/videos immediately</li>
                  <li>Contact customer support within 24 hours</li>
                  <li>Provide order details and evidence of the issue</li>
                </ol>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We will arrange for a replacement or full refund as per our Refund Policy.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">10. International Shipping</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Currently, Xobikart only ships within India. We do not offer international shipping at this time. We are working to expand our services globally in the future.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">11. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For shipping and delivery queries, please contact us:
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

'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function DeliveryPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Delivery Policy
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

              <div className="mb-10">
                <p className="text-gray-700 leading-relaxed mb-4">
                  This Delivery Policy outlines the terms and conditions for the delivery of products purchased through Xobikart. Please read this policy carefully before placing an order.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">1. Delivery Commitment</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Xobikart is committed to delivering your orders in a timely and secure manner. We work with trusted logistics partners across India to ensure your products reach you safely. All delivery timelines mentioned are estimates and may vary based on factors beyond our control.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">2. Delivery Partners</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We partner with leading courier and logistics companies in India including:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Blue Dart</li>
                  <li>Delhivery</li>
                  <li>Ecom Express</li>
                  <li>DTDC</li>
                  <li>India Post</li>
                  <li>Local delivery partners for same-day delivery</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The delivery partner is assigned based on your location, product type, and delivery speed selected.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">3. Delivery Timeframes</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.1 Order Processing Time</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Orders are processed within 1-2 business days from the date of order confirmation. Business days exclude Sundays and public holidays. Orders placed on weekends or holidays will be processed on the next business day.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.2 Transit Time</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once dispatched, the estimated transit time is:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>Metro Cities (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad):</strong> 2-3 business days</li>
                  <li><strong>State Capitals & Major Cities:</strong> 3-5 business days</li>
                  <li><strong>Tier 2 & Tier 3 Cities:</strong> 4-6 business days</li>
                  <li><strong>Rural & Remote Areas:</strong> 5-8 business days</li>
                  <li><strong>North-East & Island Territories:</strong> 7-10 business days</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.3 Total Delivery Time</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Total delivery time = Order Processing Time + Transit Time. For example, an order to a metro city may take 3-5 business days in total (1-2 days processing + 2-3 days transit).
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">4. Delivery Slots and Scheduling</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">4.1 Standard Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Standard deliveries are typically made between 9:00 AM to 7:00 PM on business days. The delivery partner will attempt delivery during this window based on their route optimization.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">4.2 Scheduled Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For select products and locations, you can choose a preferred delivery slot:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Morning Slot: 9:00 AM - 12:00 PM</li>
                  <li>Afternoon Slot: 12:00 PM - 4:00 PM</li>
                  <li>Evening Slot: 4:00 PM - 7:00 PM</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Scheduled delivery may incur additional charges and is subject to availability.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">4.3 Weekend & Holiday Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Weekend delivery is available in select cities for an additional charge. Deliveries are not made on national holidays (Republic Day, Independence Day, Gandhi Jayanti, Diwali, Holi, etc.).
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">5. Delivery Attempts and Procedures</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.1 Delivery Attempts</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our delivery partner will make up to 3 delivery attempts:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>First Attempt:</strong> As per scheduled delivery date</li>
                  <li><strong>Second Attempt:</strong> Next business day</li>
                  <li><strong>Third Attempt:</strong> Following business day</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You will receive SMS/email notifications before each delivery attempt. If all three attempts fail, the order will be returned to the seller.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.2 Failed Delivery Reasons</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Common reasons for failed delivery include:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Customer not available at delivery address</li>
                  <li>Incorrect or incomplete address</li>
                  <li>Customer refused to accept delivery</li>
                  <li>Premises locked or inaccessible</li>
                  <li>Customer requested rescheduling</li>
                  <li>Unable to contact customer</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.3 Rescheduling Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can reschedule delivery by:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Contacting the delivery partner directly (number provided in SMS)</li>

                  <li>Using the &quot;Reschedule Delivery&quot; option in your order tracking page</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Rescheduling is subject to delivery partner availability and may extend the delivery timeline.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">6. Delivery Verification and Acceptance</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.1 Identity Verification</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For high-value orders (above ₹10,000), the delivery partner may request identity verification. Please keep a valid government-issued ID ready (Aadhaar, PAN Card, Driving License, Passport).
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.2 Package Inspection</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At the time of delivery, you have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Inspect the outer packaging for damage</li>
                  <li>Verify the product details match your order</li>
                  <li>Check for visible damage or defects (for open-box delivery)</li>
                  <li>Refuse delivery if package is tampered or damaged</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.3 Delivery Confirmation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Delivery is confirmed through:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>OTP Verification:</strong> Enter the OTP sent to your registered mobile number</li>
                  <li><strong>Digital Signature:</strong> Sign on the delivery partner&apos;s device</li>
                  <li><strong>Photo Confirmation:</strong> For contactless delivery, a photo of the delivered package</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.4 Refusing Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may refuse delivery if:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Package is visibly damaged or tampered</li>
                  <li>Wrong product delivered</li>
                  <li>Product is damaged or defective (for open-box delivery)</li>
                  <li>You no longer wish to purchase the product</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you refuse delivery, the product will be returned to the seller, and a refund will be processed as per our Refund Policy.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">7. Special Delivery Services</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">7.1 Installation Services</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For select products (appliances, furniture, electronics), we offer installation services:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Free installation for eligible products</li>
                  <li>Paid installation services available for other products</li>
                  <li>Installation scheduled within 24-48 hours of delivery</li>
                  <li>Certified technicians for all installations</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">7.2 White Glove Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For large or fragile items (furniture, large appliances), we offer white glove delivery:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Delivery to room of choice</li>
                  <li>Unpacking and assembly</li>
                  <li>Removal of packaging materials</li>
                  <li>Basic setup and demonstration</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">7.3 Contactless Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Contactless delivery is available for all orders. The delivery partner will:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Call you upon arrival</li>
                  <li>Place the package at your doorstep</li>
                  <li>Take a photo as proof of delivery</li>
                  <li>Send OTP for verification</li>
                  <li>Maintain social distancing</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">8. Unserviceable Areas</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strive to deliver across India, but some areas may be unserviceable due to:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Remote or inaccessible locations</li>
                  <li>Security restrictions (military areas, restricted zones)</li>
                  <li>Lack of courier service coverage</li>
                  <li>Natural disasters or emergencies</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can check serviceability by entering your PIN code during checkout. If your area is unserviceable, you will be notified before order confirmation.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">9. Delivery Issues and Resolution</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">9.1 Non-Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If your order shows as delivered but you haven&apos;t received it:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Check with family members or neighbors</li>
                  <li>Verify the delivery address in your order details</li>
                  <li>Check your mailbox or building reception</li>
                  <li>Contact the delivery partner using the tracking number</li>
                  <li>Report to our customer support within 24 hours</li>
                </ol>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We will investigate and resolve the issue within 48 hours. If the product is confirmed as lost, we will provide a full refund or replacement.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">9.2 Damaged Delivery</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you receive a damaged product:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Do not accept the delivery if damage is visible</li>
                  <li>If already accepted, take photos/videos immediately</li>
                  <li>Report to customer support within 24 hours</li>
                  <li>Provide order details and evidence of damage</li>
                </ol>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We will arrange for pickup and provide a replacement or full refund as per our Refund Policy.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">9.3 Wrong Product Delivered</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you receive a wrong or different product:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Do not use or open the product</li>
                  <li>Take photos of the product and packaging</li>
                  <li>Contact customer support immediately</li>
                  <li>We will arrange pickup and deliver the correct product</li>
                </ol>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">10. Force Majeure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Xobikart shall not be liable for delays or non-delivery due to circumstances beyond our reasonable control, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Natural disasters (floods, earthquakes, cyclones)</li>
                  <li>Pandemics or health emergencies</li>
                  <li>Political unrest, riots, or strikes</li>
                  <li>Government restrictions or lockdowns</li>
                  <li>Acts of terrorism or war</li>
                  <li>Severe weather conditions</li>
                  <li>Technical failures beyond our control</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In such cases, we will make reasonable efforts to fulfill your order as soon as possible and keep you informed of any delays.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">11. Customer Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To ensure smooth delivery, customers must:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Provide accurate and complete delivery address</li>
                  <li>Ensure someone is available to receive the delivery</li>
                  <li>Keep registered mobile number active and reachable</li>
                  <li>Respond to delivery partner&apos;s calls/messages</li>
                  <li>Provide access to delivery location</li>
                  <li>Inspect the package at the time of delivery</li>
                  <li>Report issues immediately</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">12. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For delivery-related queries or issues, please contact us:
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

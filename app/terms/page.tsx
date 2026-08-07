'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Terms & Conditions
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">1. Acceptance of Terms & Legal Compliance</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing and using the Xobikart platform operated by XOBICO TECHNOLOGIES PRIVATE LIMITED, you accept and agree to be bound by the terms and provisions of this agreement. This agreement is in accordance with the Information Technology Act, 2000 and rules thereunder as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">2. User Eligibility</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You must be at least 18 years of age to use our services. By using this platform, you represent and warrant that you have the right, authority, and capacity to enter into this agreement and to abide by all of the terms and conditions set forth herein.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">3. Product Information and Pricing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless otherwise stated. We reserve the right to modify prices at any time without prior notice.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">4. Order Acceptance and Cancellation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your order constitutes an offer to purchase products. We reserve the right to accept or reject your order for any reason, including but not limited to product availability, errors in pricing or product information, or issues identified by our fraud detection systems. You may cancel your order before it is dispatched as per our cancellation policy.
                </p>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">5. Payments</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.1 Payment Methods</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Customers may make payments using the payment options made available at checkout. Availability of payment methods may vary depending on the customer&apos;s location and the services offered.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.2 Payment Issues</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For any payment-related issues, including failed, pending, reversed, or disputed transactions, customers may contact Xobikart Customer Support. Resolution of such matters may involve coordination with the respective payment service provider and the issuing bank, subject to their policies and timelines.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.3 Refunds</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Refunds, where applicable, shall be processed in accordance with the Xobikart Refund Policy. The actual credit of refunded amounts depends on the processing timelines of the respective payment service provider and the customer&apos;s bank.
                </p>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">6. Seller Onboarding and Marketplace Operations</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.1 Seller Registration and KYC Verification</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Xobikart operates as a marketplace platform connecting buyers with registered local sellers/merchants. All sellers must complete a mandatory onboarding process including business registration, KYC verification, address proof, product compliance documentation, and bank account verification. This process typically takes 2-5 business days.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.2 Seller Responsibilities</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sellers registered on Xobikart platform are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Maintaining accurate product listings, descriptions, and pricing</li>
                  <li>Ensuring product quality, authenticity, and compliance with applicable laws</li>
                  <li>Timely order processing and fulfillment</li>
                  <li>Proper packaging and delivery of products to customers</li>
                  <li>Handling customer queries, complaints, and returns</li>
                  <li>Complying with tax regulations and remitting applicable taxes</li>
                  <li>Maintaining adequate inventory and updating stock availability</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">6.3 Platform Fees</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Xobikart charges sellers a commission on each successful transaction. The commission structure varies by product category and is clearly communicated during onboarding.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">7. Delivery Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Delivery timelines are estimates and may vary based on location, product availability, and other factors. We will make reasonable efforts to deliver within the estimated timeframe. Risk of loss and title for products pass to you upon delivery to the specified address.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">8. Returns, Refunds, and Chargebacks</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">8.1 Returns and Refunds</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Returns and refunds are subject to our Refund Policy. Perishable items, personal care items, and certain other products may not be eligible for return. Please refer to our detailed Refund Policy for complete information.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">8.2 Chargebacks and Payment Disputes</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In case of payment disputes or unauthorized transactions, customers may file a chargeback through their bank. However, we strongly encourage resolving issues through our customer support first. Filing false or fraudulent chargebacks may result in account suspension and legal action.
                </p>
              </div>

              {/* Section 9 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">9. Product Warranty Policies</h2>
                
                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">9.1 Manufacturer/Brand Warranty</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For products sold on the Xobikart platform carrying a manufacturer or brand warranty, the warranty is provided directly by the respective brand/manufacturer. Xobikart does not issue, service, or bear liability for these warranties.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">9.2 Warranty Duration & Coverage</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The specific warranty period (e.g., 6 Months, 1 Year, 2 Years) is listed on the respective product detail page. The warranty covers manufacturing defects under normal usage conditions. It does not cover wear and tear, accidental physical damage, liquid ingress, electrical surges, or unauthorized repair attempts.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">9.3 How to Claim Warranty</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To claim warranty services, customers should contact the authorized brand service center directly with their original purchase invoice. If assistance is needed to locate authorized service centers or request duplicate invoices, customers may contact Xobikart Customer Support.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">9.4 Non-Warranty Products</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Certain categories of products, including home decor, apparel, kitchen scrub pads, or items clearly marked &quot;No Warranty&quot; on the product listing page, do not qualify for manufacturer or brand warranty coverage.
                </p>
              </div>

              {/* Section 10 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">10. User Conduct</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree not to use the platform for any unlawful purpose or in any way that could damage, disable, or impair the platform. You shall not attempt to gain unauthorized access to any portion of the platform or any systems or networks connected to the platform.
                </p>
              </div>

              {/* Section 11 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">11. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All content on this platform, including but not limited to text, graphics, logos, images, and software, is the property of XOBICO TECHNOLOGIES PRIVATE LIMITED or its content suppliers and is protected by Indian and international copyright laws. Unauthorized use of any content may violate copyright, trademark, and other laws.
                </p>
              </div>

              {/* Section 12 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">12. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the maximum extent permitted by law, XOBICO TECHNOLOGIES PRIVATE LIMITED shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the platform. Our total liability shall not exceed the amount paid by you for the specific product or service giving rise to the claim.
                </p>
              </div>

              {/* Section 13 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">13. Governing Law and Jurisdiction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Patna, Bihar, India.
                </p>
              </div>

              {/* Section 14 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">14. Modifications to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the platform. Your continued use of the platform after any such changes constitutes your acceptance of the new terms.
                </p>
              </div>

              {/* Section 15 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">15. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For any questions regarding these terms, please contact us at:
                </p>
                <div className="bg-gray-50 rounded-xl p-6 mt-4">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> help@xobikart.com</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> (+91) 76440 97773</p>
                  <p className="text-gray-700"><strong>Address:</strong> XOBICO TECHNOLOGIES PRIVATE LIMITED, 104, Emarat Firdaus, Exibition Road, Patna, Bihar - 800001</p>
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

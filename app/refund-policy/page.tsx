'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Refund Policy
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

              {/* Introduction */}
              <div className="mb-10">
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Xobikart, we want you to be completely satisfied with your purchase. This Refund Policy outlines the conditions and procedures for returns and refunds on our platform.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">1. Return Eligibility</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.1 General Return Window</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Most products can be returned within 7 days of delivery. Electronics and appliances have a 3-day return window. The return period starts from the date of delivery as confirmed by our delivery partner.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.2 Conditions for Returns</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To be eligible for a return, products must meet the following conditions:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Product must be unused, unworn, and in original condition</li>
                  <li>Original packaging, tags, labels, and accessories must be intact</li>
                  <li>Product must not show signs of use, damage, or alteration</li>
                  <li>Invoice or proof of purchase must be provided</li>
                  <li>Product must not be on the non-returnable items list</li>
                </ul>

                {/* <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.3 Non-Returnable Items</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The following items cannot be returned:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Perishable goods (food items, fresh produce)</li>
                  <li>Personal care and hygiene products</li>
                  <li>Intimate apparel and innerwear</li>
                  <li>Products with tampered or broken seals</li>
                  <li>Customized or personalized products</li>
                  <li>Digital products and gift cards</li>
                  <li>Products marked as &quot;non-returnable&quot; at the time of purchase</li>
                </ul> */}
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">2. Return Process</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">2.1 Initiating a Return</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To initiate a return:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Log in to your Xobikart account</li>
                  <li>Go to &quot;My Orders&quot; and select the order you wish to return</li>
                  <li>Click on &quot;Return Item&quot; and select the reason for return</li>
                  <li>Upload photos of the product if required</li>
                  <li>Submit your return request</li>
                </ol>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">2.2 Return Approval</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once you submit a return request, our team will review it within 24-48 hours. You will receive an email notification regarding the approval or rejection of your return request. If approved, we will arrange for product pickup from your address.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">2.3 Product Pickup</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our delivery partner will schedule a pickup from your registered address. Please ensure the product is properly packed in its original packaging. The pickup is free of charge for eligible returns.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">2.4 Quality Check</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once we receive the returned product, our quality team will inspect it to verify that it meets the return conditions. This process typically takes 2-3 business days.
                </p>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">3. Refund Process</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.1 Refund Approval</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If the returned product passes our quality check, your refund will be approved. You will receive a confirmation email with refund details.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.2 Refund Methods</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Refunds will be processed through the original payment method:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>UPI/Net Banking:</strong> 3-5 business days</li>
                  <li><strong>Credit/Debit Card:</strong> 5-7 business days</li>
                  <li><strong>Digital Wallets:</strong> 2-4 business days</li>
                  <li><strong>Cash on Delivery:</strong> Bank transfer within 7-10 business days</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.3 Refund Amount</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The refund amount will include the product price and any applicable taxes. Shipping charges are non-refundable unless the return is due to a defective or incorrect product.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.4 Partial Refunds</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Partial refunds may be issued in the following cases:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Product shows signs of use or damage</li>
                  <li>Missing accessories or components</li>
                  <li>Packaging is damaged or incomplete</li>
                  <li>Product is returned after the specified return window</li>
                </ul>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">4. Exchanges</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We currently do not offer direct product exchanges. If you wish to exchange a product, please return the original item for a refund and place a new order for the desired product.
                </p>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">5. Damaged or Defective Products</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.1 Reporting Issues</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you receive a damaged, defective, or incorrect product, please report it within 24 hours of delivery by:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Taking clear photos/videos of the product and packaging</li>
                  <li>Contacting our customer support at support@xobikart.com</li>
                  <li>Providing your order number and issue details</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.2 Resolution</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For damaged or defective products, we will:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Arrange immediate pickup at no cost</li>
                  <li>Process a full refund including shipping charges</li>
                  <li>Offer a replacement if available</li>
                  <li>Expedite the refund process (typically 3-5 business days)</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">6. Seller-Specific Policies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a marketplace platform, some sellers may have additional return policies. These will be clearly mentioned on the product page. In case of conflict, the more customer-friendly policy will apply.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">7. Refund Rejection</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your refund request may be rejected if:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Product does not meet return eligibility criteria</li>
                  <li>Product is damaged due to misuse or negligence</li>
                  <li>Return request is made after the return window</li>
                  <li>Product is on the non-returnable items list</li>
                  <li>Quality check reveals discrepancies in the return claim</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In case of rejection, the product will be returned to you at your expense, or you may choose to have it disposed of.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">8. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For any questions or concerns regarding returns and refunds, please contact us:
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

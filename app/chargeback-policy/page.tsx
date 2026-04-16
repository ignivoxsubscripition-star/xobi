'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ChargebackPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Chargeback Policy
              </h1>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">

              <div className="mb-10">
                <p className="text-gray-700 leading-relaxed mb-4">
                  This Chargeback Policy explains how Xobikart handles payment disputes and chargebacks initiated through banks or payment providers.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">1. What is a Chargeback?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A chargeback is a reversal of a credit card or debit card transaction initiated by the cardholder through their bank. It is a consumer protection mechanism designed to protect customers from unauthorized transactions, fraud, or merchant disputes.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">2. When to File a Chargeback</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Chargebacks should only be filed for legitimate reasons such as:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Unauthorized or fraudulent transaction</li>
                  <li>Product not received after confirmed delivery timeline</li>
                  <li>Significantly different product than described</li>
                  <li>Duplicate charges for the same transaction</li>
                  <li>Charged incorrect amount</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">3. Before Filing a Chargeback</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>We strongly encourage you to contact us first before filing a chargeback.</strong> Most issues can be resolved quickly through our customer support:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Email: support@xobikart.com</li>

                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Resolving issues directly with us is typically faster than the chargeback process, which can take 60-90 days.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">4. Chargeback Process</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">4.1 Customer Initiates Chargeback</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you decide to file a chargeback, contact your bank or card issuer and provide them with:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Transaction details (date, amount, merchant name)</li>
                  <li>Reason for the chargeback</li>
                  <li>Supporting documentation (order confirmation, communication records)</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">4.2 Xobikart Response</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When we receive a chargeback notification, we will:
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Review the transaction and order details</li>
                  <li>Gather evidence (delivery confirmation, communication logs, product details)</li>
                  <li>Submit our response to the bank within the required timeframe</li>
                  <li>Attempt to contact you to resolve the issue</li>
                </ol>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">4.3 Bank Decision</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The bank will review evidence from both parties and make a final decision. This process typically takes 60-90 days. The decision may be:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>In favor of customer:</strong> Chargeback is upheld, funds returned to customer</li>
                  <li><strong>In favor of merchant:</strong> Chargeback is reversed, funds returned to Xobikart</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">5. Responsibility and Liability</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.1 Marketplace Model</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a marketplace platform, responsibility for chargebacks is distributed as follows:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>Seller-Related Issues:</strong> Sellers are primarily responsible for chargebacks arising from product quality, delivery failures, or misrepresentation</li>
                  <li><strong>Platform Issues:</strong> Xobikart is responsible for chargebacks due to payment processing errors or technical glitches</li>
                  <li><strong>Customer Fraud:</strong> Customers filing fraudulent chargebacks will face account termination and potential legal action</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.2 Seller Liability</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sellers on our platform are liable for chargebacks related to their products or services. Chargeback amounts and associated fees will be deducted from seller settlements. Excessive chargebacks may result in seller account suspension.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">5.3 Seller Liability for Chargebacks and Fraud</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In a marketplace transaction, the seller shall bear full responsibility and financial liability for all chargebacks, refunds, and fraud-related issues arising from their products or transactions on the Xobikart platform.
                </p>

                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Seller Responsibilities:</strong>
                </p>
                <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>The seller is solely responsible for chargebacks resulting from non-delivery, delayed delivery, defective products, or products not matching the description.</li>
                  <li>The seller shall bear the full transaction amount and any applicable chargeback or processing fees imposed by banks or payment gateways.</li>
                  <li>Any refunds initiated due to seller-side issues shall be the responsibility of the seller and may be adjusted against future settlements.</li>
                  <li>In cases of fraud attributable to the seller, the seller agrees to indemnify and hold harmless Xobikart and XOBICO TECHNOLOGIES PRIVATE LIMITED from all losses, penalties, and claims.</li>
                </ol>

                <p className="text-gray-700 leading-relaxed mb-4 mt-6">
                  Upon request by Xobikart, payment partners, banks, or regulatory authorities, the seller must promptly provide complete and accurate documentation including:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Complete seller details and business information</li>
                  <li>Transaction records and payment receipts</li>
                  <li>Invoices and billing documentation</li>
                  <li>Proof of delivery with tracking information</li>
                  <li>Product descriptions and specifications</li>
                  <li>Customer communication records</li>
                </ul>

                <p className="text-gray-700 leading-relaxed mb-4">
                  Failure to provide required documentation or repeated chargeback incidents may result in immediate account suspension, withholding of settlements, and potential legal action to recover losses.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">6. Fraudulent Chargebacks</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Filing false or fraudulent chargebacks is a serious offense. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Claiming non-receipt of delivered products</li>
                  <li>Falsely claiming product defects</li>
                  <li>Keeping products and claiming refunds</li>
                  <li>Disputing legitimate transactions</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Consequences of fraudulent chargebacks:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Immediate account suspension or termination</li>
                  <li>Blacklisting from future purchases</li>
                  <li>Legal action and recovery of losses</li>
                  <li>Reporting to credit bureaus and law enforcement</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">7. Chargeback Fees</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Banks and payment processors charge fees for processing chargebacks (typically ₹500-₹1500 per chargeback). These fees are non-refundable even if the chargeback is resolved in the merchant&apos;s favor. In cases of fraudulent chargebacks, we reserve the right to recover these fees from the customer.
                </p>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">8. Prevention Measures</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To minimize chargebacks, we implement:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Clear product descriptions and images</li>
                  <li>Transparent pricing and shipping information</li>
                  <li>Order confirmation and tracking updates</li>
                  <li>Responsive customer support</li>
                  <li>Secure payment processing with fraud detection</li>
                  <li>Delivery confirmation with signatures/OTP</li>
                  <li>Comprehensive transaction records</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">9. Alternative Dispute Resolution</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Before resorting to chargebacks, consider these alternatives:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>Email Support:</strong> Contact our support team for assistance</li>
                  <li><strong>Return/Refund:</strong> Use our standard return and refund process</li>
                  <li><strong>Replacement:</strong> Request a replacement for defective products</li>
                  <li><strong>Store Credit:</strong> Accept store credit for future purchases</li>
                </ul>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">10. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For any payment disputes or chargeback-related queries, please contact us immediately:
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

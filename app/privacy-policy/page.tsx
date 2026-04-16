'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Privacy Policy
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
                  At Xobikart, operated by XOBICO TECHNOLOGIES PRIVATE LIMITED, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>
              </div>

              {/* Section 1 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">1. Information We Collect</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.1 Personal Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect personal information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Name, email address, phone number</li>
                  <li>Delivery address and billing information</li>
                  <li>Payment information (processed securely through payment gateways)</li>
                  <li>Account credentials (username and password)</li>
                  <li>Profile information and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.2 Automatically Collected Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you access our platform, we automatically collect certain information:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, click patterns)</li>
                  <li>Location data (with your permission)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">1.3 Information from Third Parties</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may receive information from third-party services such as payment processors, delivery partners, and social media platforms when you choose to connect your accounts.
                </p>
              </div>

              {/* Section 2 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Processing and fulfilling your orders</li>
                  <li>Communicating with you about orders, deliveries, and customer service</li>
                  <li>Personalizing your shopping experience</li>
                  <li>Improving our platform and services</li>
                  <li>Sending promotional offers and marketing communications (with your consent)</li>
                  <li>Detecting and preventing fraud and security threats</li>
                  <li>Complying with legal obligations and regulations</li>
                  <li>Analyzing usage patterns and trends</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">3. Information Sharing and Disclosure</h2>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.1 With Sellers and Service Providers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We share your information with sellers to fulfill your orders and with service providers who assist us in operating our platform, including payment processors, delivery partners, and technology service providers.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.2 Legal Requirements</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety, or that of our users or the public.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.3 Business Transfers</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
                </p>

                <h3 className="text-xl font-semibold text-dark mb-3 mt-6">3.4 With Your Consent</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may share your information with third parties when you have given us explicit consent to do so.
                </p>
              </div>

              {/* Section 4 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">4. Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>256-bit SSL/TLS encryption for data transmission</li>
                  <li>Secure data storage with encryption at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection and privacy</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>

              {/* Section 5 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">5. Your Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To exercise these rights, please contact us at support@xobikart.com.
                </p>
              </div>

              {/* Section 6 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small data files stored on your device that help us:
                </p>
                <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our platform</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Analyze platform performance and user behavior</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our platform.
                </p>
              </div>

              {/* Section 7 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">7. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </div>

              {/* Section 8 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">8. Children&apos;s Privacy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our platform is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              {/* Section 9 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">9. Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
                </p>
              </div>

              {/* Section 10 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our platform and updating the &quot;Last Updated&quot; date. Your continued use of the platform after such changes constitutes your acceptance of the updated policy.
                </p>
              </div>

              {/* Section 11 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-dark mb-4">11. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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

import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        
        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-blue max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Weekly Allowance Tracker ("we," "our," or "us"). We are committed to protecting your personal 
              information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and 
              safeguard your information when you use our application.
            </p>
            <p className="text-gray-700">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
              please do not access the application.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 mb-4">We collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Register for an account</li>
              <li>Log in using email and password</li>
              <li>Log in using third-party services (Google, Facebook)</li>
              <li>Use the application features</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Information Collected</h3>
            <p className="text-gray-700 mb-4">The personal information we collect may include:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Account Data:</strong> Email address, name, profile picture (if using social login)</li>
              <li><strong>Financial Data:</strong> Allowance situations, cycles, and entries you create (amounts, descriptions, dates)</li>
              <li><strong>Authentication Data:</strong> Login credentials (encrypted passwords) or OAuth tokens</li>
              <li><strong>Usage Data:</strong> Settings, preferences, and application usage patterns</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">2.3 Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">When you use the application, we may automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Device information (type, operating system)</li>
              <li>Log data (access times, pages viewed)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use your personal information for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Account Management:</strong> Create and manage your account, authenticate your identity</li>
              <li><strong>Service Provision:</strong> Provide and maintain the allowance tracking functionality</li>
              <li><strong>Data Synchronization:</strong> Sync your data across devices when using cloud storage</li>
              <li><strong>Communication:</strong> Send you important updates, security alerts, and support messages</li>
              <li><strong>Improvement:</strong> Analyze usage to improve our application and user experience</li>
              <li><strong>Security:</strong> Detect, prevent, and address technical issues and fraudulent activity</li>
            </ul>
          </section>

          {/* Third-Party Authentication */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Third-Party Authentication (OAuth)</h2>
            <p className="text-gray-700 mb-4">
              We offer authentication through third-party services (Google and Facebook). When you choose to log in 
              using these services:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>We receive basic profile information (name, email, profile picture) from the provider</li>
              <li>We do not receive or store your password for these services</li>
              <li>The authentication is handled securely through OAuth 2.0 protocol</li>
              <li>You can revoke our access at any time through your Google or Facebook account settings</li>
            </ul>
            <p className="text-gray-700">
              Please review the privacy policies of Google and Facebook to understand how they handle your data.
            </p>
          </section>

          {/* Data Storage and Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Storage and Security</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">5.1 Storage Options</h3>
            <p className="text-gray-700 mb-4">Your data can be stored in two ways:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Local Storage:</strong> When using the app offline, data is stored locally on your device</li>
              <li><strong>Cloud Storage:</strong> When logged in, data is stored securely in Supabase cloud infrastructure</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">5.2 Security Measures</h3>
            <p className="text-gray-700 mb-4">We implement industry-standard security measures:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Encryption in transit (HTTPS/TLS)</li>
              <li>Encrypted password storage (bcrypt hashing)</li>
              <li>Row Level Security (RLS) policies to isolate user data</li>
              <li>Secure authentication tokens (JWT)</li>
              <li>Regular security updates and monitoring</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do NOT sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Service Providers:</strong> With Supabase (our database provider) to provide cloud storage</li>
              <li><strong>Legal Obligations:</strong> If required by law or to protect our legal rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition (you will be notified)</li>
              <li><strong>With Your Consent:</strong> For any other purpose with your explicit consent</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Privacy Rights</h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account and all associated data</li>
              <li><strong>Data Portability:</strong> Export your data in a machine-readable format</li>
              <li><strong>Opt-out:</strong> Decline certain data processing activities</li>
              <li><strong>Revoke Consent:</strong> Withdraw consent for data processing at any time</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, please go to Settings → Delete Account, or contact us at the email below.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information only for as long as necessary to provide our services and fulfill 
              the purposes outlined in this privacy policy.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Active account data is retained while your account is active</li>
              <li>Upon account deletion, all personal data is immediately and permanently deleted</li>
              <li>Some data may be retained for legal compliance (e.g., transaction records for tax purposes)</li>
              <li>Anonymized, aggregated data may be retained for analytics</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700">
              Our application is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your child 
              has provided us with personal information, please contact us, and we will delete such information.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">We use cookies and similar tracking technologies to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Maintain your login session</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns</li>
              <li>Improve application performance</li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can control cookies through your browser settings, but disabling them may limit functionality.
            </p>
          </section>

          {/* International Users */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and stored on servers located outside your country of residence. 
              We ensure appropriate safeguards are in place to protect your data in compliance with applicable data 
              protection laws.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the 
              new privacy policy on this page and updating the "Last updated" date. We encourage you to review this 
              privacy policy periodically for any changes.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions or concerns about this privacy policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-900 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@your-domain.com" className="text-blue-600 hover:underline">
                  privacy@your-domain.com
                </a>
              </p>
              <p className="text-gray-900">
                <strong>Data Deletion:</strong>{' '}
                <Link to="/data-deletion" className="text-blue-600 hover:underline">
                  View data deletion instructions
                </Link>
              </p>
            </div>
          </section>

          {/* GDPR/CCPA */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Additional Rights for EU and California Residents</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">14.1 GDPR (EU Residents)</h3>
            <p className="text-gray-700 mb-4">
              If you are located in the European Economic Area (EEA), you have additional rights under GDPR:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">14.2 CCPA (California Residents)</h3>
            <p className="text-gray-700 mb-4">
              If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to say no to the sale of personal information</li>
              <li>Right to access your personal information</li>
              <li>Right to delete your personal information</li>
              <li>Right to equal service and price, even if you exercise your privacy rights</li>
            </ul>
          </section>

          {/* Navigation */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

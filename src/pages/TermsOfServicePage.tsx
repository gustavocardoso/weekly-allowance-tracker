import { Link } from 'react-router-dom';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Terms of Service
        </h1>
        
        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-blue max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Weekly Allowance Tracker. These Terms of Service ("Terms") govern your use of our application. 
              By accessing or using our application, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700">
              This application is provided for <strong>educational purposes only</strong>. It is designed to help users 
              learn about personal finance management and develop good financial habits.
            </p>
          </section>

          {/* Educational Purpose */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Educational Purpose</h2>
            <p className="text-gray-700 mb-4">
              Weekly Allowance Tracker is an educational tool intended to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Help users track personal allowances and expenses</li>
              <li>Teach basic financial management concepts</li>
              <li>Provide a safe environment to practice budgeting skills</li>
              <li>Demonstrate data visualization and personal finance tracking</li>
            </ul>
            <p className="text-gray-700 mt-4">
              This application is NOT a financial advisor, banking service, or professional financial tool. 
              It should not be used for commercial purposes or relied upon for actual financial decisions.
            </p>
          </section>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
            <p className="text-gray-700 mb-4">
              To use certain features of the application, you may need to create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">When using our application, you agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Use the application only for lawful and educational purposes</li>
              <li>Not attempt to hack, disrupt, or damage the application</li>
              <li>Not upload malicious code or harmful content</li>
              <li>Not use the application for any commercial purposes</li>
              <li>Not attempt to access other users' data</li>
              <li>Not impersonate others or create fake accounts</li>
            </ul>
          </section>

          {/* Privacy and Data */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Collection</h2>
            <p className="text-gray-700 mb-4">
              <strong>Important:</strong> This application is for educational purposes and operates with the following data practices:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>No Commercial Data Collection:</strong> We do not collect user data for commercial purposes</li>
                <li><strong>No Third-Party Sharing:</strong> We do not sell or share your data with third parties</li>
                <li><strong>No Marketing:</strong> We do not use your data for advertising or marketing</li>
                <li><strong>Educational Use Only:</strong> Data is stored solely to provide the tracking functionality</li>
              </ul>
            </div>
            <p className="text-gray-700">
              For more details, please read our{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The application, including its design, code, and content, is provided for educational purposes. 
            </p>
            <p className="text-gray-700">
              Your personal data (allowances, cycles, entries) remains your property. We claim no ownership 
              over your data and you may export or delete it at any time.
            </p>
          </section>

          {/* Service Availability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              This is an educational project and we make no guarantees about:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Continuous availability of the service</li>
              <li>Absence of errors or bugs</li>
              <li>Data backup or recovery</li>
              <li>Future updates or maintenance</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We reserve the right to modify, suspend, or discontinue the application at any time without notice.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              This application is provided "AS IS" for educational purposes only. To the fullest extent permitted by law:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>We make no warranties, express or implied</li>
              <li>We are not liable for any data loss or corruption</li>
              <li>We are not liable for any financial decisions made based on the application</li>
              <li>We are not responsible for errors in calculations or tracking</li>
              <li>Your use of the application is at your own risk</li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-gray-700">
                <strong>Important:</strong> This application is a learning tool only. Do not rely on it for actual financial 
                decisions, banking, or professional financial management. Always consult qualified professionals for 
                financial advice.
              </p>
            </div>
          </section>

          {/* Age Restrictions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Age Restrictions</h2>
            <p className="text-gray-700">
              You must be at least 13 years old to use this application. If you are between 13 and 18 years old, 
              you must have permission from a parent or guardian. Users under 13 are not permitted to create accounts 
              or use the service.
            </p>
          </section>

          {/* User Content */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. User Content and Data</h2>
            <p className="text-gray-700 mb-4">
              You retain all rights to the data you create in the application (situations, cycles, entries). By using 
              the application, you grant us permission to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Store your data to provide the service</li>
              <li>Display your data back to you</li>
              <li>Sync your data across your devices (if using cloud storage)</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We will NOT use your data for any purpose beyond providing the educational tracking functionality.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Account Termination</h2>
            <p className="text-gray-700 mb-4">
              You may terminate your account at any time by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Going to Settings and clicking "Delete Account"</li>
              <li>Following the instructions on our{' '}
                <Link to="/data-deletion" className="text-blue-600 hover:underline">
                  Data Deletion page
                </Link>
              </li>
            </ul>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate accounts that violate these Terms, though we will make 
              reasonable efforts to notify you first.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms from time to time. We will notify you of any material changes by updating 
              the "Last updated" date at the top of this page. Your continued use of the application after changes 
              constitutes acceptance of the updated Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law</h2>
            <p className="text-gray-700">
              These Terms are governed by and construed in accordance with applicable laws. Any disputes shall be 
              resolved through good faith negotiation first, and if necessary, through appropriate legal channels 
              in the applicable jurisdiction.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <p className="text-gray-900 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:support@your-domain.com" className="text-blue-600 hover:underline">
                  support@your-domain.com
                </a>
              </p>
            </div>
          </section>

          {/* Severability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
            <p className="text-gray-700">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
              limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain 
              in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Entire Agreement</h2>
            <p className="text-gray-700 mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and us 
              regarding the use of the application.
            </p>
            <p className="text-gray-700">
              By using Weekly Allowance Tracker, you acknowledge that you have read, understood, and agree to be 
              bound by these Terms of Service.
            </p>
          </section>

          {/* Navigation */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex justify-between items-center">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            
            <Link
              to="/privacy"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View Privacy Policy →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

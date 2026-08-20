import { Link } from 'react-router-dom';

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Data Deletion Instructions
        </h1>

        <div className="prose prose-blue max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            We respect your privacy and your right to control your personal data.
            Follow the instructions below to request deletion of your data from Weekly Allowance Tracker.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            How to Delete Your Account and Data
          </h2>

          <ol className="space-y-4 text-gray-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <div>
                <strong>Log in to your account</strong>
                <p className="mt-1">Access Weekly Allowance Tracker and sign in with your credentials.</p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <div>
                <strong>Go to Settings</strong>
                <p className="mt-1">Click on the Settings icon in the navigation menu.</p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <div>
                <strong>Scroll to Account Management</strong>
                <p className="mt-1">Find the "Delete Account" section at the bottom of the Settings page.</p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <div>
                <strong>Click "Delete Account"</strong>
                <p className="mt-1">Confirm that you want to permanently delete your account and all associated data.</p>
              </div>
            </li>
          </ol>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Warning:</strong> This action is permanent and cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            What Data Will Be Deleted?
          </h2>

          <p className="text-gray-700 mb-4">
            When you delete your account, the following data will be permanently removed:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Your profile information (name, email, profile picture)</li>
            <li>All situations you created</li>
            <li>All cycles and financial entries</li>
            <li>Settings and preferences</li>
            <li>Authentication data</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Timeline
          </h2>

          <p className="text-gray-700">
            Your data will be deleted <strong>immediately and permanently</strong> upon confirmation.
            This process cannot be reversed.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Alternative: Contact Us
          </h2>

          <p className="text-gray-700 mb-4">
            If you prefer to request data deletion via email or have any questions, you can contact us at:
          </p>

          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-gray-900 font-mono">
              Email: <a href="mailto:privacy@your-domain.com" className="text-blue-600 hover:underline">
                privacy@your-domain.com
              </a>
            </p>
          </div>

          <p className="text-gray-700 mt-4">
            We will process your request within <strong>30 days</strong> and send you a confirmation email.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
            Data Retention
          </h2>

          <p className="text-gray-700">
            We may retain certain information as required by law or for legitimate business purposes,
            such as fraud prevention and legal compliance. However, all personal and identifiable data
            will be permanently deleted.
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
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

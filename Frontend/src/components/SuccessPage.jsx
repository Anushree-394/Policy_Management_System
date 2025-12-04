import React from 'react';
import PropTypes from 'prop-types';
import { FiCheckCircle, FiDownload, FiHome } from 'react-icons/fi';

const SuccessPage = ({ onDownload, onGoToDashboard, downloadDisabled = false }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4">
            <FiCheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Policy is Active!
        </h1>
        <p className="text-gray-600 mb-8">
          Congratulations! Your policy has been successfully generated and is now active.
          You can download your policy certificate below.
        </p>

        <div className="space-y-4">
          <button
            onClick={onDownload}
            disabled={downloadDisabled}
            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
              downloadDisabled
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            }`}
            aria-disabled={downloadDisabled}
          >
            <FiDownload className="mr-2 h-5 w-5" />
            {downloadDisabled ? 'Preparing Download...' : 'Download Policy Certificate (PDF)'}
          </button>

          <button
            onClick={onGoToDashboard}
            className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FiHome className="mr-2 h-5 w-5" />
            Go to Dashboard
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at support@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

SuccessPage.propTypes = {
  onDownload: PropTypes.func,
  onGoToDashboard: PropTypes.func,
  downloadDisabled: PropTypes.bool
};

// Default handlers for demo purposes
SuccessPage.defaultProps = {
  onDownload: () => console.log('Downloading policy...'),
  onGoToDashboard: () => window.location.href = '/'
};

export default SuccessPage;

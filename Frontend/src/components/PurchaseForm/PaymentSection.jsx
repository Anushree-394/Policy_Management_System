import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiCreditCard, FiLoader } from 'react-icons/fi';

/**
 * Payment Section Component
 * @param {Object} props - Component props
 * @param {boolean} props.isProcessing - Whether the form is being processed
 * @param {Function} props.onSubmitPurchase - Callback when form is submitted
 * @param {Object} props.formData - Form data from parent component
 * @param {File} props.kycFile - KYC file from parent component
 */
const PaymentSection = ({ isProcessing, onSubmitPurchase, formData, kycFile }) => {
  const [paymentData, setPaymentData] = useState({
    card_number: '',
    expiry: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number (add space every 4 digits)
    if (name === 'card_number') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .trim();
      
      setPaymentData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } 
    // Format expiry date (MM/YY)
    else if (name === 'expiry') {
      let formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substring(0, 5);
      
      setPaymentData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }
    // Format CVV (only numbers, max 4 digits)
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 4);
      setPaymentData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    }

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Card number validation (16 digits)
    if (!paymentData.card_number.replace(/\s/g, '').match(/^\d{16}$/)) {
      newErrors.card_number = 'Please enter a valid 16-digit card number';
      isValid = false;
    }

    // Expiry date validation (MM/YY format, not expired)
    if (!paymentData.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      isValid = false    } else {
      const [month, year] = paymentData.expiry.split('/');
      const expiryDate = new Date(2000 + parseInt(year), month, 1);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      
      if (expiryDate < currentDate) {
        newErrors.expiry = 'This card has expired';
        isValid = false;
      }
    }

    // CVV validation (3 or 4 digits)
    if (!paymentData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = 'Please enter a valid CVV (3 or 4 digits)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Prepare the payload with all form data
    const payload = {
      ...formData,
      kyc_file: kycFile,
      payment: {
        card_number: paymentData.card_number.replace(/\s/g, ''),
        expiry: paymentData.expiry,
        cvv: paymentData.cvv,
      },
    };

    // Call the parent submit handler
    onSubmitPurchase(payload);
  };

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Payment Information
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Number */}
          <div className="space-y-1">
            <label htmlFor="card_number" className="block text-sm font-medium text-gray-700">
              Card Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="card_number"
                name="card_number"
                value={paymentData.card_number}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19} // 16 digits + 3 spaces
                className={`mt-1 block w-full pl-10 pr-3 py-2 border ${
                  errors.card_number ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                aria-invalid={!!errors.card_number}
                aria-describedby={errors.card_number ? 'card-number-error' : undefined}
                disabled={isProcessing}
              />
            </div>
            {errors.card_number && (
              <p className="mt-1 text-sm text-red-600" id="card-number-error">
                {errors.card_number}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expiry Date */}
            <div className="space-y-1">
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                value={paymentData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.expiry ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                aria-invalid={!!errors.expiry}
                aria-describedby={errors.expiry ? 'expiry-error' : undefined}
                disabled={isProcessing}
              />
              {errors.expiry && (
                <p className="mt-1 text-sm text-red-600" id="expiry-error">
                  {errors.expiry}
                </p>
              )}
            </div>

            {/* CVV */}
            <div className="space-y-1">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="cvv"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={4}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.cvv ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                aria-invalid={!!errors.cvv}
                aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                disabled={isProcessing}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600" id="cvv-error">
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                isProcessing
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              }`}
              aria-busy={isProcessing}
              aria-live="polite"
            >
              {isProcessing ? (
                <>
                  <FiLoader className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  Processing...
                </>
              ) : (
                'Pay & Generate Policy'
              )}
            </button>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Your payment is secure and encrypted
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

PaymentSection.propTypes = {
  isProcessing: PropTypes.bool.isRequired,
  onSubmitPurchase: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    full_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    registration_number: PropTypes.string,
    engine_number: PropTypes.string,
    vehicle_model: PropTypes.string,
    manufacturing_year: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    idv: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    estimated_premium: PropTypes.number,
  }).isRequired,
  kycFile: PropTypes.instanceOf(File),
};

export default PaymentSection;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PurchaseForm = ({ initialValues = {}, isProcessing, onSubmitPurchase }) => {
  const [formData, setFormData] = useState({
    full_name: initialValues.full_name || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    registration_number: initialValues.registration_number || '',
    engine_number: initialValues.engine_number || '',
    kyc_file: null,
    payment: {
      card_number: '',
      expiry: '',
      cvv: ''
    },
    ...initialValues
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.payment) {
      setFormData(prev => ({
        ...prev,
        payment: {
          ...prev.payment,
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, kyc_file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPurchase(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Complete Your Purchase</h2>
            <p className="text-blue-100 text-sm mt-1">Fill in your details to complete the policy purchase</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Details */}
            <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Vehicle Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                  <input
                    type="text"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Engine Number</label>
                  <input
                    type="text"
                    name="engine_number"
                    value={formData.engine_number}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* KYC Upload */}
            <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">KYC Documents</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload ID Proof (Aadhar/PAN/Driving License)</label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
                {formData.kyc_file && (
                  <p className="mt-1 text-sm text-gray-600">
                    Selected: {formData.kyc_file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Payment Details</h3>
              </div>
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    name="card_number"
                    value={formData.payment.card_number}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.payment.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={formData.payment.cvv}
                      onChange={handleChange}
                      placeholder="•••"
                      maxLength="3"
                      className="mt-1 block w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            {formData.estimated_premium && (
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <h3 className="font-medium text-gray-800 mb-3">Order Summary</h3>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-gray-600">Base Premium</span>
                  <span className="font-medium">₹{(formData.estimated_premium * 0.8).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-100">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium">₹{(formData.estimated_premium * 0.2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-xl font-bold text-blue-700">₹{formData.estimated_premium.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={isProcessing}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex-1 flex items-center justify-center"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PurchaseFormDemo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (formData) => {
    console.log('Submitting purchase:', formData);
    setIsProcessing(true);
    // MOCK: Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PurchaseForm
        initialValues={location.state || {}}
        isProcessing={isProcessing}
        onSubmitPurchase={handleSubmit}
      />
    </div>
  );
};

export default PurchaseFormDemo;

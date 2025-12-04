import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMotorcycle, FaTruck, FaCalculator, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { fadeIn } from '../utils/animations';

const PremiumCalculator = ({ onCalculate, onBuy, initialValues = {} }) => {
  const [activeTab, setActiveTab] = useState('car');
  const [formData, setFormData] = useState({
    vehicle_model: initialValues.vehicle_model || 'SUV',
    manufacturing_year: initialValues.manufacturing_year || '',
    idv: initialValues.idv || '',
    estimated_premium: initialValues.estimated_premium || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { vehicle_model, manufacturing_year, idv } = formData;
    onCalculate?.({ vehicle_model, manufacturing_year, idv });
    // For demo purposes
    setFormData(prev => ({
      ...prev,
      estimated_premium: 12000
    }));
  };

  // Update vehicle model when tab changes
  useEffect(() => {
    const models = {
      car: 'Sedan',
      suv: 'SUV',
      bike: 'Bike'
    };
    setFormData(prev => ({
      ...prev,
      vehicle_model: models[activeTab] || 'Sedan'
    }));
  }, [activeTab]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-1">Premium Calculator</h1>
          <p className="text-blue-100 text-sm">Get an instant insurance quote</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-50 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('car')}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${activeTab === 'car' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
          >
            <FaCar className="mx-auto mb-2" />
            <span>Car</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('suv')}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${activeTab === 'suv' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
          >
            <FaTruck className="mx-auto mb-2" />
            <span>SUV</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bike')}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${activeTab === 'bike' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
              : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'}`}
          >
            <FaMotorcycle className="mx-auto mb-2" />
            <span>Bike</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Vehicle Details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                <div className="relative">
                  <select
                    name="vehicle_model"
                    value={formData.vehicle_model}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Year</label>
                <input
                  type="number"
                  name="manufacturing_year"
                  value={formData.manufacturing_year}
                  onChange={handleChange}
                  min="2000"
                  max={new Date().getFullYear()}
                  placeholder="e.g. 2020"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IDV (Insured Declared Value)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    name="idv"
                    value={formData.idv}
                    onChange={handleChange}
                    placeholder="e.g. 500000"
                    className="w-full pl-8 pr-4 py-2.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Enter your vehicle's current market value.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex justify-center items-center"
            >
              <FaCalculator className="mr-2" />
              Calculate Premium
            </button>
          </div>

          {/* Estimated Premium Card */}
          {formData.estimated_premium && (
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-5">
              <div className="mb-4">
                <p className="text-sm font-medium text-blue-700 mb-1">Estimated Premium</p>
                <p className="text-2xl font-bold text-blue-800">
                  ₹{formData.estimated_premium.toLocaleString()}
                  <span className="text-sm font-normal text-blue-600 ml-1">/year</span>
                </p>
                <p className="mt-1 text-xs text-blue-600">This is an estimated amount. Final premium may vary.</p>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onBuy?.(formData)}
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  Buy This Policy
                  <FaArrowRight className="ml-2" />
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, estimated_premium: null }))}
                  className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center"
                >
                  <FaArrowLeft className="mr-1" />
                  Recalculate
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const PremiumCalculatorDemo = () => {
  const navigate = useNavigate();
  const [estimatedPremium, setEstimatedPremium] = useState(null);

  const handleCalculate = (data) => {
    console.log('Calculating premium for:', data);
    // In a real app, this would be an API call
    setEstimatedPremium(12000); // Mock value
  };

  const handleBuy = (data) => {
    navigate('/purchase', { 
      state: { 
        ...data,
        estimated_premium: estimatedPremium
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <PremiumCalculator 
          onCalculate={handleCalculate}
          onBuy={handleBuy}
        />
        
        {/* FAQ Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-sm font-medium text-gray-800">How is the premium calculated?</h3>
                <p className="mt-1 text-sm text-gray-600">Based on your vehicle's IDV, age, make, and model. Includes add-on covers and taxes.</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <h3 className="text-sm font-medium text-gray-800">What is IDV?</h3>
                <p className="mt-1 text-sm text-gray-600">Insured Declared Value - your vehicle's current market value.</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-800">Can I modify my policy later?</h3>
                <p className="mt-1 text-sm text-gray-600">Yes, you can modify add-ons, IDV, or personal details anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumCalculatorDemo;

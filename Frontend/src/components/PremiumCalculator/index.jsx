import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * PremiumCalculator - A form to calculate insurance premium
 * 
 * @example
 * // Basic usage
 * <PremiumCalculator 
 *   onCalculate={(data) => console.log('Calculate:', data)}
 *   onBuy={(data) => console.log('Buy:', data)}
 * />
 * 
 * // With initial values
 * <PremiumCalculator 
 *   initialValues={{
 *     vehicle_model: 'SUV',
 *     manufacturing_year: 2020,
 *     idv: 500000
 *   }}
 *   onCalculate={handleCalculate}
 *   onBuy={handleBuy}
 * />
 */
const PremiumCalculator = ({ onCalculate, onBuy, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    vehicle_model: initialValues.vehicle_model || '',
    manufacturing_year: initialValues.manufacturing_year || '',
    idv: initialValues.idv || '',
  });
  const [estimatedPremium, setEstimatedPremium] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.vehicle_model) {
      newErrors.vehicle_model = 'Please select a vehicle model';
      isValid = false;
    }

    if (!formData.manufacturing_year) {
      newErrors.manufacturing_year = 'Manufacturing year is required';
      isValid = false;
    } else if (formData.manufacturing_year < 2000 || formData.manufacturing_year > new Date().getFullYear() + 1) {
      newErrors.manufacturing_year = 'Please enter a valid year';
      isValid = false;
    }

    if (!formData.idv) {
      newErrors.idv = 'IDV is required';
      isValid = false;
    } else if (formData.idv < 10000) {
      newErrors.idv = 'IDV should be at least ₹10,000';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // In a real app, this would be an API call
    onCalculate?.(formData);
    
    // Demo only: Mock premium calculation (2% of IDV for demo)
    const mockPremium = Math.round(formData.idv * 0.02);
    setEstimatedPremium(mockPremium);
  };

  const handleBuy = (e) => {
    e.preventDefault();
    if (estimatedPremium === null) return;
    
    onBuy?.({
      ...formData,
      estimated_premium: estimatedPremium
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Premium Calculator</h2>
      
      <form onSubmit={handleCalculate} className="space-y-6">
        {/* Vehicle Model */}
        <div>
          <label htmlFor="vehicle_model" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Model
          </label>
          <select
            id="vehicle_model"
            name="vehicle_model"
            value={formData.vehicle_model}
            onChange={handleChange}
            className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${errors.vehicle_model ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
            aria-invalid={!!errors.vehicle_model}
            aria-describedby={errors.vehicle_model ? 'vehicle-model-error' : undefined}
          >
            <option value="">Select vehicle model</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Bike">Bike</option>
          </select>
          {errors.vehicle_model && (
            <p className="mt-1 text-sm text-red-600" id="vehicle-model-error">
              {errors.vehicle_model}
            </p>
          )}
        </div>

        {/* Manufacturing Year */}
        <div>
          <label htmlFor="manufacturing_year" className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturing Year
          </label>
          <input
            type="number"
            id="manufacturing_year"
            name="manufacturing_year"
            min="2000"
            max={new Date().getFullYear() + 1}
            value={formData.manufacturing_year}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${errors.manufacturing_year ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            aria-invalid={!!errors.manufacturing_year}
            aria-describedby={errors.manufacturing_year ? 'year-error' : undefined}
          />
          {errors.manufacturing_year && (
            <p className="mt-1 text-sm text-red-600" id="year-error">
              {errors.manufacturing_year}
            </p>
          )}
        </div>

        {/* IDV */}
        <div>
          <label htmlFor="idv" className="block text-sm font-medium text-gray-700 mb-1">
            What is your vehicle worth? (IDV)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              id="idv"
              name="idv"
              min="10000"
              step="1000"
              value={formData.idv}
              onChange={handleChange}
              className={`block w-full pl-7 pr-12 py-2 border ${errors.idv ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="0.00"
              aria-invalid={!!errors.idv}
              aria-describedby={errors.idv ? 'idv-error' : 'idv-help'}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                INR
              </span>
            </div>
          </div>
          {errors.idv ? (
            <p className="mt-1 text-sm text-red-600" id="idv-error">
              {errors.idv}
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-500" id="idv-help">
              IDV (Insured Declared Value) is the maximum sum insured by the insurer
            </p>
          )}
        </div>

        {/* Estimated Premium Display */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">Estimated Premium</p>
          <p className="text-3xl font-bold text-blue-600">
            {estimatedPremium !== null ? `₹${estimatedPremium.toLocaleString()}` : '--'}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto flex-1 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Calculate
          </button>
          
          {estimatedPremium !== null && (
            <button
              type="button"
              onClick={handleBuy}
              className="w-full sm:w-auto flex-1 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Buy This Policy
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

PremiumCalculator.propTypes = {
  onCalculate: PropTypes.func.isRequired,
  onBuy: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    vehicle_model: PropTypes.string,
    manufacturing_year: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    idv: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
  }),
};

export default PremiumCalculator;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * User and Vehicle information section for the purchase form
 * @param {Object} props - Component props
 * @param {Object} [props.initialValues] - Initial form values
 * @param {Function} props.onUpdate - Callback when form data changes
 */
const UserVehicleSection = ({ initialValues, onUpdate }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    registration_number: '',
    engine_number: '',
    ...initialValues
  });
  
  const [errors, setErrors] = useState({});

  // Notify parent when form data changes
  useEffect(() => {
    onUpdate?.(formData);
  }, [formData, onUpdate]);

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
        [name]: undefined
      }));
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!/^[0-9]{10}$/.test(value)) {
          return 'Please enter a valid 10-digit phone number';
        }
        break;
      default:
        if (!value.trim()) {
          return 'This field is required';
        }
    }
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* User Information Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Personal Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full rounded-md ${errors.full_name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
              aria-invalid={!!errors.full_name}
              aria-describedby={errors.full_name ? 'full_name-error' : undefined}
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600" id="full_name-error">
                {errors.full_name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full rounded-md ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" id="email-error">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">+91</span>
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                className={`block w-full pl-12 rounded-md ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
                placeholder="9876543210"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600" id="phone-error">
                {errors.phone}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Vehicle Information Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          Vehicle Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registration Number */}
          <div className="space-y-1">
            <label htmlFor="registration_number" className="block text-sm font-medium text-gray-700">
              Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="registration_number"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full rounded-md ${errors.registration_number ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
              placeholder="e.g. KA01AB1234"
              aria-invalid={!!errors.registration_number}
              aria-describedby={errors.registration_number ? 'registration_number-error' : undefined}
            />
            {errors.registration_number && (
              <p className="mt-1 text-sm text-red-600" id="registration_number-error">
                {errors.registration_number}
              </p>
            )}
          </div>

          {/* Engine Number */}
          <div className="space-y-1">
            <label htmlFor="engine_number" className="block text-sm font-medium text-gray-700">
              Engine Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="engine_number"
              name="engine_number"
              value={formData.engine_number}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`mt-1 block w-full rounded-md ${errors.engine_number ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'} shadow-sm`}
              placeholder="e.g. D13A1234567"
              aria-invalid={!!errors.engine_number}
              aria-describedby={errors.engine_number ? 'engine_number-error' : undefined}
            />
            {errors.engine_number && (
              <p className="mt-1 text-sm text-red-600" id="engine_number-error">
                {errors.engine_number}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

UserVehicleSection.propTypes = {
  initialValues: PropTypes.shape({
    full_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    registration_number: PropTypes.string,
    engine_number: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default UserVehicleSection;

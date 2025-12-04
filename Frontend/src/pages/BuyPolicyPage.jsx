import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  fetchProducts,
  calculatePremiumValue,
  purchasePolicy,
} from '../features/policies/policiesThunks';

const BuyPolicyPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    products,
    calculatedPremium,
    fetchLoading,
    purchaseLoading,
    error,
  } = useAppSelector((state) => state.policies);

  const [selectedProduct, setSelectedProduct] = useState('');
  const [coverageAmount, setCoverageAmount] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCalculate = async () => {
    setFormError('');
    setSuccessMessage('');

    if (!selectedProduct || !coverageAmount) {
      setFormError('Please select a product and coverage amount.');
      return;
    }

    try {
      await dispatch(
        calculatePremiumValue({
          productId: selectedProduct,
          coverageAmount: Number(coverageAmount),
        })
      ).unwrap();
    } catch (calcError) {
      setFormError(calcError || 'Unable to calculate premium.');
    }
  };

  const handlePurchase = async () => {
    setFormError('');
    setSuccessMessage('');

    if (!selectedProduct || !coverageAmount) {
      setFormError('Please select a product and coverage amount.');
      return;
    }

    try {
      await dispatch(
        purchasePolicy({
          productId: selectedProduct,
          coverageAmount: Number(coverageAmount),
        })
      ).unwrap();
      setSuccessMessage('Policy purchased successfully!');
      navigate('/dashboard', { replace: true });
    } catch (purchaseError) {
      setFormError(purchaseError || 'Unable to complete purchase.');
    }
  };

  const displayError = formError || error;

  return (
    <div className="page-container">
      <h1>Purchase a Policy</h1>
      <p>Select a product and coverage amount to calculate your premium.</p>

      <div className="form-grid">
        <label htmlFor="product">Policy Product</label>
        <select
          id="product"
          value={selectedProduct}
          onChange={(event) => setSelectedProduct(event.target.value)}
          disabled={fetchLoading || purchaseLoading}
        >
          <option value="">Select a product</option>
          {products?.map((product) => (
            <option key={product.id || product._id} value={product.id || product._id}>
              {product.name} - {product.category || product.type}
            </option>
          ))}
        </select>

        <label htmlFor="coverage">Coverage Amount</label>
        <input
          id="coverage"
          type="number"
          min="1000"
          step="500"
          value={coverageAmount}
          onChange={(event) => setCoverageAmount(event.target.value)}
          placeholder="Enter coverage amount"
          disabled={purchaseLoading}
        />

        {displayError && <p className="error-text">{displayError}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}

        <div className="button-row">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={fetchLoading || purchaseLoading}
          >
            {fetchLoading ? 'Calculating...' : 'Calculate Premium'}
          </button>

          <button
            type="button"
            onClick={handlePurchase}
            disabled={
              purchaseLoading || !calculatedPremium || !selectedProduct || !coverageAmount
            }
          >
            {purchaseLoading ? 'Processing...' : 'Buy Now'}
          </button>
        </div>

        {calculatedPremium && (
          <div className="result-card">
            <p>Estimated Premium:</p>
            <h2>{calculatedPremium.amount || calculatedPremium.total || calculatedPremium}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPolicyPage;



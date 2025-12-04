import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fileClaim } from '../features/claims/claimsThunks';
import { fetchPolicies } from '../features/policies/policiesThunks';

const ClaimsPage = () => {
  const dispatch = useAppDispatch();
  const { policies, fetchLoading: policiesLoading } = useAppSelector(
    (state) => state.policies
  );
  const { fileLoading, error } = useAppSelector((state) => state.claims);

  const [policyId, setPolicyId] = useState('');
  const [description, setDescription] = useState('');
  const [evidenceFile, setEvidenceFile] = useState(null);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleFileChange = (event) => {
    setEvidenceFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    setSuccessMessage('');

    if (!policyId || !description) {
      setFormError('Please select a policy and provide a description.');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('policyId', policyId);
      payload.append('description', description);
      if (evidenceFile) {
        payload.append('evidence', evidenceFile);
      }

      await dispatch(fileClaim(payload)).unwrap();
      setSuccessMessage('Claim submitted successfully!');
      setDescription('');
      setPolicyId('');
      setEvidenceFile(null);
    } catch (submitError) {
      setFormError(submitError || 'Unable to submit claim.');
    }
  };

  const displayError = formError || error;

  return (
    <div className="page-container">
      <h1>Claims</h1>
      <p>File a claim for one of your existing policies.</p>

      <form className="claims-form" onSubmit={handleSubmit}>
        <label htmlFor="policy">Policy</label>
        <select
          id="policy"
          value={policyId}
          onChange={(event) => setPolicyId(event.target.value)}
          disabled={policiesLoading || fileLoading}
        >
          <option value="">Select a policy</option>
          {policies?.map((policy) => (
            <option key={policy.id || policy._id} value={policy.id || policy._id}>
              {policy.type || policy.name} - {policy.policyNumber || policy.number}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows="4"
          placeholder="Describe the incident"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={fileLoading}
        />

        <label htmlFor="evidence">Evidence (optional)</label>
        <input
          id="evidence"
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          disabled={fileLoading}
        />

        {displayError && <p className="error-text">{displayError}</p>}
        {successMessage && <p className="success-text">{successMessage}</p>}

        <button type="submit" disabled={fileLoading}>
          {fileLoading ? 'Submitting...' : 'Submit Claim'}
        </button>
      </form>
    </div>
  );
};

export default ClaimsPage;



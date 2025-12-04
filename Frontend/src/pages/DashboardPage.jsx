import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchPolicies } from '../features/policies/policiesThunks';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    policies,
    fetchLoading,
    error: policiesError,
  } = useAppSelector((state) => state.policies);

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const policyList = policies || [];
  const name = user?.name || user?.fullName || user?.email || 'Customer';

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1>Welcome back, {name}</h1>
          <p>Here&apos;s an overview of your policies.</p>
        </div>
        <Link className="primary-link" to="/buy-policy">
          Buy a new policy
        </Link>
      </header>

      {fetchLoading && <p>Loading policies...</p>}
      {policiesError && <p className="error-text">{policiesError}</p>}

      {!fetchLoading && policyList.length === 0 && (
        <div className="empty-state">
          <p>You haven&apos;t purchased any policies yet.</p>
          <Link to="/buy-policy">Browse available policies</Link>
        </div>
      )}

      <div className="policy-grid">
        {policyList.map((policy) => (
          <article className="policy-card" key={policy.id || policy._id}>
            <h3>{policy.type || policy.name || 'Policy'}</h3>
            <p>
              <strong>Premium:</strong> {policy.premium || policy.premiumAmount}
            </p>
            <p>
              <strong>Status:</strong> {policy.status || 'Active'}
            </p>
            <p>
              <strong>Expiry:</strong>{' '}
              {policy.expiry_date
                ? new Date(policy.expiry_date).toLocaleDateString()
                : 'N/A'}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;



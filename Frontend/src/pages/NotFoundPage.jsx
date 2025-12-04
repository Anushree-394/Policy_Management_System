import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="page-container not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for does not exist or has been moved.</p>
      <Link to="/dashboard" className="primary-link">
        Go back to dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;



import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const displayName = user?.name || user?.fullName || user?.email || 'User';

  return (
    <header className="bg-indigo-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold tracking-wide">
          🛡️ PolicyMgmt
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-indigo-100 sm:block">
              Signed in as <strong>{displayName}</strong>
            </span>
            <Link
              to="/dashboard"
              className="rounded-md bg-indigo-700 px-3 py-1 text-white transition hover:bg-indigo-600"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-white px-3 py-1 transition hover:bg-white hover:text-indigo-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm">
            <Link
              to="/login"
              className="rounded-md px-3 py-1 transition hover:bg-indigo-800"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-white px-3 py-1 text-indigo-900 transition hover:bg-indigo-100"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;



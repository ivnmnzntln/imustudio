import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { useCart } from '../store/cartStore';

export const Header: React.FC = () => {
  const { isAuthenticated, user, clearAuth } = useAuth();
  const { count } = useCart();

  return (
    <header className="bg-black text-white py-4 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          ShopHub
        </Link>

        <nav className="flex gap-6">
          <Link to="/products" className="hover:text-gray-300">
            Shop
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </nav>

        <div className="flex gap-4 items-center">
          <Link to="/cart" className="relative">
            🛒
            {count() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count()}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex gap-4">
              <Link to="/account" className="hover:text-gray-300">
                {user?.firstName}
              </Link>
              <button
                onClick={() => {
                  clearAuth();
                  window.location.href = '/';
                }}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="btn-primary text-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import Navbar from '../Navbar';
import PropTypes from 'prop-types';

/**
 * Layout component that provides a consistent structure for all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content to be rendered inside the main content area
 * @param {string} [props.pageTitle] - Optional page title to be displayed as an H1 at the top of the main content
 */
const Layout = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with Navbar */}
      <header className="bg-white shadow-sm">
        <Navbar />
      </header>

      {/* Main content area */}
      <main 
        role="main" 
        aria-label="Main content"
        className="flex-grow container mx-auto px-4 sm:px-6 py-8"
      >
        {pageTitle && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
          </div>
        )}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Policy Management System. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-sm text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-blue-600 hover:text-blue-800">
                Terms of Service
              </a>
              <a href="/contact" className="text-sm text-blue-600 hover:text-blue-800">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string,
};

export default Layout;

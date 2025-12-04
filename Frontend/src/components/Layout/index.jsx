/**
 * Layout Component
 * Main layout wrapper for the application
 * To be enhanced by Members 4 & 5 with navigation, header, footer, etc.
 */
const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Header/Navigation will be added by Member 4 */}
      <header>
        <nav>
          {/* Navigation to be implemented */}
        </nav>
      </header>
      
      <main className="main-content">
        {children}
      </main>
      
      {/* Footer will be added by Member 4 */}
      <footer>
        {/* Footer to be implemented */}
      </footer>
    </div>
  );
};

export default Layout;

